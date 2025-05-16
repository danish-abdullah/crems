import React from "react";
import { Layout, Table, Input } from "antd";
import "../../../App.css";
import Sidebar from "../../../components/VisitorSidebar.js";
import TitleHeader from "../../../components/TitleHeader.js";
import SearchBar from "../../../components/SearchBar.js";
import { useState, useEffect } from "react";

const { Content } = Layout;
const { Search } = Input;

const ViewVisitors = () => {
  // Sample data for visitors table
  const [filteredData, setFilteredData] = useState([]);
  const dataSource = [
    {
      key: "1",
      building: "Al jeddah",
      person: "Visitor",
      date: "2023-03-12",
      name: "Umer",
      mobile: "55 765 7028",
      email: "umer30@gmail.com",
      flat: "102"
    },
    // Add more rows as needed
  ];

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
  ];

  useEffect(() => {
    setFilteredData(dataSource);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Receptionist" selectedTab="viewVisitors" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="View Visitors" />
        <Content
          style={{ margin: "20px", padding: "20px", background: "white" }}
        >
          <SearchBar
           data={dataSource}
           fieldsToSearch={["name", "building", "email"]}
           onFilteredData={setFilteredData}
          />
          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={{ pageSize: 5 }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewVisitors;