import React, { useState } from "react";
import { Layout, Typography, Input, Table, Tooltip, Tag, message } from "antd";
import { CheckCircleOutlined, ToolOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const ViewComplaints = () => {
  const [data, setData] = useState([
    {
      key: "1",
      complaintId: "C001",
      complainerName: "John Doe",
      buildingName: "Sunset Apartments",
      flatNo: "A-101",
      description: "Water leakage in the bathroom.",
      status: "Pending",
    },
    {
      key: "2",
      complaintId: "C002",
      complainerName: "Jane Smith",
      buildingName: "Emerald Heights",
      flatNo: "B-202",
      description: "Elevator not working.",
      status: "Sent to Maintenance",
    },
  ]);

  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.complaintId.toLowerCase().includes(searchText.toLowerCase()) ||
      item.complainerName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.buildingName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.flatNo.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      item.status.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleMarkResolved = (key) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, status: "Resolved" } : item
    );
    setData(updatedData);
    message.success("Complaint marked as resolved.");
  };

  const handleSendToMaintenance = (key) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, status: "Sent to Maintenance" } : item
    );
    setData(updatedData);
    message.info("Complaint sent to maintenance.");
  };

  const columns = [
    {
      title: "Complaint ID",
      dataIndex: "complaintId",
      key: "complaintId",
    },
    {
      title: "Complainer Name",
      dataIndex: "complainerName",
      key: "complainerName",
    },
    {
      title: "Building Name",
      dataIndex: "buildingName",
      key: "buildingName",
    },
    {
      title: "Flat No",
      dataIndex: "flatNo",
      key: "flatNo",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "volcano";
        if (status === "Resolved") color = "green";
        if (status === "Sent to Maintenance") color = "blue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Tooltip title="Mark as Resolved">
            <CheckCircleOutlined
              style={{
                fontSize: "20px",
                color: record.status === "Resolved" || record.status === "Sent to Maintenance" ? "gray" : "green",
                cursor: record.status === "Resolved" || record.status === "Sent to Maintenance" ? "not-allowed" : "pointer",
              }}
              onClick={() =>
                record.status === "Pending" && handleMarkResolved(record.key)
              }
            />
          </Tooltip>
          <Tooltip title="Send to Maintenance">
            <ToolOutlined
              style={{
                fontSize: "20px",
                color: record.status === "Resolved" || record.status === "Sent to Maintenance" ? "gray" : "#4b244a",
                cursor: record.status === "Resolved" || record.status === "Sent to Maintenance" ? "not-allowed" : "pointer",
              }}
              onClick={() =>
                record.status === "Pending" && handleSendToMaintenance(record.key)
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar username="Admin" />

      <Layout>
        <TitleHeader title="View Complaints" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Title level={5} style={{ color: "#4b244a" }}>
            Complaints List
          </Title>
          <Search
            placeholder="Search by ID, name, building, flat, or status"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ margin: "10px 0", width: "100%" }}
          />
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 5 }}
            style={{ marginTop: "20px" }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewComplaints;
