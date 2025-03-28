import React, { useState } from "react";
import { Layout, Input, Table, Tag } from "antd";
import "../../App.css";
import Sidebar from "../../components/TenantSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Search } = Input;

const ViewComplaints = () => {
  const [data] = useState([
    {
      key: "1",
      Id: "C001",
      description: "Water leakage in the bathroom.",
      status: "Pending",
    },
    {
      key: "2",
      Id: "C002",
      description: "Elevator not working.",
      status: "Resolved",
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
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar username="Tenant1" />

      <Layout>
        <TitleHeader title="View Complaints" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
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

export default ViewComplaints;