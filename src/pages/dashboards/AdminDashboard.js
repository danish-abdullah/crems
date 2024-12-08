import React from "react";
import { Layout } from "antd";
import "../../App.css";
import AdminSidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const AdminDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <AdminSidebar
        username="Admin"
        role="Admin"
      />

      {/* Main Content */}
      <Layout>
      <TitleHeader title="Admin Dashboard"/>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;