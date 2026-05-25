import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SelectOrg from "./SelectOrg";
import RegisterOrganization from "./RegisterOrganization";
import AdminDashboard from "./Admin/AdminDashboard";
import InventoryManagerDashboard from "./InventoryManager/InventoryManagerDashboard";
import OperationManagerDashboard from "./OperationManager/OperationManagerDashboard";
import DriverDashboard from "./DriverFieldAgent/DriverDashboard";
import SignUp from "./SignUp";
import UserManagement from "./Admin/UserManagement";
import FleetManagement from "./OperationManager/FleetManagement";
import AssetManagement from "./OperationManager/AssetManagement";
import OrderFulfillment from "./InventoryManager/OrderFulfillment";
import Returns from "./InventoryManager/Returns";
import InboundOperations from "./InventoryManager/InboundOperations";
import InventoryControl from "./InventoryManager/InventoryControl";
import OrderManagement from "./OperationManager/OrderManagement";
import ShipmentManagement from "./OperationManager/ShipmentManagement";
import DailyTasks from "./DriverFieldAgent/DailyTasks";
import EarningMaintenance from "./DriverFieldAgent/EarningMaintenance";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SelectOrg />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />

          <Route
            path="/RegisterOrganization"
            element={<RegisterOrganization />}
          />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/UserManagement" element={<UserManagement />} />

          <Route
            path="/InventoryManagerDashboard"
            element={<InventoryManagerDashboard />}
          />
          <Route
            path="/OperationManagerDashboard"
            element={<OperationManagerDashboard />}
          />

          <Route path="/AssetManagement" element={<AssetManagement />} />
          <Route path="/OrderFulfillment" element={<OrderFulfillment />} />
          <Route path="/Returns" element={<Returns />} />
          <Route path="/InboundOperations" element={<InboundOperations />} />
          <Route path="/InventoryControl" element={<InventoryControl />} />
          <Route path="/FleetManagement" element={<FleetManagement />} />
          <Route path="/OrderManagement" element={<OrderManagement />} />
          <Route path="/ShipmentManagement" element={<ShipmentManagement />} />
          <Route path="/DriverDashboard" element={<DriverDashboard />} />
          <Route path="/DailyTasks" element={<DailyTasks />} />
          <Route path="/EarningMaintenance" element={<EarningMaintenance />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
