import React from "react";
import { Layout, Typography, Input, Button, Row, Col, Form } from "antd";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;

const AddSales = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form failed:", errorInfo);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Admin" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Add Salesperson" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Title level={5} style={{ color: "#4b244a" }}>
            Add Salesperson Details
          </Title>
          <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Salesperson ID"
                  name="salespersonId"
                  rules={[{ required: true, message: "Please enter the salesperson ID" }]}
                >
                  <Input placeholder="Salesperson ID" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Salesperson Name"
                  name="salespersonName"
                  rules={[{ required: true, message: "Please enter the salesperson's name" }]}
                >
                  <Input placeholder="Salesperson Name" />
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
                  label="Contact No"
                  name="contactNo"
                  rules={[{ required: true, message: "Please enter the contact number" }]}
                >
                  <Input placeholder="Contact No" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Additional Notes" name="notes">
                  <Input.TextArea placeholder="Additional Notes" />
                </Form.Item>
              </Col>
            </Row>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
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

export default AddSales;
