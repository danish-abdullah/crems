import React, { useEffect, useState } from "react";
import { Layout, Typography, Input, Button, Row, Col, Form, message, Select } from "antd";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AddTenant = () => {
  const [form] = Form.useForm();
  const [buildingList, setBuildingList] = useState([]); // State to hold building list

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Get session token
        const response = await fetch(
          "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/building", // Replace with actual endpoint for fetching buildings
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setBuildingList(data.data); // Set building data in state
        } else {
          message.error("Failed to fetch building list");
        }
      } catch (error) {
        message.error("Error fetching building list");
        console.error("Error:", error);
      }
    };

    fetchBuildings(); // Fetch building list on component mount
  }, []);

  const onClear = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    console.log("Form values:", values);

    const tenantData = {
      full_name: values.fullName,
      building_name: values.buildingName,
      email: values.email,
      mobile_no: values.mobileNo,
      flat_no: values.flatNo,
      nationality: values.nationality,
    };

    try {
      const token = localStorage.getItem("access_token"); // Get session token
      const response = await fetch(
        "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/tenant",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tenantData),
        }
      );

      const data = await response.json();
      if (data.success) {
        message.success("Tenant added successfully");
        form.resetFields(); // Reset the form fields on success
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Error occurred while adding tenant");
      console.error("Error:", error);
    }
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
        <TitleHeader title="Add Tenant" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Title level={5} style={{ color: "#4b244a" }}>
            Add Tenant Details
          </Title>
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
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
                  rules={[{ required: true, message: "Please select the building name" }]}
                >
                  <Select placeholder="Select Building">
                    {buildingList.map((building) => (
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
                  rules={[{ required: true, message: "Please enter the tenant's nationality" }]}
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
              <Button type="default" onClick={onClear} style={{ marginRight: "10px" }}>
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

export default AddTenant;
