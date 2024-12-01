import React from "react";
import { Layout, Menu, Table, Typography, Input, Button, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  TeamOutlined,
  PlusOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./SuperAdminDashboard.css";
import "../App.css";
import Logo from "../assets/logo.png";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { SubMenu } = Menu;

const AdminDashboard = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Sample data for visitors table
  const dataSource = [
    {
      key: "1",
      building: "Al jeddah",
      person: "Visitor",
      date: "2023-03-12",
      name: "Umer",
      mobile: "55 765 7028",
      email: "umer30@gmail.com",
    },
    // Add more rows as needed
  ];

  const columns = [
    {
      title: "Building",
      dataIndex: "building",
      key: "building",
    },
    {
      title: "Person",
      dataIndex: "person",
      key: "person",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mobile No",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Update",
      key: "update",
      render: () => (
        <div>
          <Button
            icon={<EditOutlined />}
            type="link"
            style={{ color: "#7b3e82" }}
          />
          <Button icon={<DeleteOutlined />} type="link" danger />
        </div>
      ),
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "addTenant") {
      navigate("/add-tenant"); // Navigate to Add Tenant page
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        theme="dark"
        style={{
          backgroundColor: "#420B31",
          color: "white",
        }}
      >
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className="avatar-container">
          <Avatar size={64} style={{ backgroundColor: "#fff" }} />
          <div style={{ color: "white", margin: "10px" }}>
            <span>Username</span>
            <br />
            <small>Admin</small>
          </div>
        </div>
        <div className="menu-container">
          <Menu
            theme="dark"
            mode="inline"
            style={{ backgroundColor: "#420B31", flexGrow: 1 }}
            onClick={handleMenuClick} // Attach click handler
          >
            <Menu.Item key="visitor" icon={<UserOutlined />}>
              Visitor
            </Menu.Item>
            <SubMenu key="tenant" icon={<TeamOutlined />} title="Tenant">
              <Menu.Item key="addTenant" icon={<PlusOutlined />}>
                Add Tenant
              </Menu.Item>
              <Menu.Item key="listTenants" icon={<FileTextOutlined />}>
                List Tenants
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="building" icon={<HomeOutlined />}>
              Building
            </Menu.Item>
            <Menu.Item key="apartment" icon={<ApartmentOutlined />}>
              Apartment
            </Menu.Item>
          </Menu>
        </div>
      </Sider>

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
            View Visitors
          </Title>
          <Button
            type="link"
            icon={<LogoutOutlined />}
            style={{ color: "#4b244a" }}
          >
            Logout
          </Button>
        </Header>
        <Content
          style={{ margin: "20px", padding: "20px", background: "white" }}
        >
          <Search
            placeholder="Search"
            allowClear
            style={{
              width: 300,
              marginBottom: "20px",
              borderColor: "#4b244a",
            }}
          />
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 5 }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;