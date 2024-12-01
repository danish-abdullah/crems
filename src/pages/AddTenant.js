import React from "react";
import { Layout, Typography, Input, Button, Row, Col, Form } from "antd";
import {
  LogoutOutlined,
} from "@ant-design/icons";
import "./AddTenant.css";
import "../App.css";
import Logo from "../assets/logo.png";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AddTenant = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form failed:", errorInfo);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        theme="dark"
        style={{ backgroundColor: "#420B31", color: "white" }}
      >
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className="avatar-container">
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          ></div>
          <div style={{ color: "white", margin: "10px" }}>
            <span>Username</span>
            <br />
            <small>Admin</small>
          </div>
        </div>
        <div className="menu-container">
          <ul style={{ listStyleType: "none", padding: 0, color: "white" }}>
            <li>Visitor</li>
            <li>Tenant</li>
            <ul>
              <li>Add Tenant</li>
              <li>List Tenants</li>
            </ul>
            <li>Building</li>
            <li>Apartment</li>
          </ul>
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
