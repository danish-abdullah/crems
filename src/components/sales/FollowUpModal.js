import React, { useState, useEffect } from "react";
import {
  Modal, Button, Row, Col, Typography, Select, Table,Form, message, Input, DatePicker, TimePicker
} from "antd";
import {
  EditOutlined,
  CheckOutlined,
  PlusOutlined,
  MinusOutlined
} from "@ant-design/icons";
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const FollowUpModal = ({ visible, onClose, data, pastFollowUps = [], refresh }) => {
const [buildings, setBuildings] = useState([]);
const [apartments, setApartments] = useState([]);
  const [form] = Form.useForm();
  const [showFollowUpForm, setShowFollowUpForm] = useState(false);

useEffect(() => {
    fetchBuildings();
    fetchApartments();
  }, []);

const handleSubmit = async (values) => {
    try {
      const payload = {
        visitor_id: data?.visitor_id,
        follow_up_date: dayjs(values.follow_up_date).format("YYYY-MM-DD"),
        follow_up_time: dayjs(values.follow_up_time).format("HH:mm:ss"),
        conversation_status: values.conversation_status,
        deal_result: values.deal_result,
        comments: values.comments || ""
      };

      const res = await fetch(`https://website-64a18929.yeo.vug.mybluehost.me/api/admin/follow-ups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(payload),
      });
  
      const result = await res.json();
      if (result.success) {
        message.success("Followup submitted successfully");
        refresh();
        setShowFollowUpForm(false);
      } else {
        message.error(result.message || "Failed to submit followup");
      }
    } catch (err) {
      console.error(err);
      message.error("Error submitting followup");
    }
  };

  const fetchBuildings = async () => {
    const res = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/buildings",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const data = await res.json();
    setBuildings(data?.data || []);
  };

  const fetchApartments = async () => {
    const res = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/apartments",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const data = await res.json();
    setApartments(data?.data || []);
  };

  const handleSave = async (values) => {
    try {
      const payload = {
        conversation_status: values.conversation_status,
        deal_result: values.deal_result,
        _method: "PATCH"
      };

      const res = await fetch(`https://website-64a18929.yeo.vug.mybluehost.me/api/admin/follow-ups${`/${data.key}`}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(payload),
      });
  
      const result = await res.json();
      if (result.success) {
        message.success("Followup updated successfully");
        refresh();
      } else {
        message.error(result.message || "Failed to update followup");
      }
    } catch (err) {
      console.error(err);
      message.error("Error updating followup");
    }
  };

  const pastFollowUpsColumns = [
    { title: "Conv. Status", dataIndex: "status" },
    { title: "Deal Result", dataIndex: "result" },
    { title: "Follow Up Date", dataIndex: "date" },
    { title: "Follow-up Time", dataIndex: "time" },
    { title: "Comments", dataIndex: "comments", ellipsis: true }
  ];

  const onCloseModal = () =>
  {
    form.resetFields();
    onClose();
    setShowFollowUpForm(false);
  }

  useEffect(() => {
    if (visible && data) {
      form.setFieldsValue({
        conversation_status: data?.status || undefined,
        deal_result: data?.result || undefined
      });
    }
  }, [visible, data, form]);

  return (
    <Modal
      open={visible}
      onCancel={onCloseModal}
      footer={null}
      width={1000}
      style={{
        top: 30, // Push modal to top of the screen
        padding: 0, // Optional: remove default padding around the modal
      }}
      bodyStyle={{
        maxHeight: '80vh',     // Limits height
        overflowY: 'auto',     // Enables vertical scrollbar when needed
        paddingRight: '16px',  // Prevents content from being cut off by scrollbar
      }}
      title={<Title level={4}>View Follow-Up</Title>}
    >
     <Row justify="space-between" align="middle">
      <Title level={5}>Follow Up Info</Title>
      </Row>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Text><b>Follow-up Date:</b> {data?.date}</Text><br />
        </Col>
        <Col span={12}>
          <Text><b>Follow-up Time:</b> {data?.time}</Text><br />
        </Col>
        <Col>
          <Text><b>Comments:</b><br />{data?.comments}</Text>
        </Col>
      </Row>
      <hr style={{margin: "10px"}}/>
      <Title level={5}>Visitor Details</Title>
        <Row gutter={[16, 8]}>
        <Col span={12}>
            <Text><b>Full Name:</b> {data?.full_name}</Text>
        </Col>
        <Col span={12}>
            <Text><b>Email Address:</b> {data?.email}</Text>
        </Col>
        <Col span={12}>
            <Text><b>Phone Number:</b> {data?.phone_no}</Text>
        </Col>
        <Col span={12}>
            <Text><b>Nationality:</b> {data?.nationality}</Text>
        </Col>
        <Col span={12}>
            <Text><b>Building Name:</b> {buildings.find((b) => b.id === data?.building_id)?.building_name || "N/A"}</Text>
        </Col>
        <Col span={12}>
            <Text><b>Flat Number:</b> {apartments.find((a) => a.id === data?.apartment_id)?.area || "N/A"}</Text>
        </Col>
        </Row>
      <hr style={{margin: "10px"}}/>
      <Row justify="space-between" align="middle">
      <Col span={12}><Title level={5}>Status</Title></Col>
      </Row>
      <Form form={form} layout="vertical" style={{ textAlign: "left" }} onFinish={handleSave}>
          {/* Deal Status & Result */}
          <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
          <Form.Item name="conversation_status" label="Conversation Status" rules={[{ required: true }]}>
              <Select
                style={{ width: "100%" }}
              >
                <Option value="Negotiating">Negotiating</Option>
                <Option value="Denied">Denied</Option>
                <Option value="Accepted">Accepted</Option>
                <Option value="On Hold">On Hold</Option>
              </Select>
              </Form.Item>
              </div>
            <div style={{ flex: 1 }}>
            <Form.Item name="deal_result" label="Deal Result" rules={[{ required: true }]}>
              <Select style={{ width: "100%" }}>
                <Option value="In Progress">In Progress</Option>
                <Option value="Postponed">Postponed</Option>
                <Option value="Cancelled">Cancelled</Option>
                <Option value="Successful">Successful</Option>
              </Select>
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button htmlType="submit" type="primary">Save</Button>
          </Form.Item>
        </Form>

      <hr style={{margin: "10px"}}/>

      <div style={{ marginTop: 32 }}>
      <Row justify="space-between" align="middle">
        <Col span={12}>
          <Title level={5}>{showFollowUpForm ? "Create Follow-up" : "Past Follow-ups"}</Title>
        </Col>
        <Button
          type="primary"
          icon={showFollowUpForm ? <MinusOutlined /> : <PlusOutlined />}
          onClick={() => setShowFollowUpForm(!showFollowUpForm)}
        >
          {showFollowUpForm ? "Close form" : "Create a follow-up"}
        </Button>
      </Row>

      {showFollowUpForm && (
        <>
        <Form
          layout="vertical"
          style={{ textAlign: "center", marginTop: "24px" }}
          onFinish={handleSubmit}
          initialValues={{
            follow_up_time: dayjs(),
            follow_up_date: dayjs(),
          }}
        >
          {/* Deal Status & Result */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <Form.Item
                name="conversation_status"
                label="Conversation Status"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select status">
                  <Option value="Negotiating">Negotiating</Option>
                  <Option value="Denied">Denied</Option>
                  <Option value="Accepted">Accepted</Option>
                  <Option value="On Hold">On Hold</Option>
                </Select>
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item
                name="deal_result"
                label="Deal Result"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select deal result">
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Postponed">Postponed</Option>
                  <Option value="Cancelled">Cancelled</Option>
                  <Option value="Successful">Successful</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          {/* Date and Time */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <Form.Item
                name="follow_up_date"
                label="Follow Up Date"
                rules={[{ required: true }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="w-1/2">
              <Form.Item
                name="follow_up_time"
                label="Follow Up Time"
                rules={[{ required: true }]}
              >
                <TimePicker style={{ width: "100%" }} />
              </Form.Item>
            </div>
          </div>

          {/* Comments */}
          <Form.Item name="comments" label="Comments">
            <Input.TextArea placeholder="Add any comments..." rows={3} />
          </Form.Item>

          <Button type="primary" htmlType="submit" style={{ width: "150px" }}>
            Submit
          </Button>
        </Form>
        <hr style={{margin: "10px"}}></hr>
        <Col span={12}>
          <Title level={5}>Past Follow-ups</Title>
        </Col>
        </>
      )}

        <Table
            columns={pastFollowUpsColumns}
            dataSource={pastFollowUps}
            rowKey={(record, index) => index}
            pagination={{ pageSize: 3 }}
            />
      </div>
    </Modal>
  );
};

export default FollowUpModal;
