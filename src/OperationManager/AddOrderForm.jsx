import React, { useState } from "react";
import { SiRedhatopenshift } from "react-icons/si";
import Fields from "../CentralizedComponent/Fields";
import Textarea from "../CentralizedComponent/Textarea";
import axios from "axios";

function AddOrderForm({ setopen_create_order_form }) {
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
      delivery_address: delivery_address,
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
      console.log("Everything went successfull!", response.data);
      setopen_create_order_form(false);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white w-10/12 p-5">
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

        <div className="grid grid-cols-2 gap-5">
          <div>
            <div>
              <p className="text-[#254441] font-semibold text-lg">
                Header Information
              </p>
              <div className="grid grid-cols-3 gap-5">
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
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <p>Product/Item Category</p>
                  <select
                    onChange={(event) =>
                      setproduct_category(event.target.value)
                    }
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
          </div>

          <div>
            <div>
              <p className="text-[#254441] font-semibold text-lg">
                Route Information
              </p>
              <Fields
                label={"Distance"}
                type={"text"}
                field_value={setdistance}
              />
              <div className="grid grid-cols-2 gap-5">
                <Textarea
                  label={"Pickup Address"}
                  field_value={setpickupaddress}
                />
                <Textarea
                  label={"Delivery Address"}
                  field_value={setdelivery_address}
                />
              </div>
            </div>

            <div className="mt-5">
              <p className="text-[#254441] font-semibold text-lg">
                Billing & Requirements
              </p>
              <div className="grid grid-cols-3 gap-5">
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
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              creating_order();
            }}
            className="bg-[#43aa8b] py-1 px-4 rounded text-white"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOrderForm;
