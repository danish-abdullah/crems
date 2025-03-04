import React, { useEffect, useState } from "react";
import { Layout, Typography, Input, Button, Row, Col, Form, message, Select } from "antd";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AddVisitor = () => {
  const [form] = Form.useForm();
  const [buildings, setBuildings] = useState([]);

  // Fetch the building list
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/building",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const data = await response.json();
        if (data.success) {
          setBuildings(data.data); // Ensure consistency with AddTenant
        } else {
          message.error("Failed to fetch building list");
        }
      } catch (error) {
        console.error("Error fetching buildings:", error);
        message.error("Error loading building list");
      }
    };
  
    fetchBuildings();
  }, []);
  

  const onClear = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    const visitorData = {
      name: values.fullName,
      mobile_number: values.mobileNo,
      email: values.email,
      comment: values.comments,
      building_name: values.buildingName,
      flat_no: values.flatNo,
    };

    console.log("Form values:", visitorData);

    try {
      const response = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/visitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(visitorData),
      });

      const data = await response.json();

      if (data.success) {
        message.success("Visitor added successfully");
        form.resetFields();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Error adding visitor");
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form failed:", errorInfo);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar username="Admin" />
      <Layout>
        <TitleHeader title="Add Visitor" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Title level={5} style={{ color: "#4b244a" }}>
            Add Visitor Details
          </Title>
          <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
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
                  rules={[{ required: true, message: "Please select the building name" }]}
                >
                  <Select placeholder="Select Building">
                    {buildings.map((building) => (
                      <Option key={building.building_name} value={building.building_name}>
                        {building.name}
                      </Option>
                    ))}
                  </Select>
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
                  label="Nationality"
                  name="nationality"
                  rules={[{ required: true, message: "Please enter the nationality" }]}
                >
                  <Input placeholder="Nationality" />
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
              <Col span={24}>
                <Form.Item label="Comments" name="comments">
                  <Input.TextArea placeholder="Comments" />
                </Form.Item>
              </Col>
            </Row>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="default" onClick={onClear} style={{ marginRight: "8px" }}>
                Clear
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

export default AddVisitor;
