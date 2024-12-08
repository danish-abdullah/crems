import React from "react";
import { Layout } from "antd";
import "../../App.css";
import SuperAdminSidebar from "../../components/SuperAdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const SuperAdminDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <SuperAdminSidebar />

      {/* Main Content */}
      <Layout>
       <TitleHeader title="Super Admin Dashboard" />
      </Layout>
    </Layout>
  );
};

export default SuperAdminDashboard;
