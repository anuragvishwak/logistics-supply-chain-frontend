import React, { useEffect, useState } from "react";
import OperationManagerNavbar from "./OperationManagerNavbar";
import AddShipmentForm from "./AddShipmentForm";
import CreateShipmentForm from "./CreateShipmentForm";
import axios from "axios";
import { HiArrowLongRight } from "react-icons/hi2";
import { FaTruckLoading } from "react-icons/fa";
import { FaTruck } from "react-icons/fa6";

function ShipmentManagement() {
  const user_token = localStorage.getItem("token");
  const [open_add_shipment_form, setopen_add_shipment_form] = useState(false);
  const [getting_shipments, setgetting_shipments] = useState([]);
  const [getting_orders, setgetting_orders] = useState([]);
  const [getting_fleets, setgetting_fleets] = useState([]);

  async function renderingShipment() {
    try {
      const response = await axios.get(`http://localhost:3000/shipments`, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      });
      setgetting_shipments(response.data);
      console.log("finding shipments", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function renderingOrders() {
    try {
      const response = await axios.get(`http://localhost:3000/orders`, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      });
      console.log("finding Orders", response.data);
      setgetting_orders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function renderingFleets() {
    try {
      const response = await axios.get(`http://localhost:3000/fleets`, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      });
      console.log("finding fleets", response.data);
      setgetting_fleets(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    renderingShipment();
    renderingOrders();
    renderingFleets();
  }, []);
  return (
    <div className="bg-gray-100 h-screen">
      <OperationManagerNavbar />
      <div className="p-5">
        <div className="w-full flex items-start justify-between bg-white border border-gray-400 p-5 rounded shadow">
          <p className="text-[#254441] text-lg sm:text-xl font-bold">
            Shipment Management
          </p>

          <button
            onClick={() => {
              setopen_add_shipment_form(true);
            }}
            className="text-white bg-[#43aa8b] text-sm sm:text-base font-semibold px-4 rounded py-1"
          >
            + Create Shipment
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-5">
          {getting_shipments.map((ship) => (
            <div className="bg-white p-5 border border-gray-400">
              {getting_orders
                .filter((order) => order.id === ship.order_id)
                .map((order) => (
                  <div>
                    <div className="sm:flex items-center justify-between">
                      <p className="font-bold sm:text-lg">
                        {order.client_name}
                      </p>
                      <p>
                        Loaded Weight:{" "}
                        <span className="text-sm sm:text-base font-bold">
                          {ship.total_loaded_weight} kg
                        </span>
                      </p>
                    </div>

                    <hr className="border-gray-400 my-2" />
                    <div>
                      <div className="sm:flex items-center text-sm sm:text-base justify-between">
                        <div>
                          <p className="font-semibold  text-gray-600">
                            Pickup Address
                          </p>
                          <p>{order.pickup_address}</p>
                        </div>
                        <HiArrowLongRight
                          className="hidden sm:block"
                          size={30}
                        />
                        <div>
                          <p className="font-semibold text-gray-600">
                            Delivery Address
                          </p>
                          <p>{order.delivery_address}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-gray-600 font-semibold">
                          Checkpoints:
                        </p>
                        <div className="grid grid-cols-3 sm:flex text-sm sm:text-base items-center sm:space-x-4">
                          {ship.checkpoints.map((check) => (
                            <div className="flex items-center space-x-1">
                              <input type="radio" />
                              <p>{check.checkpoint_name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <hr className="border-gray-400 my-2" />

                    <div>
                      <p className="text-sm sm:text-base font-semibold">
                        Fleet Details
                      </p>

                      <div>
                        {getting_fleets
                          .filter((fleet) => fleet.id === ship.fleet_id)
                          .map((fleet) => (
                            <div>
                              <div className="flex text-gray-600 text-sm sm:text-base font-semibold items-center space-x-1">
                                <FaTruck />
                                <p>{fleet.vehicle_model}</p>
                              </div>
                              <p className="text-sm sm:text-base">
                                Driver: {fleet.assigned_driver}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {open_add_shipment_form && (
        <CreateShipmentForm
          setopen_add_shipment_form={setopen_add_shipment_form}
        />
      )}
    </div>
  );
}

export default ShipmentManagement;
