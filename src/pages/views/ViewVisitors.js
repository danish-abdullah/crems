import React from "react";
import { Layout, Table, Typography, Input, Button } from "antd";
import { LogoutOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const ViewVisitors = () => {
  // Sample data for visitors table
  const dataSource = [
    {
      key: "1",
      building: "Al jeddah",
      person: "Visitor",
      date: "2023-03-12",
      name: "Umer",
      mobile: "55 765 7028",
      email: "umer30@gmail.com",
    },
    // Add more rows as needed
  ];

  const columns = [
    {
      title: "Building",
      dataIndex: "building",
      key: "building",
    },
    {
      title: "Person",
      dataIndex: "person",
      key: "person",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Update",
      key: "update",
      render: () => (
        <div>
          <Button
            icon={<EditOutlined />}
            type="link"
            style={{ color: "#7b3e82" }}
          />
          <Button icon={<DeleteOutlined />} type="link" danger />
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        username="Admin"
        role="Admin"
      />

      {/* Main Content */}
      <Layout>
        <Header
          style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <Title level={4} style={{ color: "#4b244a", margin: 0 }}>
            View Visitors
          </Title>
          <Button
            type="link"
            icon={<LogoutOutlined />}
            style={{ color: "#4b244a" }}
          >
            Logout
          </Button>
        </Header>
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