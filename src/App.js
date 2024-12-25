import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SuperAdminDashboard from "./pages/dashboards/SuperAdminDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import MaintenanceDashboard from "./pages/dashboards/MaintenanceDashboard";
import TenantDashboard from "./pages/dashboards/TenantDashboard";
import SalesDashboard from "./pages/dashboards/SalesDashboard";
import AddTenant from "./pages/forms/AddTenant";
import AddVisitor from "./pages/forms/AddVisitors";
import AddBuilding from "./pages/forms/AddBuilding";
import AddSales from "./pages/forms/AddSales";
import AddMaintenace from "./pages/forms/AddMaintenance";
import AddAdmin from "./pages/forms/AddAdmin";
import AddApartment from "./pages/forms/AddApartment";
import ViewApartments from "./pages/views/ViewApartments";
import ViewBuildings from "./pages/views/ViewBuildings";
import ViewTenants from "./pages/views/ViewTenants";
import ViewVisitors from "./pages/views/ViewVisitors";
import ViewSales from "./pages/views/ViewSales";
import ViewMaintenance from "./pages/views/ViewMaintenance";
import ViewAdmins from "./pages/views/ViewAdmins";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/maintenance-dashboard" element={<MaintenanceDashboard />} />
        <Route path="/sales-dashboard" element={<SalesDashboard />} />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        <Route path="/add-tenant" element={<AddTenant />} />
        <Route path="/add-visitor" element={<AddVisitor />} />
        <Route path="/add-building" element={<AddBuilding />} />
        <Route path="/add-apartment" element={<AddApartment />} />
        <Route path="/add-sales" element={<AddSales />} />
        <Route path="/add-maintenance" element={<AddMaintenace />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/view-apartments" element={<ViewApartments />} />
        <Route path="/view-buildings" element={<ViewBuildings />} />
        <Route path="/view-tenants" element={<ViewTenants />} />
        <Route path="/view-visitors" element={<ViewVisitors />} />
        <Route path="/view-sales" element={<ViewSales />} />
        <Route path="/view-maintenance" element={<ViewMaintenance />} />
        <Route path="/view-admins" element={<ViewAdmins />} />
      </Routes>
  );
}

export default App;
