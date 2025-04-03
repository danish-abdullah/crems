import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SuperAdminDashboard from "./pages/dashboards/SuperAdminDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import MaintenanceDashboard from "./pages/dashboards/MaintenanceDashboard";
import TenantDashboard from "./pages/dashboards/TenantDashboard";
import SalesDashboard from "./pages/dashboards/SalesDashboard";
import VisitorDashboard from "./pages/dashboards/VisitorDashboard";
import AddTenant from "./pages/forms/AddTenant";
import AddVisitor from "./pages/forms/AddVisitors";
import AddBuilding from "./pages/forms/AddBuilding";
import AddSales from "./pages/forms/AddSales";
import AddMaintenace from "./pages/forms/AddMaintenance";
import AddAdmin from "./pages/forms/AddAdmin";
import AddVisitorSales from "./pages/forms/AddVisitorSales";
import AddApartment from "./pages/forms/AddApartment";
import AddComplaint from "./pages/forms/AddComplaint";
import AddMaintenanceRequest from "./pages/forms/AddMaintenanceRequest";
import ViewApartments from "./pages/views/ViewApartments";
import ViewBuildings from "./pages/views/ViewBuildings";
import ViewTenants from "./pages/views/ViewTenants";
import ViewVisitors from "./pages/views/ViewVisitors";
import ViewSales from "./pages/views/ViewSales";
import ViewMaintenance from "./pages/views/ViewMaintenance";
import ViewMaintenanceRequests from "./pages/views/ViewMaintenanceRequests";
import ViewMaintenanceRequestsMaintenance from "./pages/views/ViewMaintenanceRequestsMaintenance";
import ViewComplaintsAdmin from "./pages/views/ViewComplaintsAdmin";
import ViewAdmins from "./pages/views/ViewAdmins";
import ViewVisitorsSales from "./pages/views/ViewVisitorsSales";
import ViewMaintenanceRequestsTenant from "./pages/views/ViewMaintenanceRequestsTenant";
import ViewComplaintsTenant from "./pages/views/ViewComplaintsTenant";
import AddVisitorVisitor from "./pages/forms/AddVisitorVisitor";
import ViewVisitorsVisitor from "./pages/views/ViewVisitorsVisitor";
import AddMaintenanceRequestAdmin from "./pages/forms/AddMaintenanceRequestAdmin";
import AddComplaintAdmin from "./pages/forms/AddComplaintAdmin";
import ViewUserManagementSA from "./pages/views/ViewUserManagementSA";
import ViewUserManagementAdmin from "./pages/views/ViewUserManagementAdmin";
import ViewRealEstatesSA from "./pages/views/ViewRealEstatesSA";
import ViewRealEstatesAdmin from "./pages/views/ViewRealEstatesAdmin";
import ViewAccessRealEstateSA from "./pages/views/ViewAccessRealEstateSA";

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
        <Route path="/add-visitor-sales" element={<AddVisitorSales />} />
        <Route path="/add-maintenance" element={<AddMaintenace />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/view-apartments" element={<ViewApartments />} />
        <Route path="/view-buildings" element={<ViewBuildings />} />
        <Route path="/view-tenants" element={<ViewTenants />} />
        <Route path="/view-visitors" element={<ViewVisitors />} />
        <Route path="/view-sales" element={<ViewSales />} />
        <Route path="/view-maintenance" element={<ViewMaintenance />} />
        <Route path="/view-maintenance-requests" element={<ViewMaintenanceRequests />} />
        <Route path="/view-complaints-admin" element={<ViewComplaintsAdmin />} />
        <Route path="/view-admins" element={<ViewAdmins />} />
        <Route path="/view-visitors-sales" element={<ViewVisitorsSales />} />
        <Route path="/view-maintenance-requests-tenant" element={<ViewMaintenanceRequestsTenant />} />
        <Route path="/view-complaints-tenant" element={<ViewComplaintsTenant />} />
        <Route path="/add-complaint" element={<AddComplaint />} />
        <Route path="/add-maintenance-request" element={<AddMaintenanceRequest />} />
        <Route path="/visitor-dashboard" element={<VisitorDashboard />} />
        <Route path="/add-visitor-visitor" element={<AddVisitorVisitor />} />
        <Route path="/view-visitors-visitor" element={<ViewVisitorsVisitor />} />
        <Route path="/view-requests" element={<ViewMaintenanceRequestsMaintenance />} />
        <Route path="/add-maintenance-request-admin" element={<AddMaintenanceRequestAdmin />} />
        <Route path="/add-complaint-admin" element={<AddComplaintAdmin />} />
        <Route path="/view-user-management-sa" element={<ViewUserManagementSA />} />
        <Route path="/view-user-management-admin" element={<ViewUserManagementAdmin />} />
        <Route path="/view-real-estates-sa" element={<ViewRealEstatesSA />} />
        <Route path="/view-real-estates-admin" element={<ViewRealEstatesAdmin />} />
        <Route path="/view-access-real-estates-sa" element={<ViewAccessRealEstateSA />} />
      </Routes>
  );
}

export default App;
