import React from "react";
import { Layout, Table, Input, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "../../App.css";
import SuperAdminSidebar from "../../components/SuperAdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Search } = Input;

const ViewAdmins = () => {
  // Sample data for visitors table
  const dataSource = [
    {
      key: "1",
      agency: "Al Jeddah",
      owner: "Masood",
      properties: "3",
      mobile: "0300-5626791",
      email: "masood@gmail.com",
      date: "2023-03-12",
    },
    // Add more rows as needed
  ];

  const columns = [
    {
      title: "Agency Name",
      dataIndex: "agency",
      key: "agency",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "No. of Properties",
      dataIndex: "properties",
      key: "properties",
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
      title: "Update",
      key: "update",
      render: () => (
        <div>
          <Button
            icon={<EditOutlined />}
            type="link"
            style={{ color: "#7b3e82" }}
          />
          <Button
            icon={<DeleteOutlined />}
            type="link"
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <SuperAdminSidebar />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="View Admins" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
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

export default ViewAdmins;