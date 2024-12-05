import React from "react";
import { Layout, Table, Typography, Input, Button } from "antd";
import { LogoutOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../App.css";
import Sidebar from "../components/AdminSidebar.js";

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const AdminDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        username="Admin"
        role="Admin"
      />

      {/* Main Content */}
      <Layout>
        <Header
          style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <Title level={4} style={{ color: "#4b244a", margin: 0 }}>
            Admin Dashboard
          </Title>
          <Button
            type="link"
            icon={<LogoutOutlined />}
            style={{ color: "#4b244a" }}
          >
            Logout
          </Button>
        </Header>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;