import React, { useEffect, useState } from "react";
import OperationManagerNavbar from "./OperationManagerNavbar";
import { GiOpeningShell } from "react-icons/gi";
import AddAssetForm from "./AddAssetForm";
import axios from "axios";

function AssetManagement() {
  const user_token = localStorage.getItem("token");
  const [open_asset_form, setopen_asset_form] = useState(false);
  const [getting_assets, setgetting_assets] = useState([]);

  async function renderingFleet() {
    try {
      const response = await axios.get(`http://localhost:3000/assets`, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      });
      console.log("finding assets", response.data);
      setgetting_assets(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    renderingFleet();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <OperationManagerNavbar />
      <div className="p-5">
        <div className="w-full flex items-start justify-between bg-white border border-gray-400 p-5 rounded shadow">
          <p className="text-[#254441] text-xl font-bold">Asset Management</p>
          <button
            onClick={() => {
              setopen_asset_form(true);
            }}
            className="text-white bg-[#43aa8b] font-semibold px-4 rounded py-1"
          >
            + Create Asset
          </button>
        </div>

        <div className="grid grid-cols-3 mt-5 gap-5">
          {getting_assets.map((asset) => (
            <div className="p-5 bg-white border border-gray-400">
              <div className="flex items-start justify-between">
                <p className="text-lg text-[#254441] font-bold">
                  {asset.asset_name}
                </p>
                <p className="font-semibold text-[#43aa8b]">
                  {asset.asset_code}
                </p>
              </div>

              <hr className="border-gray-400 my-2" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-600">Category:</p>
                  <p className="capitalize">
                    {asset.category === "storage_infra"
                      ? "Storage Infrastructure"
                      : "Point to Point (P2P)"}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Sub Category:</p>
                  <p className="capitalize">{asset.sub_category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {open_asset_form && (
        <AddAssetForm setopen_asset_form={setopen_asset_form} />
      )}
    </div>
  );
}

export default AssetManagement;
