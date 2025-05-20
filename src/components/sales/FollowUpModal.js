import React, { useState } from "react";
import {
  Modal, Button, Row, Col, Typography, Select, Table
} from "antd";
import {
  EditOutlined,
  CheckOutlined,
  PlusOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const FollowUpModal = ({ visible, onClose, data, pastFollowUps = [] }) => {
  const [editingStatus, setEditingStatus] = useState(false);
  const [conversationStatus, setConversationStatus] = useState(data?.conversation_status);
  const [dealResult, setDealResult] = useState(data?.deal_result);

  const handleSave = () => {
    // TODO: Call API to save status updates
    setEditingStatus(false);
  };

  const pastFollowUpsColumns = [
    { title: "Conv. Status", dataIndex: "status" },
    { title: "Deal Result", dataIndex: "result" },
    { title: "Follow Up Date", dataIndex: "date" },
    { title: "Follow-up Time", dataIndex: "time" },
    { title: "Comments", dataIndex: "comments", ellipsis: true }
  ];

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      style={{
        top: 30, // Push modal to top of the screen
        padding: 0, // Optional: remove default padding around the modal
      }}
      bodyStyle={{
        maxHeight: '90vh',     // Limits height
        overflowY: 'auto',     // Enables vertical scrollbar when needed
        paddingRight: '16px',  // Prevents content from being cut off by scrollbar
      }}
      title={<Title level={4}>View Follow-Up</Title>}
    >
     <Row justify="space-between" align="middle">
      <Title level={5}>Follow Up Info</Title>
      <Button type="primary" icon={<CheckOutlined />} danger>
        Mark as completed
      </Button>
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
            <Text><b>Email Address:</b> {data?.visitor?.email}</Text>
        </Col>
        <Col span={12}>
            <Text><b>Phone Number:</b> {data?.phone_no}</Text>
        </Col>
        <Col span={12}>
            <Text><b>Nationality:</b> {data?.visitor?.nationality}</Text>
        </Col>
        <Col span={12}>
            <Text><b>Building Name:</b> {data?.building?.name}</Text>
        </Col>
        <Col span={12}>
            <Text><b>Flat Number:</b> {data?.apartment?.flat_number}</Text>
        </Col>
        <Col span={24}>
            <Text><b>Flat Type:</b> {data?.apartment_type}</Text>
        </Col>
        </Row>
      <hr style={{margin: "10px"}}/>
      <Row justify="space-between" align="middle">
      <Col span={12}><Title level={5}>Status</Title></Col>
      <Button icon={<EditOutlined />} type="primary" onClick={() => setEditingStatus(true)}>Edit Status</Button>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Text><b>Conversation Status:</b></Text><br />
          <Select
            value={conversationStatus}
            onChange={setConversationStatus}
            disabled={!editingStatus}
            style={{ width: "100%" }}
          >
            <Option value="Negotiating">Negotiating</Option>
            <Option value="Interested">Interested</Option>
            <Option value="Not Interested">Not Interested</Option>
          </Select>
        </Col>
        <Col span={12}>
          <Text><b>Deal Result:</b></Text><br />
          <Select
            value={dealResult}
            onChange={setDealResult}
            disabled={!editingStatus}
            style={{ width: "100%" }}
          >
            <Option value="In Progress">In Progress</Option>
            <Option value="Successful">Successful</Option>
            <Option value="Failed">Failed</Option>
          </Select>
        </Col>
      </Row>

      <Row justify="space-between" style={{ marginTop: 16 }}>
        <Col>
          <Button onClick={handleSave} type="primary" disabled={!editingStatus}>Save</Button>
        </Col>
      </Row>
      <hr style={{margin: "10px"}}/>
      <div style={{ marginTop: 32 }}>
        <Title level={5}>Past Follow-ups</Title>
        <Table
            columns={pastFollowUpsColumns}
            dataSource={pastFollowUps}
            rowKey={(record, index) => index}
            pagination={{ pageSize: 3 }}
            />
        <Button type="primary" icon={<PlusOutlined />} style={{ marginTop: 16 }}>
          Create a follow-up
        </Button>
      </div>
    </Modal>
  );
};

export default FollowUpModal;
