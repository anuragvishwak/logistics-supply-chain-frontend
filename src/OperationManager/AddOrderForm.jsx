import React, { useEffect, useState } from "react";
import Fields from "../CentralizedComponent/Fields";
import Textarea from "../CentralizedComponent/Textarea";
import axios from "axios";

function AddOrderForm({ setopen_create_order_form, renderingOrders }) {
  const org_id = localStorage.getItem("id");
  const user_token = localStorage.getItem("token");

  const [client_name, setclient_name] = useState("");
  const [order_date, setorder_date] = useState("");
  const [priority, setpriority] = useState("");
  const [product_category, setproduct_category] = useState("");
  const [quantity_unit, setquantity_unit] = useState("");
  const [total_weight, settotal_weight] = useState("");
  const [item_description, setitem_description] = useState("");
  const [pickup_address, setpickupaddress] = useState("");
  const [delivery_address, setdelivery_address] = useState("");
  const [distance, setdistance] = useState("");
  const [service_type, setservice_type] = useState("");
  const [order_value, setorder_value] = useState("");
  const [payment_term, setpayment_term] = useState("");

  const [pickup_pincode, setpickup_pincode] = useState("");
  const [pickup_country, setpickup_country] = useState("");

  const [delivery_country, setdelivery_country] = useState("");
  const [delivery_pincode, setdelivery_pincode] = useState("");

  const [states, setstates] = useState([]);

  const [pickupCities, setpickupCities] = useState([]);
  const [deliveryCities, setdeliveryCities] = useState([]);

  const [selected_pickup_city, setselected_pickup_city] = useState("");
  const [selected_pickup_state, setselected_pickup_state] = useState("");

  const [selected_delivery_city, setselected_delivery_city] = useState("");
  const [selected_delivery_state, setselected_delivery_state] = useState("");

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
      console.log("Error fetching states", error);
    }
  }

  async function fetchPickupCities(state) {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          country: "India",
          state: state,
        },
      );

      setpickupCities(response.data.data);
    } catch (error) {
      console.log("Error fetching pickup cities", error);
    }
  }

  async function fetchDeliveryCities(state) {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          country: "India",
          state: state,
        },
      );

      setdeliveryCities(response.data.data);
    } catch (error) {
      console.log("Error fetching delivery cities", error);
    }
  }

  async function creating_order() {
    const order_data = {
      client_name: client_name,
      order_date: order_date,
      priority: priority,
      product_category: product_category,
      quantity: quantity_unit,
      total_weight: total_weight,
      item_description: item_description,

      pickup_address: pickup_address,
      pickup_city: selected_pickup_city,
      pickup_state: selected_pickup_state,
      pickup_country: pickup_country,
      pickup_pincode: pickup_pincode,

      delivery_address: delivery_address,
      delivery_city: selected_delivery_city,
      delivery_state: selected_delivery_state,
      delivery_country: delivery_country,
      delivery_pincode: delivery_pincode,

      distance: distance,
      service_type: service_type,
      order_value: order_value,
      payment_term: payment_term,

      organization_id: org_id,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/orders",
        { order: order_data },
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        },
      );

      console.log("Everything went successful!", response.data);

      setopen_create_order_form(false);
      renderingOrders();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white h-screen my-10 overflow-auto w-10/12 p-5 rounded">
        <div className="flex items-start justify-between">
          <p className="text-xl text-[#254441] font-bold">Create Order</p>

          <button
            onClick={() => {
              setopen_create_order_form(false);
            }}
            className="text-red-500 font-semibold"
          >
            Close
          </button>
        </div>

        <div className="mt-5">
          <p className="text-[#254441] font-semibold text-lg">
            Header Information
          </p>

          <div className="grid grid-cols-3 gap-5 mt-3">
            <Fields
              type={"text"}
              label={"Client Name"}
              field_value={setclient_name}
            />

            <Fields
              type={"date"}
              label={"Order Date"}
              field_value={setorder_date}
            />

            <div>
              <p>Priority</p>

              <select
                onChange={(event) => setpriority(event.target.value)}
                className="border p-2 w-full border-gray-300"
              >
                <option value="">Select Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[#254441] font-semibold text-lg">
            Consignment Information
          </p>

          <div className="grid grid-cols-3 gap-5 mt-3">
            <div>
              <p>Product/Item Category</p>

              <select
                onChange={(event) => setproduct_category(event.target.value)}
                className="border p-2 w-full border-gray-300"
              >
                <option value="">Select Category</option>
                <option value="perishable">Perishables</option>
                <option value="electronic">Electronics</option>
                <option value="industrial_part">Industrial Parts</option>
                <option value="textile">Textiles</option>
              </select>
            </div>

            <Fields
              label={"Quantity & Unit"}
              type={"text"}
              field_value={setquantity_unit}
            />

            <Fields
              label={"Total Weight"}
              type={"text"}
              field_value={settotal_weight}
            />
          </div>

          <Textarea
            label={"Item Description"}
            field_value={setitem_description}
          />
        </div>

        <div className="mt-6">
          <p className="text-[#254441] font-semibold text-lg">
            Route Information
          </p>

          <Fields label={"Distance"} type={"text"} field_value={setdistance} />

          <div className="grid grid-cols-2 gap-5 mt-5">
            <div>
              <Textarea
                label={"Pickup Address"}
                field_value={setpickupaddress}
              />

              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <p className="mb-1">Pickup State</p>

                  <select
                    value={selected_pickup_state}
                    onChange={(e) => {
                      setselected_pickup_state(e.target.value);
                      setselected_pickup_city("");

                      fetchPickupCities(e.target.value);
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

                {/* Pickup City */}
                <div>
                  <p className="mb-1">Pickup City</p>

                  <select
                    value={selected_pickup_city}
                    onChange={(e) => setselected_pickup_city(e.target.value)}
                    className="border p-3 rounded w-full border-gray-400"
                    disabled={!selected_pickup_state}
                  >
                    <option value="">Select City</option>

                    {pickupCities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <Fields
                  type={"text"}
                  label={"Pickup Country"}
                  field_value={setpickup_country}
                />

                <Fields
                  type={"text"}
                  label={"Pickup Pincode"}
                  field_value={setpickup_pincode}
                />
              </div>
            </div>

            {/* Delivery Section */}
            <div>
              <Textarea
                label={"Delivery Address"}
                field_value={setdelivery_address}
              />

              <div className="grid grid-cols-2 gap-5 mt-5">
                {/* Delivery State */}
                <div>
                  <p className="mb-1">Delivery State</p>

                  <select
                    value={selected_delivery_state}
                    onChange={(e) => {
                      setselected_delivery_state(e.target.value);
                      setselected_delivery_city("");

                      fetchDeliveryCities(e.target.value);
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

                {/* Delivery City */}
                <div>
                  <p className="mb-1">Delivery City</p>

                  <select
                    value={selected_delivery_city}
                    onChange={(e) => setselected_delivery_city(e.target.value)}
                    className="border p-3 rounded w-full border-gray-400"
                    disabled={!selected_delivery_state}
                  >
                    <option value="">Select City</option>

                    {deliveryCities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <Fields
                  type={"text"}
                  label={"Delivery Country"}
                  field_value={setdelivery_country}
                />

                <Fields
                  type={"text"}
                  label={"Delivery Pincode"}
                  field_value={setdelivery_pincode}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Billing & Requirements */}
        <div className="mt-6">
          <p className="text-[#254441] font-semibold text-lg">
            Billing & Requirements
          </p>

          <div className="grid grid-cols-3 gap-5 mt-3">
            <div>
              <p>Service Type</p>

              <select
                onChange={(event) => setservice_type(event.target.value)}
                className="border p-2 w-full border-gray-300"
              >
                <option value="">Select Service Type</option>

                <option value="full_truck">FTL - Full Truck Load</option>

                <option value="less_than_truck">
                  LTL - Less than Truck Load
                </option>
              </select>
            </div>

            <Fields
              label={"Order Value"}
              type={"text"}
              field_value={setorder_value}
            />

            <div>
              <p>Payment Terms</p>

              <select
                onChange={(event) => setpayment_term(event.target.value)}
                className="border p-2 w-full border-gray-300"
              >
                <option value="">Select Payment Terms</option>

                <option value="prepaid">Prepaid</option>

                <option value="cash_on_delivery">Cash on Delivery</option>
              </select>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              creating_order();
            }}
            className="bg-[#43aa8b] py-2 px-5 rounded text-white"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOrderForm;
