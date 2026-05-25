import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SelectOrg() {
  const navigation = useNavigate();
  const [gettingOrg, setgettingOrg] = useState([]);
  const [selected_org, setselected_org] = useState("");

  async function renderingOrg() {
    try {
      const response = await axios.get(`http://localhost:3000/organizations`);
      setgettingOrg(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    renderingOrg();
  }, []);

  return (
    <div className="flex items-center bg-gray-100 justify-center h-screen w-screen">
      <div className="bg-white w-5/12 p-5 border border-gray-300 shadow">
        <p className="font-semibold mb-5">
          Welcome to{" "}
          <span className=" text-xl font-bold">
            ANU<span className="italic">ships</span>
          </span>
        </p>
        <div className="flex items-center space-x-5">
          <select
            onChange={(event) => {
              const org = JSON.parse(event.target.value);
              setselected_org(org);
            }}
            className="border border-gray-400 w-full p-3 rounded"
          >
            <option>Select Org</option>
            {gettingOrg.map((org) => (
              <option key={org.id} value={JSON.stringify(org)}>
                {org.entity_name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              localStorage.setItem("id", selected_org.id);
              localStorage.setItem("name", selected_org.entity_name);
              navigation("/Login");
            }}
            className="py-3 px-6 bg-gray-800 text-white rounded"
          >
            Proceed
          </button>
        </div>
        <div className="flex items-center justify-center mt-3 space-x-2">
          <p className="">Register your Organzation here</p>
          <button
            onClick={() => {
              navigation("/RegisterOrganization");
            }}
            className="font-bold"
          >
            Register Organzation
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectOrg;
