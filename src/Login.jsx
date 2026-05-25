import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const navigation = useNavigate();
  const organization_name = localStorage.getItem("name");
  const [user_email, setuser_email] = useState("");
  const [user_password, setuser_password] = useState("");

  async function authenticating_user() {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: user_email,
        password: user_password,
      });

      const user = response.data.user;

      switch (user.system_status) {
        case "approved":
          switch (user.role) {
            case "admin":
              navigation("/AdminDashboard");
              break;

            case "operation_manager":
              navigation("/OperationManagerDashboard");
              break;

            case "inventory_manager":
              navigation("/InventoryManagerDashboard");
              break;

            case "driver":
              navigation("/DriverDashboard");
              break;

            default:
              alert("Invalid role");
          }
          break;

        case "pending":
          alert("Your account is pending approval by admin.");
          break;

        case "rejected":
          alert("Your account bas been rejected by admin.");
          break;

        default:
          alert("Unknown account status");
      }

      console.log("login sucessfully", response.data);
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.name);
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async function renderingUsers() {
    try {
      const response = await axios.get("http://localhost:3000/users");
      console.log("getting users", response.data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  useEffect(() => {
    renderingUsers();
  });

  return (
    <div className="bg-gray-100 h-screen w-screen flex items-center justify-center">
      <div className="p-5 bg-white w-96 border border-gray-400 shadow">
        <div>
          <p className="text-xl italic font-semibold">
            Welcome to <span className="font-bold">{organization_name}</span>
          </p>
          <p className="text-2xl font-semibold mt-3">Sign In</p>
          <div className="my-3">
            <div>
              <p className="text-lg font-semibold">Email</p>
              <input
                onChange={(event) => {
                  setuser_email(event.target.value);
                }}
                type="email"
                placeholder="johnDoe@amazon.com"
                className="border p-1 w-full border-gray-300"
              />
            </div>

            <div>
              <p className="text-lg font-semibold">Password</p>
              <input
                onChange={(event) => {
                  setuser_password(event.target.value);
                }}
                type="password"
                placeholder="*******"
                className="border p-1 w-full border-gray-300"
              />
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                authenticating_user();
              }}
              className="bg-gray-800 py-1 w-full rounded text-white"
            >
              Sign In
            </button>
          </div>

          <div className="flex items-center space-x-2 justify-center">
            <p>Don't have an account ?</p>
            <button
              onClick={() => {
                navigation("/SignUp");
              }}
              className="font-semibold"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
