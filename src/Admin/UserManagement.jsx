import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

function UserManagement() {
  const user_token = localStorage.getItem("token");
  const [gettingUsers, setgettingUsers] = useState([]);

  async function renderingUsers() {
    try {
      const response = await axios.get(`http://localhost:3000/users`, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      });
      console.log("finding Users", response.data);
      setgettingUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateStatus(userId, status) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${userId}`,
        { system_status: status },
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        },
      );

      console.log("Status Updated:", response.data);
      renderingUsers();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    renderingUsers();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <AdminNavbar />
      <div className="p-5">
        <div className="bg-white border border-gray-400 p-5 rounded">
          <p className="text-xl font-bold">User Management</p>
        </div>
        <div className="flex mt-5 justify-center">
          <div className="grid grid-cols-3 w-full gap-5">
            {gettingUsers.map((user) => (
              <div className="bg-white border p-5 border-gray-400 shadow">
                <div className="flex items-start justify-between">
                  <p className="text-lg font-semibold">{user.name}</p>
                  <div className="flex items-center space-x-2">
                    <p>{user.role}</p>
                    <select
                      className="border border-gray-400 w-28 p-1 rounded"
                      value={user.system_status}
                      onChange={(e) => updateStatus(user.id, e.target.value)}
                    >
                      <option value="approved">Approve</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Reject</option>
                    </select>
                  </div>
                </div>
                <p>{user.email}</p>
                <p>{user.mobile_number}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
