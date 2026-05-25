import axios from "axios";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigation = useNavigate();
  const organization_id = localStorage.getItem("id");
  const organization_name = localStorage.getItem("name");
  const [user_email, setuser_email] = useState("");
  const [user_password, setuser_password] = useState("");
  const [user_name, setuser_name] = useState("");
  const [mobile_number, setmobile_number] = useState("");
  const [user_role, setuser_role] = useState("");

  async function creating_user() {
    const user_data = {
      user: {
        name: user_name,
        email: user_email,
        password: user_password,
        role: user_role,
        organization_id: organization_id,
        system_status: "pending",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        user_data,
      );
      console.log("User created sucessfully!!", response.data);
      navigation("/Login");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  return (
    <div className="bg-gray-100 h-screen w-screen flex items-center justify-center">
      <div className="p-5 bg-white w-5/12 border border-gray-400 shadow">
        <div>
          <p className="text-xl italic font-semibold">
            Welcome to <span className="font-bold">{organization_name}</span>
          </p>
          <p className="text-2xl font-semibold mt-3">Sign In</p>
          <div className="my-3">
            <div>
              <p className="text-lg font-semibold">Role</p>
              <select
                onChange={(event) => {
                  setuser_role(event.target.value);
                }}
                className="border p-1 w-full border-gray-300"
              >
                <option>select Role</option>
                <option value={"operation_manager"}>Operation Manager</option>
                <option value={"inventory_manager"}>Inventory Manager</option>
                <option value={"driver"}>Driver</option>
              </select>
            </div>
            <div className="grid grid-cols-2 my-5 gap-5">
              <div>
                <p className="text-lg font-semibold">Name</p>
                <input
                  onChange={(event) => {
                    setuser_name(event.target.value);
                  }}
                  type="text"
                  placeholder="John Doe"
                  className="border p-1 w-full border-gray-300"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">Mobile Number</p>
                <input
                  onChange={(event) => {
                    setmobile_number(event.target.value);
                  }}
                  type="text"
                  placeholder="+91 9347584373"
                  className="border p-1 w-full border-gray-300"
                />
              </div>
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
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => {
                creating_user();
              }}
              className="bg-gray-800 py-1 w-full rounded text-white"
            >
              Create Account
            </button>
          </div>

          <div className="flex items-center mt-5 space-x-2 justify-center">
            <p>Already have an account ?</p>
            <button
              onClick={() => {
                navigation("/Login");
              }}
              className="font-semibold"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
