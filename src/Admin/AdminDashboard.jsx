import React from "react";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const user_name = localStorage.getItem("name");
  const user_email = localStorage.getItem("email");

  return (
    <div className="h-screen bg-gray-100">
      <AdminNavbar />
      <div className="p-5">
        <div className="bg-white p-4 rounded shadow border border-gray-400">
          <div className="flex items-center justify-between">
            <p className="text-2xl text-[#254441] font-bold">
              Welcome {user_name}
            </p>
            <p className="text-lg font-bold text-[#43aa8b]">Admin</p>
          </div>
          <p className="text-lg text-[#43aa8b]">{user_email}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
