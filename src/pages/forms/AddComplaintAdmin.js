import React from "react";
import { Layout, Input, Button, Row, Col, Form } from "antd";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;

const AddComplaint = () => {
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
      <Sidebar username="Admin" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Add Complaint" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Building"
                  name="building"
                  rules={[{ required: true, message: "Please enter the building name" }]}
                >
                  <Input placeholder="Building" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Flat No"
                  name="flatNo"
                  rules={[{ required: true, message: "Please enter the flat number" }]}
                >
                  <Input placeholder="Flat No" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Complaint Details" name="request">
                  <Input.TextArea placeholder="Complaint Details" autoSize={{ minRows: 4, maxRows: 15 }} />
                </Form.Item>
              </Col>
            </Row>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="default" onClick={onClear} style={{ marginRight: '8px' }}>
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

export default AddComplaint;
