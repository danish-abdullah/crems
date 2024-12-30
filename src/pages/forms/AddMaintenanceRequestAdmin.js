import React from "react";
import { Layout, Input, Button, Row, Col, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;

const AddMaintenanceRequest = () => {
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

  const beforeUpload = (file) => {
    const isAcceptedType =
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "application/pdf";
    if (!isAcceptedType) {
      message.error(`${file.name} is not a valid file type.`);
    }
    return isAcceptedType || Upload.LIST_IGNORE;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Admin" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Add Maintenance Request" />
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
                <Form.Item label="Request Details" name="request" rules={[{ required: true, message: 'Please enter the request details' }]}>
                  <Input.TextArea placeholder="Request Details" autoSize={{ minRows: 4, maxRows: 15 }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Attachment"
                  name="attachment"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                  rules={[{ required: false }]}
                >
                  <Upload
                    beforeUpload={beforeUpload}
                    maxCount={1}
                    accept=".png,.jpeg,.jpg,.pdf"
                    listType="text"
                  >
                    <Button icon={<UploadOutlined />}>Upload File (PDF/Images)</Button>
                  </Upload>
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

export default AddMaintenanceRequest;
