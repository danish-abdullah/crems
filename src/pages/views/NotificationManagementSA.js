import React, { useState } from "react";
import { Layout, Select, Form, Radio, DatePicker, TimePicker, Button, Input, Card, Col, Row } from "antd";
import SuperAdminSidebar from "../../components/SuperAdminSidebar";
import TitleHeader from "../../components/TitleHeader";

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const NotificationManagement = () => {
  const [form] = Form.useForm();
  const [scheduleType, setScheduleType] = useState("immediate");

  const handleScheduleChange = (e) => {
    setScheduleType(e.target.value);
  };

  const onFinish = (values) => {
    const payload = {
      notificationType: values.notificationType,
      recipient: values.recipient,
      message: values.message,
      schedule: values.schedule,
      dateTime:
        values.schedule === "later"
          ? `${values.date.format("YYYY-MM-DD")} ${values.time.format("HH:mm")}`
          : "immediate",
    };

    console.log("Notification Sent:", payload);
    // Here, you would usually send this payload to the backend API.
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SuperAdminSidebar selectedTab="viewNotificationManagement" />
      <Layout>
        <TitleHeader title="Notification Management" />
        <Content className="p-6">
          <Card bordered={false} style={{ maxWidth: 800, margin: "auto" }}>
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              initialValues={{ schedule: "immediate" }}
            >
              <Form.Item
                label="Notification Type"
                name="notificationType"
                rules={[{ required: true, message: "Please select notification type" }]}
              >
                <Select placeholder="Select Notification Type">
                  <Option value="announcement">Announcement</Option>
                  <Option value="reminder">Reminder</Option>
                  <Option value="emergency">Emergency</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Recipient"
                name="recipient"
                rules={[{ required: true, message: "Please select recipient" }]}
              >
                <Select placeholder="Select Recipient">
                  <Option value="all">All</Option>
                  <Option value="tenants">Tenants</Option>
                  <Option value="admins">Admins</Option>
                  <Option value="sales">Sales</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: "Please enter a message" }]}
              >
                <TextArea rows={4} placeholder="Enter your notification message here" />
              </Form.Item>

              <Form.Item label="Schedule" name="schedule">
                <Radio.Group onChange={handleScheduleChange}>
                  <Radio value="immediate">Send Immediately</Radio>
                  <Radio value="later">Schedule for Later</Radio>
                </Radio.Group>
              </Form.Item>

              {scheduleType === "later" && (
                <>
                <Row gutter={16}>
                 <Col span={12}>
                  <Form.Item
                    label="Date"
                    name="date"
                    rules={[{ required: true, message: "Please select date" }]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                  </Col>
                  <Col span={12}>
                  <Form.Item
                    label="Time"
                    name="time"
                    rules={[{ required: true, message: "Please select time" }]}
                  >
                    <TimePicker use12Hours format="h:mm A" style={{ width: "100%" }} />
                  </Form.Item>
                  </Col>
                  </Row>
                </>
              )}

              <Form.Item style={{ textAlign: "center" }}>
                <Button type="primary" htmlType="submit" style={{ width: "100px" }}>
                  Send
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default NotificationManagement;
