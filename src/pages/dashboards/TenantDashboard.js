import React from "react";
import { Layout } from "antd";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const TenantDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        username="Admin"
        role="Admin"
      />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Tenant Dashboard" />
      </Layout>
    </Layout>
  );
};

export default TenantDashboard;