import React from "react";
import { Layout, Typography, Input, Button, Row, Col, Form, Radio, Checkbox, InputNumber } from "antd";
import "../../App.css";
import Sidebar from "../../components/SuperAdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;

const AddAdmin = () => {
  const [form] = Form.useForm();

  const onClear = () => {
    form.resetFields();
  };
  
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
          <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
            {/* Add User Details */}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Owner Name"
                  name="owner"
                  rules={[{ required: true, message: "Please enter the owner's name" }]}
                >
                  <Input placeholder="Owner Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Agency Name"
                  name="agency"
                  rules={[{ required: true, message: "Please enter the agency name" }]}
                >
                  <Input placeholder="Agency Name" />
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
                  label="Mobile No"
                  name="mobileNo"
                  rules={[{ required: true, message: "Please enter the mobile number" }]}
                >
                  <Input placeholder="Mobile No" />
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
                  label="No. of Properties"
                  name="properties"
                  rules={[{ required: true, message: "Please enter the no. of maximum properties" },
                    {
                      type: "number",
                      min: 1,
                      message: "Floors must be at least 1",
                    }
                  ]}
                >
                  <InputNumber
                    min={1}
                    placeholder="No. of Properties"
                    style={{ width: "100%" }}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
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
            {/* <Title level={5} style={{ marginTop: "20px", color: "#4b244a" }}>
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
            </Row> */}

            {/* Action Buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button type="default" onClick={onClear} style={{ marginRight: '10px' }}>
              Clear
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
