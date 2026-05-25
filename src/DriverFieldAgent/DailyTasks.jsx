import React, { useEffect, useState } from "react";
import DriverNavbar from "./DriverNavbar";
import axios from "axios";

function DailyTasks() {
  const user_token = localStorage.getItem("token");
  const [getting_shipments, setgetting_shipments] = useState([]);
  const [getting_orders, setgetting_orders] = useState([]);
  const [getting_fleets, setgetting_fleets] = useState([]);

  async function renderingOrders() {
    try {
      const response = await axios.get(`http://localhost:3000/orders`, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      });
      console.log("finding Orders", response.data);
      setgetting_orders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function renderingShipment() {
    try {
      const response = await axios.get(`http://localhost:3000/shipments`, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      });
      setgetting_shipments(response.data);
      console.log("finding shipments", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function renderingFleets() {
    try {
      const response = await axios.get(`http://localhost:3000/fleets`, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      });
      console.log("finding fleets", response.data);
      setgetting_fleets(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    renderingShipment();
    renderingOrders();
    renderingFleets();
  }, []);

  return (
    <div>
      <DriverNavbar />

      {/* <div>
        {getting_shipments.map((ship) => (
          <div>
            <p>{ship.total_loaded_weight}</p>
            {getting_fleets.filter(fleet => fleet.assigned_driver ).map((fleet) => (
              <p></p>
            ))}
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default DailyTasks;
