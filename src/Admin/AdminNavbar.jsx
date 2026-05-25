import React from "react";
import { BiChat } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const current_location = useLocation();
  const navigation = useNavigate();

  return (
    <div className="flex items-center bg-[#254441] p-3 text-white justify-between">
      <div className="flex items-center font-semibold space-x-5">
        <button
          onClick={() => {
            navigation("/AdminDashboard");
          }}
          className={`${current_location.pathname === "/AdminDashboard" ? "text-[#43aa8b]" : ""}`}
        >
          Overview
        </button>
        <button
          onClick={() => {
            navigation("/UserManagement");
          }}
          className={`${current_location.pathname === "/UserManagement" ? "text-[#43aa8b]" : ""}`}
        >
          User Management
        </button>
        <button>Financial Reports</button>
        <button>Audit Logs</button>
        <button>Global Setting</button>
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

export default AdminNavbar;
