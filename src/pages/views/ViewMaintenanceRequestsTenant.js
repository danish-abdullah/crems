import React, { useState } from "react";
import { Layout, Typography, Input, Table, Tag, Button, Tooltip } from "antd";
import { FileOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/TenantSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const ViewMaintenanceRequests = () => {
  const [data] = useState([
    {
      key: "1",
      Id: "C001",
      description: "Water leakage in the bathroom.",
      status: "Pending",
      attachment: "https://example.com/files/water-leakage-photo.jpg", // Example file URL
    },
    {
      key: "2",
      Id: "C002",
      description: "Elevator not working.",
      status: "Sent to Maintenance",
      attachment: null, // No file attachment
    },
  ]);

  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.Id.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      item.status.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "Id",
      key: "Id",
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
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar username="Tenant1" />

      <Layout>
        <TitleHeader title="View Maintenance Requests" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Title level={5} style={{ color: "#4b244a" }}>
            Requests List
          </Title>
          <Search
            placeholder="Search by ID or status"
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
