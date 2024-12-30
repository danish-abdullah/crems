import React, { useState } from "react";
import { Layout, Typography, Input, Table, Tooltip, Tag, message, Button } from "antd";
import { CheckCircleOutlined, ToolOutlined, FileOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/MaintenanceSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const ViewMaintenanceRequests = () => {
  const [data, setData] = useState([
    {
      key: "1",
      Id: "C001",
      buildingName: "Sunset Apartments",
      flatNo: "A-101",
      description: "Water leakage in the bathroom.",
      status: "Pending",
      attachment: "https://example.com/files/water-leakage-photo.jpg", // File URL
    },
    {
      key: "2",
      Id: "C002",
      buildingName: "Emerald Heights",
      flatNo: "B-202",
      description: "Elevator not working.",
      status: "Resolved",
      attachment: null, // No file attachment
    },
  ]);

  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.Id.toLowerCase().includes(searchText.toLowerCase()) ||
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
    message.success("Request marked as resolved.");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "Id",
      key: "Id",
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
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Attachment",
      key: "attachment",
      render: (_, record) =>
        record.attachment ? (
          <a href={record.attachment} target="_blank" rel="noopener noreferrer">
            <Tooltip title="View Attachment">
              <Button
                type="link"
                icon={<FileOutlined />}
                style={{ color: "#4b244a" }}
              >
                View File
              </Button>
            </Tooltip>
          </a>
        ) : (
          <span>No Attachment</span>
        ),
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
                color: record.status === "Pending" ? "green" : "gray",
                cursor: record.status === "Pending" ? "pointer" : "not-allowed",
              }}
              onClick={() =>
                record.status === "Pending" && handleMarkResolved(record.key)
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar username="4Walls Works" />

      <Layout>
        <TitleHeader title="View Maintenance Requests" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Title level={5} style={{ color: "#4b244a" }}>
            Requests List
          </Title>
          <Search
            placeholder="Search by ID, building, flat, or status"
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

export default ViewMaintenanceRequests;
