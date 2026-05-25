import React, { useEffect, useState } from "react";
import OperationManagerNavbar from "./OperationManagerNavbar";
import AddOrderForm from "./AddOrderForm";
import axios from "axios";
import { HiArrowLongRight } from "react-icons/hi2";
import { FaIndianRupeeSign, FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import AddShipmentForm from "./AddShipmentForm";
import OperationManagerDashboard from "./OperationManagerDashboard";

function OrderManagement() {
  const user_token = localStorage.getItem("token");
  const [open_create_order_form, setopen_create_order_form] = useState(false);
  const [getting_orders, setgetting_orders] = useState([]);
  const [current_tab, setcurrent_tab] = useState("one_to_many");

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

  useEffect(() => {
    renderingOrders();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen h-full">
      <OperationManagerNavbar />
      <div className="p-5">
        <div className="w-full sm:flex items-center justify-between bg-white border border-gray-400 p-5 rounded shadow">
          <p className="text-[#254441] text-xl font-bold">Order Management</p>

          <div className="flex text-sm sm:text-base items-center space-x-2">
            <div className="border border-gray-400 text-[#254441] font-semibold rounded shadow-inner flex items-center space-x-2 p-1 bg-gray-200">
              <button
                onClick={() => {
                  setcurrent_tab("one_to_many");
                }}
                className={`px-2 py-0.5 ${current_tab === "one_to_many" ? "bg-white rounded border-gray-300 border shadow" : ""}`}
              >
                One to Many
              </button>
              <button
                onClick={() => {
                  setcurrent_tab("many_to_one");
                }}
                className={`px-2 py-0.5 ${current_tab === "many_to_one" ? "bg-white rounded border border-gray-300 shadow" : ""}`}
              >
                Many to One
              </button>
            </div>
            <button
              onClick={() => {
                setopen_create_order_form(true);
              }}
              className="text-white bg-[#43aa8b] font-semibold px-4 rounded py-2"
            >
              + Create Order
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 overflow-y-scroll scrollbar-hide h-[calc(100vh-200px)] mt-5 gap-5">
          {getting_orders.map((orders) => (
            <div className="bg-white  border border-gray-400 p-5">
              <div className="sm:flex items-center justify-between">
                <p className="text-[#254441] text-lg font-bold">
                  {orders.client_name}
                </p>
                <div className="flex items-center text-sm sm:text-base font-semibold text-[#43aa8b] space-x-2">
                  <p>{orders.order_date}</p>
                  <span>|</span>
                  <p>{orders.distance} km</p>
                  <span>|</span>
                  <p
                    className={`${orders.priority === "urgent" ? "text-red-500" : ""}`}
                  >
                    {orders.priority === "urgent" ? "Urgent" : ""}
                  </p>
                </div>
              </div>
              <hr className="border-gray-400 my-2" />
              <div className="sm:flex text-sm sm:text-base items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-600">Pickup Address</p>
                  <p>{orders.pickup_address}</p>
                </div>
                <HiArrowLongRight className="hidden sm:block" size={30} />
                <div>
                  <p className="font-semibold text-gray-600">
                    Delivery Address
                  </p>
                  <p>{orders.delivery_address}</p>
                </div>
              </div>
              <hr className="border-gray-400 my-2" />
              <p>Order Details</p>

              <div className="grid text-sm sm:text-base grid-cols-2 gap-2">
                <div>
                  <p className="font-semibold text-gray-600">Order Value:</p>
                  <div className="flex items-center space-x-1">
                    <FaIndianRupeeSign size={14} />
                    <p>{orders.order_value} /-</p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Order Category:</p>
                  <p className="capitalize">{orders.product_category}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Order Quantity:</p>
                  <p className="capitalize">{orders.quantity} pcs</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">
                    Order Total Weight:
                  </p>
                  <p className="capitalize">{orders.total_weight} kg</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Payment Term:</p>
                  <p>
                    {orders.payment_term === "cash_on_delivery"
                      ? "Cash on Delivery"
                      : ""}
                  </p>
                </div>
              </div>

              <div className="my-5 bg-gray-200 p-3 border text-sm sm:text-base border-gray-300">
                <p className="font-semibold text-gray-600">
                  Order Total Weight:
                </p>
                <p>{orders.item_description}</p>
              </div>
              <div className="flex items-center justify-end space-x-1">
                <button>
                  <MdDelete className="text-red-500" size={20} />
                </button>
                <button>
                  <FaPencil className="text-[#254441]" size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open_create_order_form && (
        <AddOrderForm setopen_create_order_form={setopen_create_order_form} />
      )}
    </div>
  );
}

export default OrderManagement;
