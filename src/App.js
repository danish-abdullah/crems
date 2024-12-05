import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddTenant from "./pages/forms/AddTenant";
import AddVisitor from "./pages/forms/AddVisitors";
import AddBuilding from "./pages/forms/AddBuilding";
import AddApartment from "./pages/forms/AddApartment";
import ViewApartments from "./pages/views/ViewApartments";
import ViewBuildings from "./pages/views/ViewBuildings";
import ViewTenants from "./pages/views/ViewTenants";
import ViewVisitors from "./pages/views/ViewVisitors";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-tenant" element={<AddTenant />} />
        <Route path="/add-visitor" element={<AddVisitor />} />
        <Route path="/add-building" element={<AddBuilding />} />
        <Route path="/add-apartment" element={<AddApartment />} />
        <Route path="/view-apartments" element={<ViewApartments />} />
        <Route path="/view-buildings" element={<ViewBuildings />} />
        <Route path="/view-tenants" element={<ViewTenants />} />
        <Route path="/view-visitors" element={<ViewVisitors />} />
      </Routes>
    </Router>
  );
}

export default App;
