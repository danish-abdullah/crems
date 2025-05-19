import React, { useState } from "react";
import { Layout, Table, Input, Button, Space, Tooltip, message, } from "antd";
import "../../../App.css";
import Sidebar from "../../../components/SalesSidebar.js";
import TitleHeader from "../../../components/TitleHeader.js";
import SearchBar from "../../../components/SearchBar.js";
import {
  SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined,
  UploadOutlined, DeleteOutlined,
  FundViewOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { Modal, Switch, Select, Form, DatePicker, TimePicker } from "antd";

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const ViewVisitors = () => {
  // Sample data for visitors table
  const [visitors, setVisitors] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [followUpEnabled, setFollowUpEnabled] = useState(false);
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      building: "Al Jeddah",
      person: "Visitor",
      date: "2023-03-12",
      name: "Umer",
      mobile: "55 765 7028",
      email: "umer30@gmail.com",
      flat: "102",
      status: "Pending",
      followUpDate: null,
    },
    {
      key: "2",
      building: "Al Noor",
      person: "Visitor",
      date: "2023-03-14",
      name: "Ahmed",
      mobile: "55 123 4567",
      email: "ahmed10@gmail.com",
      flat: "202",
      status: "Pending",
      followUpDate: null,
    },
  ]);

  // Function to get today's date in "YYYY-MM-DD" format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handler to mark as Followed Up
  const handleFollowUp = (key) => {
    const updatedData = dataSource.map((item) =>
      item.key === key
        ? { ...item, status: "Followed Up", followUpDate: getCurrentDate() }
        : item
    );
    setDataSource(updatedData);
    message.success("Marked as Followed Up!");
  };

  // Handler to send to admin for tenant onboarding
  const handleSendToAdmin = (key) => {
    const updatedData = dataSource.map((item) =>
      item.key === key ? { ...item, status: "Sent to Admin" } : item
    );
    setDataSource(updatedData);
    message.success("Sent to Admin for Tenant Onboarding!");
  };

  const columns = [
    {
      title: "Submission Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Building",
      dataIndex: "building_id",
      key: "building_id",
    },
    {
      title: "Flat No.",
      dataIndex: "apartment_id",
      key: "apartment_id",
    },
    {
      title: "Flat Type",
      dataIndex: "apartment_type",
      key: "apartment_type",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Mobile No",
      dataIndex: "phone_no",
      key: "phone_no",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedVisitor(record);
            setViewModalVisible(true);
          }}
        />
      ),
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Salesman1" selectedTab="viewVisitors" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="View Visitors" />
        <Content
          style={{ margin: "20px", padding: "20px", background: "white" }}
        >
          <SearchBar
              data={dataSource}
              fieldsToSearch={["full_name", "building_id", "email"]}
              onFilteredData={setFilteredData}
            />
          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={{ pageSize: 5 }}
          />
          <Modal
            open={viewModalVisible}
            title="View Visitor"
            footer={null}
            onCancel={() => setViewModalVisible(false)}
            width={800}
          >
            {selectedVisitor && (
              <>
                {/* Deal Status & Result */}
                <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                  <div style={{ flex: 1 }}>
                    <label>Conversation Status:</label>
                    <Select
                      style={{ width: "100%" }}
                      defaultValue="Negotiating"
                      disabled
                    >
                      <Option value="Negotiating">Negotiating</Option>
                      <Option value="Closed">Closed</Option>
                      <Option value="Rejected">Rejected</Option>
                    </Select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>Deal Result:</label>
                    <Select style={{ width: "100%" }} defaultValue="In progress" disabled>
                      <Option value="In progress">In progress</Option>
                      <Option value="Done">Done</Option>
                    </Select>
                  </div>
                </div>

                {/* Visitor Details */}
                <div
                  style={{
                    background: "#f5f5f5",
                    padding: "20px",
                    marginBottom: "20px",
                    borderRadius: "8px",
                  }}
                >
                  <h3>Visitor Details</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    <div style={{ flex: "1 1 45%" }}>
                      <strong>Full Name:</strong>
                      <p>{selectedVisitor.full_name}</p>
                    </div>
                    <div style={{ flex: "1 1 45%" }}>
                      <strong>Email Address:</strong>
                      <p>{selectedVisitor.email}</p>
                    </div>
                    <div style={{ flex: "1 1 45%" }}>
                      <strong>Phone Number:</strong>
                      <p>{selectedVisitor.phone_no}</p>
                    </div>
                    <div style={{ flex: "1 1 45%" }}>
                      <strong>Nationality:</strong>
                      <p>{selectedVisitor.nationality || "N/A"}</p>
                    </div>
                    <div style={{ flex: "1 1 45%" }}>
                      <strong>Building Name:</strong>
                      <p>{selectedVisitor.building_id}</p>
                    </div>
                    <div style={{ flex: "1 1 45%" }}>
                      <strong>Flat Number:</strong>
                      <p>{selectedVisitor.apartment_id}</p>
                    </div>
                    <div style={{ flex: "1 1 45%" }}>
                      <strong>Flat Type:</strong>
                      <p>{selectedVisitor.apartment_type}</p>
                    </div>
                  </div>
                </div>

                {/* Follow Up Section */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <h3>Follow Up</h3>
                    <Switch
                      checked={followUpEnabled}
                      onChange={(checked) => setFollowUpEnabled(checked)}
                    />
                  </div>

                  {followUpEnabled && (
                    <Form layout="vertical">
                      <div className="flex gap-4">
                      <div className="w-1/2">
                      <Form.Item label="Date">
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>
                      </div>
                      <div className="w-1/2">
                      <Form.Item label="Time">
                        <TimePicker style={{ width: "100%" }} defaultValue={null} />
                      </Form.Item>
                      </div>
                      </div>
                      <Form.Item label="Comments">
                        <Input.TextArea
                          rows={4}
                          placeholder="Enter comments..."
                        />
                      </Form.Item>
                      <Button type="primary">+ Create a follow-up</Button>
                    </Form>
                  )}
                </div>
              </>
            )}
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewVisitors;
