import React, { useEffect, useState } from "react";
import OperationManagerNavbar from "./OperationManagerNavbar";
import AddFleetForm from "./AddFleetForm";
import axios from "axios";

function FleetManagement() {
  const user_token = localStorage.getItem("token");
  const [open_fleet_form, setopen_fleet_form] = useState(false);
  const [getting_fleets, setgetting_fleets] = useState([]);
  const [open_assign_driver, setopen_assign_driver] = useState(false);
  const [gettingUsers, setgettingUsers] = useState([]);
  const [selected_driver, setselected_driver] = useState("");

  async function renderingFleet() {
    try {
      const response = await axios.get(`http://localhost:3000/fleets`, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      });
      console.log("finding Fleets", response.data);
      setgetting_fleets(response.data);
    } catch (error) {
      console.log(error);
    }
  }

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

  async function update_driver(fleet_id, driver) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/fleets/${fleet_id}`,
        { assigned_driver: driver },
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        },
      );
      console.log("Driver assigned successfully!!");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    renderingFleet();
    renderingUsers();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen h-full">
      <OperationManagerNavbar />
      <div className="p-3 sm:p-5">
        <div className="w-full flex items-start justify-between bg-white border border-gray-400 p-5">
          <p className="text-[#254441] text-lg sm:text-xl font-bold">
            Fleet Management
          </p>

          <button
            onClick={() => {
              setopen_fleet_form(true);
            }}
            className="text-white bg-[#43aa8b] text-sm sm:text-base font-semibold px-4 rounded py-1"
          >
            + Create Fleet
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-3 sm:mt-5 overflow-y-scroll scrollbar-hide h-[calc(100vh-160px)] sm:h-[calc(100vh-200px)] gap-5">
          {getting_fleets.map((fleet) => (
            <div className="p-5 bg-white border border-gray-400">
              <div className="flex items-start justify-between">
                <p className="sm:text-lg text-[#254441] font-bold">
                  {fleet.vehicle_model}
                </p>
                <p className="font-semibold text-sm sm:text-base text-[#43aa8b]">
                  {fleet.vehicle_type}
                </p>
              </div>
              <hr className="border-gray-400 my-2" />
              <div className="sm:flex items-center text-sm sm:text-base space-y-2 sm:space-y-0 sm:space-x-28">
                <div>
                  <p className="font-semibold text-gray-600">
                    Weight Capacity:
                  </p>
                  <p className="capitalize">{fleet.weight_capacity} kg</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-600">
                    Operational Role:
                  </p>
                  <p className="capitalize">
                    {fleet.operational_role === "first_mile_pickup"
                      ? "First Mile Pickup"
                      : fleet.operational_role === "first_mile_delivery"
                        ? "First Mile Delivery"
                        : "Point to Point (P2P)"}
                  </p>
                </div>
              </div>
              <hr className="border-gray-400 my-2" />

              <div className="grid text-sm sm:text-base space-y-2 sm:space-y-0 grid-cols-1 sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-gray-600">
                    Insurance Expiry Date:
                  </p>
                  <p className="capitalize">{fleet.insurance_expiry_date}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">
                    Pollution Under Control (PUC) Date:
                  </p>
                  <p className="capitalize">{fleet.pollution_under_control}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">License Number:</p>
                  <p className="capitalize">{fleet.license_plate_number}</p>
                </div>
              </div>

              <div className="p-3 border mt-5 border-gray-400">
                {!fleet.assigned_driver ? (
                  <div>
                    <p className="text-[#254441] mb-1 font-semibold">
                      Assign Driver
                    </p>
                    <div className="flex items-center space-x-2">
                      <select
                        value={fleet.assigned_driver || ""}
                        onChange={(event) => {
                          setselected_driver(event.target.value);
                          update_driver(fleet.id, event.target.value);
                        }}
                        className="border p-1 rounded w-full border-gray-300"
                      >
                        <option>Select Driver to Assign</option>
                        {gettingUsers
                          .filter((user) => user.role === "driver")
                          .map((user) => (
                            <option value={user.name}>{user.name}</option>
                          ))}
                      </select>
                      <button
                        onClick={() => {
                          setopen_assign_driver(!open_assign_driver);
                        }}
                        className="bg-[#43aa8b] py-1 w-40 rounded text-white"
                      >
                        Assign Driver
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <p className="text-[#254441] mt-3 mb-1 font-semibold">
                    Driver Details
                  </p>
                  {gettingUsers
                    .filter((user) => user.name === fleet.assigned_driver)
                    .map((user) => (
                      <div>
                        <p>Name: {user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.mobile_number}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open_fleet_form && (
        <AddFleetForm setopen_fleet_form={setopen_fleet_form} />
      )}
    </div>
  );
}

export default FleetManagement;
