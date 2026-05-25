import React from "react";
import { BiChat } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

function InventoryManagerNavbar() {
  const navigation = useNavigate();
  const current_location = useLocation();

  return (
    <div className="flex items-center bg-[#254441] p-3 text-white justify-between">
      <div className="flex items-center font-semibold space-x-5">
        <button
          onClick={() => {
            navigation("/InventoryManagerDashboard");
          }}
          className={`${current_location.pathname === "/InventoryManagerDashboard" ? "text-[#43aa8b]" : ""}`}
        >
          Overview
        </button>
        <button
          onClick={() => {
            navigation("/InboundOperations");
          }}
          className={`${current_location.pathname === "/InboundOperations" ? "text-[#43aa8b]" : ""}`}
        >
          Inbound Operations
        </button>
        <button
          onClick={() => {
            navigation("/InventoryControl");
          }}
          className={`${current_location.pathname === "/InventoryControl" ? "text-[#43aa8b]" : ""}`}
        >
          Inventory Control
        </button>

        <button
          onClick={() => {
            navigation("/OrderFulfillment");
          }}
          className={`${current_location.pathname === "/OrderFulfillment" ? "text-[#43aa8b]" : ""}`}
        >
          Order Fulfillment
        </button>

        <button
          onClick={() => {
            navigation("/Returns");
          }}
          className={`${current_location.pathname === "/Returns" ? "text-[#43aa8b]" : ""}`}
        >
          Returns
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <button className="flex items-center font-semibold">
          <BiChat className="mr-1" /> Chat
        </button>
        <button>
          <FaUser />
        </button>
      </div>
    </div>
  );
}

export default InventoryManagerNavbar;
