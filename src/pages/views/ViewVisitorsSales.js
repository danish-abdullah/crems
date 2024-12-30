import React, { useState } from "react";
import { Layout, Table, Input, Button, Space, Tooltip, message } from "antd";
import "../../App.css";
import Sidebar from "../../components/SalesSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Search } = Input;

const ViewVisitors = () => {
  // Sample data for visitors table
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Building",
      dataIndex: "building",
      key: "building",
    },
    {
      title: "Flat No.",
      dataIndex: "flat",
      key: "flat",
    },
    {
      title: "Mobile No",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Follow-Up Date",
      dataIndex: "followUpDate",
      key: "followUpDate",
      render: (text) => (text ? text : "Not Followed Up"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span
          style={{
            color: text === "Pending" ? "#d46b08" : text === "Followed Up" ? "#52c41a" : "#1890ff",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          {/* Mark as Followed Up Button */}
          <Tooltip title="Mark as Followed Up">
            <Button
              type="primary"
              onClick={() => handleFollowUp(record.key)}
              disabled={record.status === "Followed Up" || record.status === "Sent to Admin"}
            >
              Follow Up
            </Button>
          </Tooltip>

          {/* Send to Admin Button */}
          <Tooltip title="Send to Admin for Tenant Onboarding">
            <Button
              type="default"
              onClick={() => handleSendToAdmin(record.key)}
              disabled={record.status === "Sent to Admin"}
            >
              Send to Admin
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Salesman1" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="View Visitors" />
        <Content
          style={{ margin: "20px", padding: "20px", background: "white" }}
        >
          <Search
            placeholder="Search"
            allowClear
            style={{
              width: 300,
              marginBottom: "20px",
              borderColor: "#4b244a",
            }}
          />
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 5 }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewVisitors;
