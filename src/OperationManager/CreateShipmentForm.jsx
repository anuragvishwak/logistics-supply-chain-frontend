import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaIndianRupeeSign, FaRightLeft } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import Fields from "../CentralizedComponent/Fields";
import Checkpoint from "./Checkpoint";

function CreateShipmentForm({ setopen_add_shipment_form }) {
  const org_id = localStorage.getItem("id");
  const user_token = localStorage.getItem("token");

  const [current_step, setcurrent_step] = useState(1);
  const [shipment_type, setshipment_type] = useState("");
  const [getting_orders, setgetting_orders] = useState([]);
  const [selected_order, setselected_order] = useState(null);
  const [selected_bulk_orders, setselected_bulk_orders] = useState([]);
  const [total_loaded_weight, settotal_loaded_weight] = useState("");
  const [getting_fleets, setgetting_fleets] = useState([]);
  const [selected_fleet, setselected_fleet] = useState("");
  const [checkpoints, setcheckpoints] = useState([]);
  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  const [selected_state, setselected_state] = useState("");
  const [selected_city, setselected_city] = useState("");

  async function fetchStates() {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          country: "India",
        },
      );

      setstates(response.data.data.states);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCities(state) {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          country: "India",
          state: state,
        },
      );

      setcities(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function renderingOrders() {
    try {
      const response = await axios.get(`http://localhost:3000/orders`, {
        headers: { Authorization: `Bearer ${user_token}` },
      });
      setgetting_orders(response.data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  }

  async function renderingFleet() {
    try {
      const response = await axios.get(`http://localhost:3000/fleets`, {
        headers: { Authorization: `Bearer ${user_token}` },
      });
      setgetting_fleets(response.data);
    } catch (error) {
      console.log("Error fetching fleets:", error);
    }
  }

  const determineShipmentType = () => {
    if (selected_bulk_orders.length > 1) return "many_to_one";
    if (selected_order) return "one_to_many";
    return null;
  };

  async function create_shipment() {
    const loadedWeight = Number(total_loaded_weight || 0);

    const shipment_data = {
      shipment_type,
      total_loaded_weight: loadedWeight,
      organization_id: org_id,
      fleet_id: selected_fleet,
      checkpoints: checkpoints,
      order_id: shipment_type === "one_to_many" ? selected_order : null,
      order_ids: shipment_type === "many_to_one" ? selected_bulk_orders : [],
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/shipments",
        { shipment: shipment_data },
        { headers: { Authorization: `Bearer ${user_token}` } },
      );

      console.log("Shipment created successfully!", response.data);
      setopen_add_shipment_form(false);
    } catch (error) {
      console.log("Error creating shipment:", error);
      alert("Failed to create shipment. Please check console.");
    }
  }

  useEffect(() => {
    renderingOrders();
    renderingFleet();
    fetchStates();
  }, []);

  const selected_orders_data = getting_orders.filter((order) =>
    selected_bulk_orders.includes(order.id),
  );

  const total_weight_orders = selected_orders_data.reduce((total, order) => {
    return total + Number(order.total_weight || 0);
  }, 0);

  const selectedFleetData = getting_fleets.find(
    (fleet) => fleet.id === parseInt(selected_fleet),
  );

  const fleetCapacity = Number(selectedFleetData?.weight_capacity || 0);
  const loadedWeight = Number(total_loaded_weight || 0);

  const fleetOverloaded = loadedWeight > fleetCapacity;
  const orderWeightExceeded = loadedWeight > total_weight_orders;

  const remainingFleetCapacity = fleetCapacity - loadedWeight;
  const remainingOrdersWeight = total_weight_orders - loadedWeight;

  const validateBeforeCreate = () => {
    if (!shipment_type) {
      alert("Please select shipment type");
      return false;
    }
    if (!selected_fleet) {
      alert("Please select a fleet");
      return false;
    }
    if (!total_loaded_weight) {
      alert("Please enter total loaded weight");
      return false;
    }
    if (loadedWeight <= 0) {
      alert("Loaded weight must be greater than 0");
      return false;
    }
    if (fleetOverloaded) {
      alert("Fleet capacity is exceeded!");
      return false;
    }
    return true;
  };

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white h-screen w-full max-w-4xl overflow-auto my-10 p-6 rounded-lg">
        <div className="flex items-start justify-between mb-6">
          <p className="text-2xl text-[#254441] font-bold">Create Shipment</p>
          <button
            onClick={() => setopen_add_shipment_form(false)}
            className="text-red-500 font-semibold hover:underline"
          >
            Close
          </button>
        </div>

        {current_step === 1 && (
          <div>
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                Select Shipment Type
              </label>
              <select
                value={shipment_type}
                onChange={(e) => setshipment_type(e.target.value)}
                className="border border-gray-400 w-full p-3 rounded focus:outline-none focus:border-[#254441]"
              >
                <option value="">Select Shipment Type</option>
                <option value="one_to_many">
                  Single Order - Multiple Shipments (One to Many)
                </option>
                <option value="many_to_one">
                  Multiple Orders - Single Shipment (Many to One)
                </option>
              </select>
              <p className="text-gray-600 text-sm mt-2">
                Choose how you want to group your orders into this shipment.
              </p>
            </div>

            {shipment_type === "many_to_one" && (
              <>
                <div className="flex gap-5 mt-5 w-full">
                  <div className="w-full">
                    <p className="mb-1">Select State</p>

                    <select
                      value={selected_state}
                      onChange={(e) => {
                        setselected_state(e.target.value);
                        setselected_city("");
                        fetchCities(e.target.value);
                      }}
                      className="border p-3 rounded w-full border-gray-400"
                    >
                      <option value="">Select State</option>

                      {states.map((state, index) => (
                        <option key={index} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full">
                    <p className="mb-1">Select City</p>

                    <select
                      value={selected_city}
                      onChange={(e) => setselected_city(e.target.value)}
                      className="border p-3 rounded w-full border-gray-400"
                      disabled={!selected_state}
                    >
                      <option value="">Select City</option>

                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  Select a state and city to filter nearby shipment orders.
                </p>
              </>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setcurrent_step(2)}
                disabled={!shipment_type}
                className="bg-[#254441] disabled:bg-gray-400 text-white px-6 py-2.5 rounded font-semibold"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {current_step === 2 && (
          <div>
            {shipment_type === "one_to_many" ? (
              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-4">Select One Order</h3>
                {getting_orders.map((order) => (
                  <div
                    key={order.id}
                    className="border-b border-gray-300 py-4 flex items-center gap-4 last:border-none"
                  >
                    <input
                      type="radio"
                      checked={selected_order === order.id}
                      onChange={() => setselected_order(order.id)}
                      className="h-5 w-5 accent-[#254441]"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-semibold text-[#254441]">
                          {order.client_name}
                        </p>
                        <p className="font-semibold">{order.distance} km</p>
                      </div>
                      <div className="flex gap-6 text-sm mt-2">
                        <div>
                          <p className="text-gray-600">Order Value</p>
                          <div className="flex items-center gap-1">
                            <FaIndianRupeeSign size={14} />
                            <span>{order.order_value}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Weight</p>
                          <p>{order.total_weight} kg</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-4">
                  Select Multiple Orders
                </h3>
                {getting_orders
                  .filter((order) => Number(order.total_weight) <= 800 && order.)
                  .map((order) => (
                    <div
                      key={order.id}
                      className="border-b border-gray-300 py-4 flex items-center gap-4 last:border-none"
                    >
                      <input
                        type="checkbox"
                        checked={selected_bulk_orders.includes(order.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setselected_bulk_orders([
                              ...selected_bulk_orders,
                              order.id,
                            ]);
                          } else {
                            setselected_bulk_orders(
                              selected_bulk_orders.filter(
                                (id) => id !== order.id,
                              ),
                            );
                          }
                        }}
                        className="h-5 w-5 accent-[#254441]"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-semibold text-[#254441]">
                            {order.client_name}
                          </p>
                          <p className="font-semibold">{order.distance} km</p>
                        </div>
                        <div className="flex gap-6 text-sm mt-2">
                          <div>
                            <p className="text-gray-600">Order Value</p>
                            <div className="flex items-center gap-1">
                              <FaIndianRupeeSign size={14} />
                              <span>{order.order_value}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Weight</p>
                            <p>{order.total_weight} kg</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setcurrent_step(1)}
                className="border border-gray-400 px-6 py-2.5 rounded font-semibold"
              >
                Previous
              </button>
              <button
                onClick={() => setcurrent_step(3)}
                disabled={
                  shipment_type === "one_to_many"
                    ? !selected_order
                    : selected_bulk_orders.length === 0
                }
                className="bg-[#254441] disabled:bg-gray-400 text-white px-6 py-2.5 rounded font-semibold"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {current_step === 3 && (
          <div className="space-y-8">
            {shipment_type === "one_to_many" ? (
              getting_orders
                .filter((o) => o.id === selected_order)
                .map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-400 p-4 rounded-lg"
                  >
                    <h3 className="font-semibold text-lg mb-3">
                      Selected Order
                    </h3>
                    <div className="flex justify-between">
                      <p className="font-semibold">{order.client_name}</p>
                      <p>{order.distance} km</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.pickup_address} → {order.delivery_address}
                    </p>
                  </div>
                ))
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-lg">
                    Total Orders Weight: {total_weight_orders} kg
                  </p>
                  <hr className="my-4" />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {selected_orders_data.map((order) => (
                    <div
                      key={order.id}
                      className="border flex items-center justify-between border-gray-400 p-4 rounded-lg"
                    >
                      <div>
                        <p className="text-gray-500">Pickup Address</p>
                        <p className="font-medium">{order.pickup_address}</p>
                      </div>
                      <FaArrowRight />
                      <div>
                        <p className="text-gray-500">Delivery Address</p>
                        <p className="font-medium">{order.delivery_address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <Fields
                type="text"
                field_value={settotal_loaded_weight}
                label="Total Loaded Weight (kg)"
              />

              <div>
                <p className="mb-1 font-medium">Select Fleet</p>
                <select
                  value={selected_fleet}
                  onChange={(e) => setselected_fleet(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded focus:outline-none"
                >
                  <option value="">Select Fleet</option>
                  {getting_fleets.map((fleet) => (
                    <option key={fleet.id} value={fleet.id}>
                      {fleet.vehicle_model} ({fleet.vehicle_type})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedFleetData && (
              <div className="border border-gray-400 p-5 rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-[#254441] mb-4">
                  Fleet Details
                </h3>
                <p>
                  <strong>Vehicle:</strong> {selectedFleetData.vehicle_model}
                </p>
                <p>
                  <strong>Capacity:</strong> {fleetCapacity} kg
                </p>
                <p>
                  <strong>Loaded Weight:</strong> {loadedWeight} kg
                </p>
                <p className="text-yellow-600 font-semibold">
                  Remaining Capacity: {Math.max(0, remainingFleetCapacity)} kg
                </p>

                {fleetOverloaded && (
                  <p className="text-red-600 mt-2 font-medium">
                    ⚠️ Fleet capacity exceeded by {loadedWeight - fleetCapacity}{" "}
                    kg
                  </p>
                )}
                {orderWeightExceeded && (
                  <p className="text-red-600 mt-1 font-medium">
                    ⚠️ Loaded weight exceeds total orders weight
                  </p>
                )}
              </div>
            )}

            <Checkpoint
              selected_order={selected_order}
              getting_orders={getting_orders}
              checkpoints={checkpoints}
              setcheckpoints={setcheckpoints}
            />

            <div className="flex justify-end gap-3 pt-6">
              <button
                onClick={() => setcurrent_step(2)}
                className="bg-[#254441] text-white px-6 py-2.5 rounded font-semibold"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (validateBeforeCreate()) {
                    create_shipment();
                  }
                }}
                className="bg-[#43aa8b] text-white px-8 py-2.5 rounded font-semibold hover:bg-green-700"
              >
                Create Shipment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateShipmentForm;
