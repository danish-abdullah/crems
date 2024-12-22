import React from "react";
import { Layout, Typography, Input, Button, Row, Col, Form, Radio, Checkbox } from "antd";
import "../../App.css";
import Sidebar from "../../components/SuperAdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;

const AddAdmin = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form failed:", errorInfo);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        username="VLookin"
        role="SuperAdmin"
      />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Add Admin" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
        <Title level={5} style={{ color: "#4b244a" }}>
            Add Admin Details
          </Title>
          {/* Add Admin Form */}
          <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {/* Add User Details */}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: "Please enter the username" }]}
                >
                  <Input placeholder="Username" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mobile No"
                  name="mobileNo"
                  rules={[{ required: true, message: "Please enter the mobile number" }]}
                >
                  <Input placeholder="Mobile No" />
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
                  label="Category of Admin"
                  name="adminCategory"
                  rules={[{ required: true, message: "Please select a category" }]}
                >
                  <Radio.Group>
                    <Radio value="Management">Management</Radio>
                    <Radio value="Staff">Staff</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            {/* User Onboarding */}
            <Title level={5} style={{ marginTop: "20px", color: "#4b244a" }}>
              Admin Onboarding
            </Title>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="ID"
                  name="id"
                  rules={[{ required: true, message: "Please enter the ID" }]}
                >
                  <Input placeholder="ID" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please enter the password" }]}
                >
                  <Input.Password className="ant-input" placeholder="Password" />
                </Form.Item>
              </Col>
            </Row>

            {/* User Access */}
            <Title level={5} style={{ marginTop: "20px", color: "#4b244a" }}>
              Admin Access
            </Title>
            <Row>
              <Col span={12}>
                <Form.Item name="subUsers" valuePropName="checked">
                  <Checkbox>Create sub admins</Checkbox>
                </Form.Item>
                <Form.Item name="multipleBuildings" valuePropName="checked">
                  <Checkbox>Create multiple buildings</Checkbox>
                </Form.Item>
              </Col>
            </Row>

            {/* Action Buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <Button type="default" style={{ marginRight: "10px" }}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#4b244a", borderColor: "#4b244a" }}
              >
                Save
              </Button>
            </div>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AddAdmin;
