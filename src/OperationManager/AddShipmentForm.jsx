import axios from "axios";
import React, { useEffect, useState } from "react";

function AddShipmentForm() {
  const user_token = localStorage.getItem("token");
  const [getting_fleets, setgetting_fleets] = useState([]);

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

  useEffect(() => {
    renderingFleet();
  }, []);
  return (
    <div>
      <p className="text-[#254441] font-semibold">Add Shipment</p>

      <div>
        <div>
          <p>Select Fleet</p>
          <select
            onChange={(event) => setoperational_role(event.target.value)}
            className="border p-2 w-full border-gray-300"
          >
            <option>Select Fleet</option>
            {getting_fleets.map((fleet) => (
              <option>{fleet.vehicle_model}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default AddShipmentForm;
