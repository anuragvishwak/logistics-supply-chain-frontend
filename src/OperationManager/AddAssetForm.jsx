import React, { useState } from "react";
import Fields from "../CentralizedComponent/Fields";
import axios from "axios";

function AddAssetForm({ setopen_asset_form }) {
  const org_id = localStorage.getItem("id");
  const user_token = localStorage.getItem("token");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [asset_name, setasset_name] = useState("");
  const [asset_code, setasset_code] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSubCategory("");
  };

  const category_map = {
    fleet: [
      { value: "three_wheeler", label: "3-Wheeler Cargo (e.g., Piaggio Ape)" },
      {
        value: "lcv",
        label: "Light Commercial Vehicle (LCV - e.g., Tata Ace)",
      },
      { value: "hcv", label: "Heavy Commercial Vehicle (HCV - Long Haul)" },
      { value: "ev_cargo", label: "Electric Delivery Vehicle" },
    ],
    material_handling: [
      { value: "forklift", label: "Forklifts" },
      { value: "pallet_jack", label: "Pallet Jacks & Trolleys" },
      { value: "dock_leveler", label: "Dock Levelers & Ramps" },
    ],
    operations_tech: [
      { value: "scanner", label: "Barcode & RFID Scanners" },
      { value: "printer", label: "Thermal Label Printers" },
      { value: "gps_beacon", label: "GPS Tracking Hardware" },
    ],
    storage_infra: [
      { value: "racking", label: "Pallet Racking Systems" },
      { value: "weighing", label: "Industrial Weighing Scales" },
      { value: "cold_storage", label: "Refrigeration Units" },
    ],
  };

  async function create_asset() {
    const asset_data = {
      category: category,
      sub_category: subCategory,
      asset_name: asset_name,
      asset_code: asset_code,
      organization_id: org_id,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/assets",
        { asset: asset_data },
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
              setopen_asset_form(false);
            }}
            className="text-red-500 font-semibold"
          >
            Close
          </button>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="font-medium text-gray-700 mb-1">Asset Category</p>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="border p-2 w-full border-gray-300 rounded"
            >
              <option value="">Select Category</option>
              <option value="fleet">Fleet (Vehicles)</option>
              <option value="material_handling">
                Material Handling Equipment
              </option>
              <option value="operations_tech">
                Operations Technology / IT
              </option>
              <option value="storage_infra">Storage & Infrastructure</option>
            </select>
          </div>

          <div>
            <p className="font-medium text-gray-700 mb-1">Subcategory</p>
            <select
              value={subCategory}
              onChange={(event) => setSubCategory(event.target.value)}
              disabled={!category}
              className="border p-2 w-full border-gray-300 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {category
                  ? "Select Subcategory"
                  : "Please select a category first"}
              </option>

              {category &&
                category_map[category].map((sub) => (
                  <option key={sub.value} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
            </select>
          </div>
          <Fields
            type={"text"}
            label={"Asset Name"}
            field_value={setasset_name}
          />
          <Fields
            type={"text"}
            label={"Asset Code"}
            field_value={setasset_code}
          />
        </div>
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              create_asset();
            }}
            className="bg-[#43aa8b] py-1 px-4 rounded text-white"
          >
            Add Asset
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAssetForm;
