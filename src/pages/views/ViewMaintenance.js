import React, { useState } from "react";
import { Layout, Typography, Input, Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const ViewMaintenance = () => {
  // Sample data for maintenance personnel
  const [data, setData] = useState([
    {
      key: "1",
      maintenancePersonId: "MP001",
      maintenancePersonName: "John Doe",
      email: "johndoe@example.com",
      contactNo: "1234567890",
    },
    {
      key: "2",
      maintenancePersonId: "MP002",
      maintenancePersonName: "Jane Smith",
      email: "janesmith@example.com",
      contactNo: "9876543210",
    },
    // Add more data as needed
  ]);

  // State for search input
  const [searchText, setSearchText] = useState("");

  // Filtered data based on search
  const filteredData = data.filter(
    (item) =>
      item.maintenancePersonId.toLowerCase().includes(searchText.toLowerCase()) ||
      item.maintenancePersonName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      item.contactNo.includes(searchText)
  );

  // Columns for the table
  const columns = [
    {
      title: "Maintenance Person ID",
      dataIndex: "maintenancePersonId",
      key: "maintenancePersonId",
    },
    {
      title: "Maintenance Person Name",
      dataIndex: "maintenancePersonName",
      key: "maintenancePersonName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Update",
      key: "update",
      render: (_, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            type="link"
            style={{ color: "#7b3e82" }}
          />
          <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDelete(record.key)} />
        </div>
      ),
    },
  ];

  // Handle delete action
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Admin" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="View Maintenance Personnel" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Title level={5} style={{ color: "#4b244a" }}>
            Maintenance Personnel List
          </Title>
          <Search
            placeholder="Search by name, ID, email, or contact no"
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

export default ViewMaintenance;
