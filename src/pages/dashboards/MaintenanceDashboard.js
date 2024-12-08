import React from "react";
import { Layout } from "antd";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const MaintenanceDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        username="Plumber"
        role="Maintenance"
      />

      {/* Main Content */}
      <Layout>
      <TitleHeader title="Maintenance Dashboard"/>
      </Layout>
    </Layout>
  );
};

export default MaintenanceDashboard;