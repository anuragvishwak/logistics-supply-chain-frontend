import React from "react";
import { BiChat } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

function DriverNavbar() {
  const navigation = useNavigate();
  const current_location = useLocation();
  return (
    <div className="flex items-center bg-[#254441] p-3 text-white justify-between">
      <div className="flex items-center font-semibold space-x-5">
        <button
          onClick={() => {
            navigation("/DriverDashboard");
          }}
          className={`${current_location.pathname === "/DriverDashboard" ? "text-[#43aa8b]" : ""}`}
        >
          Overview
        </button>

        <button
          onClick={() => {
            navigation("/DailyTasks");
          }}
          className={`${current_location.pathname === "/DailyTasks" ? "text-[#43aa8b]" : ""}`}
        >
          Daily Tasks
        </button>
        <button
          onClick={() => {
            navigation("/EarningMaintenance");
          }}
          className={`${current_location.pathname === "/EarningMaintenance" ? "text-[#43aa8b]" : ""}`}
        >
          Earning & Maintenance
        </button>
        <button>Profile</button>
      </div>
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
      </div>
    </div>
  );
}

export default DriverNavbar;
