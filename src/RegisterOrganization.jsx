import React, { useState } from "react";
import Fields from "./CentralizedComponent/Fields";
import Textarea from "./CentralizedComponent/Textarea";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiMathOperations } from "react-icons/pi";
import axios from "axios";

function RegisterOrganization() {
  const navigation = useNavigate();
  const [entity_name, setentity_name] = useState("");
  const [tax_identification, settax_identification] = useState("");
  const [location, setlocation] = useState("");
  const [admin_name, setadmin_name] = useState("");
  const [admin_email, setadmin_email] = useState("");
  const [admin_mobile_number, setadmin_mobile_number] = useState("");
  const [operational_capacity, setoperational_capacity] = useState("");
  const [currency_preference, setcurrency_preference] = useState("");
  const [admin_password, setadmin_password] = useState("");

  async function creatingOrgandUser() {
    const org_data = {
      entity_name: entity_name,
      tax_identification: tax_identification,
      location: location,
      operational_capacity: operational_capacity,
      currency_preference: currency_preference,
    };

    const admin_data = {
      admin_name: admin_name,
      admin_email: admin_email,
      admin_mobile_number: admin_mobile_number,
      admin_password: admin_password,
    };

    const payload = {
      organization: org_data,
      ...admin_data,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/organizations",
        payload,
      );
      console.log("Everything went successfully", response.data);
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-6/12 p-5 border border-gray-400 shadow">
        <div className="flex items-start text-sm justify-between">
          <p className="font-bold mb-3 text-xl">Register your Organization</p>
          <button
            onClick={() => {
              navigation("/");
            }}
            className="flex items-center border border-gray-800 hover:text-white px-4 rounded-full py-1 hover:bg-gray-800 space-x-2"
          >
            <FaArrowLeftLong />
            <p className="font-semibold">Back</p>
          </button>
        </div>
        <div>
          <div>
            <p className="text-lg font-semibold">Organization Registration</p>
            <div className="grid grid-cols-2 gap-3">
              <Fields
                type={"text"}
                label={"Legal Entity Name"}
                field_value={setentity_name}
              />
              <Fields
                type={"text"}
                label={"Tax/GST Identification"}
                field_value={settax_identification}
              />
            </div>

            <Textarea label={"Physical Location"} field_value={setlocation} />
          </div>

          <div className="my-5">
            <p className="text-lg mb-3 font-semibold">
              Admin/Contact Person Details
            </p>
            <div>
              <div className="grid grid-cols-2 gap-3">
                <Fields
                  type={"text"}
                  label={"Admin Full Name"}
                  field_value={setadmin_name}
                />
                <Fields
                  type={"text"}
                  label={"Mobile Number"}
                  field_value={setadmin_mobile_number}
                />

                <Fields
                  type={"text"}
                  label={"Professional Email"}
                  field_value={setadmin_email}
                />

                <Fields
                  type={"text"}
                  label={"Password"}
                  field_value={setadmin_password}
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-lg mb-3 font-semibold">
              Supply Chain Specific Configuration
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Fields
                type={"text"}
                label={"Operational Capacity"}
                field_value={setoperational_capacity}
              />

              <div>
                <p className="font-semibold">Currency Preference</p>

                <select
                  onChange={(event) =>
                    setcurrency_preference(event.target.value)
                  }
                  className="border p-2 w-full border-gray-300"
                >
                  <option value="">Select Currency</option>
                  <option value="INR">🇮🇳 INR - Indian Rupee</option>
                  <option value="USD">🇺🇸 USD - US Dollar</option>
                  <option value="EUR">🇪🇺 EUR - Euro</option>
                  <option value="GBP">🇬🇧 GBP - British Pound</option>
                  <option value="JPY">🇯🇵 JPY - Japanese Yen</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              creatingOrgandUser();
            }}
            className="bg-gray-800 py-1 px-4 rounded text-white"
          >
            Register Organization
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterOrganization;
