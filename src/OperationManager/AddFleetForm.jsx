import React, { useState } from "react";
import Fields from "../CentralizedComponent/Fields";
import axios from "axios";

function AddFleetForm({ renderingOrders, setopen_fleet_form }) {
  const org_id = localStorage.getItem("id");
  const user_token = localStorage.getItem("token");
  const [license_number, setlicense_number] = useState("");
  const [vehicle_model, setvehicle_model] = useState("");
  const [vehicle_type, setvehicle_type] = useState("");
  const [weight_capacity, setweight_capacity] = useState("");
  const [insurance_expiry_date, setinsurance_expiry_date] = useState("");
  const [pollution_under_control, setpollution_under_control] = useState("");
  const [operational_role, setoperational_role] = useState("");

  async function create_feet() {
    const fleet_data = {
      license_plate_number: license_number,
      vehicle_model: vehicle_model,
      vehicle_type: vehicle_type,
      weight_capacity: weight_capacity,
      insurance_expiry_date: insurance_expiry_date,
      pollution_under_control: pollution_under_control,
      organization_id: org_id,
      operational_role: operational_role,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/fleets",
        { fleet: fleet_data },
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        },
      );
      console.log("Everything went successfull!", response.data);
      setopen_fleet_form(false);
      renderingOrders();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-5">
        <div className="flex items-start justify-between">
          <p className="text-xl text-[#254441] font-bold">Create Fleet</p>
          <button
            onClick={() => {
              setopen_fleet_form(false);
            }}
            className="text-red-500 font-semibold"
          >
            Close
          </button>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-5">
            <Fields
              type={"text"}
              label={"License Plate Number"}
              field_value={setlicense_number}
            />
            <Fields
              type={"text"}
              label={"Vehicle Model"}
              field_value={setvehicle_model}
            />

            <Fields
              type={"text"}
              label={"Vehicle Type"}
              field_value={setvehicle_type}
            />
            <div>
              <p>Operational Role</p>
              <select
                onChange={(event) => setoperational_role(event.target.value)}
                className="border p-2 w-full border-gray-300"
              >
                <option value="">Select Operational Role</option>
                <option value="first_mile_pickup">First Mile Pickup</option>
                <option value="first_mile_delivery">First Mile Delivery</option>
                <option value="point_to_point">Point to Point (P2P)</option>
              </select>
            </div>

            <Fields
              type={"text"}
              label={"Weight Capacity"}
              field_value={setweight_capacity}
            />
            <Fields
              type={"date"}
              label={"Insurance Expiry Date"}
              field_value={setinsurance_expiry_date}
            />
            <Fields
              type={"date"}
              label={"Pollution Under Control"}
              field_value={setpollution_under_control}
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              create_feet();
            }}
            className="bg-[#43aa8b] py-1 px-4 rounded text-white"
          >
            Add Fleet
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddFleetForm;
