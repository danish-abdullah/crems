import React from "react";
import { Layout, Menu, Table, Typography, Input, Button, Avatar, Row, Col, Form } from "antd";
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
import "./AddTenant.css";
import "../App.css";
import Logo from "../assets/logo.png";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { SubMenu } = Menu;

const AddTenant = () => {
  const navigate = useNavigate(); // Initialize navigate
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form failed:", errorInfo);
  };

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
            Add Tenant
          </Title>
          <Button
            type="link"
            icon={<LogoutOutlined />}
            style={{ color: "#4b244a" }}
          >
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Title level={5} style={{ color: "#4b244a" }}>
            Add Tenant Details
          </Title>
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Full Name"
                  name="fullName"
                  rules={[{ required: true, message: "Please enter the full name" }]}
                >
                  <Input placeholder="Full Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Building Name"
                  name="buildingName"
                  rules={[{ required: true, message: "Please enter the building name" }]}
                >
                  <Input placeholder="Building Name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ type: "email", required: true, message: "Please enter a valid email" }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mobile no"
                  name="mobileNo"
                  rules={[{ required: true, message: "Please enter the mobile number" }]}
                >
                  <Input placeholder="Mobile no" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Flat No"
                  name="flatNo"
                  rules={[{ required: true, message: "Please enter the flat number" }]}
                >
                  <Input placeholder="Flat No" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Office no"
                  name="officeNo"
                  rules={[{ required: true, message: "Please enter the office number" }]}
                >
                  <Input placeholder="Office no" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Nationality"
                  name="nationality"
                  rules={[{ required: true, message: "Please enter the nationality" }]}
                >
                  <Input placeholder="Nationality" />
                </Form.Item>
              </Col>
            </Row>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="default" style={{ marginRight: "10px" }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: "#4b244a", borderColor: "#4b244a" }}>
                Save
              </Button>
            </div>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AddTenant;
