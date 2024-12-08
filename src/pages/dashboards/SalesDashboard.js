import React from "react";
import { Layout } from "antd";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const SalesDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        username="Salesman1"
        role="Sales"
      />

      {/* Main Content */}
      <Layout>
      <TitleHeader title="Sales Dashboard"/>
      </Layout>
    </Layout>
  );
};

export default SalesDashboard