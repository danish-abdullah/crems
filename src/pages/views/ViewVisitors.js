import React, { useState, useEffect } from "react";
import { Layout, Table, Input, Button, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Search } = Input;

const ViewVisitors = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch visitors list
  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://website-ed11b270.yeo.vug.mybluehost.me/api/admin/visitor",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Add token if required
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        const visitors = data.data.map((visitor) => ({
          key: visitor.id,
          name: visitor.name,
          building: visitor.building_name,
          flat: visitor.flat_no || "N/A",
          mobile: visitor.mobile_number,
          email: visitor.email,
          date: visitor.created_at.split("T")[0], // Extract date before "T"
        }));
        setDataSource(visitors);
        message.success(data.message);
      } else {
        message.error("Failed to fetch visitors.");
      }
    } catch (error) {
      console.error(error);
      message.error("Error fetching visitors.");
    } finally {
      setLoading(false);
    }
  };

  // Delete visitor
  const deleteVisitor = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://website-ed11b270.yeo.vug.mybluehost.me/api/admin/visitor/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Add token if required
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        message.success("Visitor deleted successfully.");
        fetchVisitors(); // Refresh the list after deletion
      } else {
        message.error("Failed to delete visitor.");
      }
    } catch (error) {
      console.error(error);
      message.error("Error deleting visitor.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch visitors on component mount
  useEffect(() => {
    fetchVisitors();
  }, []);

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
      title: "Update",
      key: "update",
      render: (_, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            type="link"
            style={{ color: "#7b3e82" }}
          />
          <Popconfirm
            title="Are you sure to delete this visitor?"
            onConfirm={() => deleteVisitor(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Admin" />

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
            loading={loading}
            pagination={{ pageSize: 5 }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewVisitors;
