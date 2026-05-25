import React, { useState } from "react";
import { BiChat } from "react-icons/bi";
import { FaBars, FaUser } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

function OperationManagerNavbar() {
  const navigation = useNavigate();
  const current_location = useLocation();
  const [opening_navbar, setopening_navbar] = useState(false);

  return (
    <div className="flex items-center bg-[#254441] p-3 text-white justify-end sm:justify-between">
      <div className="hidden sm:flex items-center font-semibold space-x-5">
        <button
          onClick={() => {
            navigation("/OperationManagerDashboard");
          }}
          className={`${current_location.pathname === "/OperationManagerDashboard" ? "text-[#43aa8b]" : ""}`}
        >
          Overview
        </button>

        <button
          onClick={() => {
            navigation("/OrderManagement");
          }}
          className={`text-left ${current_location.pathname === "/OrderManagement" ? "text-[#43aa8b]" : ""}`}
        >
          Order Management
        </button>

        <button
          onClick={() => {
            navigation("/ShipmentManagement");
          }}
          className={`text-left ${current_location.pathname === "/ShipmentManagement" ? "text-[#43aa8b]" : ""}`}
        >
          Shipment Management
        </button>

        <button
          onClick={() => {
            navigation("/FleetManagement");
          }}
          className={`${current_location.pathname === "/FleetManagement" ? "text-[#43aa8b]" : ""}`}
        >
          Fleet Management
        </button>

        <button
          onClick={() => {
            navigation("/AssetManagement");
          }}
          className={`${current_location.pathname === "/AssetManagement" ? "text-[#43aa8b]" : ""}`}
        >
          Asset Management
        </button>
      </div>

      {opening_navbar && (
        <div className="fixed right-0 top-0 h-screen w-64 p-6 bg-white text-[#254441] shadow-lg border-r border-gray-200 font-semibold z-50">
          <div className="flex items-center justify-between">
            <p className="text-[#43aa8b] text-lg font-semibold">Navbar</p>
            <button
              onClick={() => {
                setopening_navbar(false);
              }}
              className="text-red-500 font-semibold"
            >
              Close
            </button>
          </div>
          <hr className="border-gray-400 my-2" />
          <div className="flex flex-col gap-1">
            <button
              onClick={() => navigation("/OperationManagerDashboard")}
              className={`${current_location.pathname === "/OperationManagerDashboard" ? "text-[#43aa8b]" : ""} text-left`}
            >
              Overview
            </button>

            <button
              onClick={() => navigation("/OrderManagement")}
              className={`${current_location.pathname === "/OrderManagement" ? "text-[#43aa8b]" : ""} text-left`}
            >
              Order Management
            </button>

            <button
              onClick={() => navigation("/ShipmentManagement")}
              className={`${current_location.pathname === "/ShipmentManagement" ? "text-[#43aa8b]" : ""} text-left`}
            >
              Shipment Management
            </button>

            <button
              onClick={() => navigation("/FleetManagement")}
              className={`${current_location.pathname === "/FleetManagement" ? "text-[#43aa8b]" : ""} text-left`}
            >
              Fleet Management
            </button>

            <button
              onClick={() => navigation("/AssetManagement")}
              className={`${current_location.pathname === "/AssetManagement" ? "text-[#43aa8b]" : ""} text-left`}
            >
              Asset Management
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <button className="flex items-center font-semibold">
          <BiChat className="mr-1" /> Chat
        </button>
        <button
          onClick={() => {
            navigation("/Login");
          }}
        >
          <FaUser />
        </button>

        <button
          onClick={() => {
            setopening_navbar(!opening_navbar);
          }}
          className="sm:hidden"
        >
          <FaBars />
        </button>
      </div>
    </div>
  );
}

export default OperationManagerNavbar;
