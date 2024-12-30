import React, { useEffect, useState } from "react";
import { Layout, Table, Input, Button, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Search } = Input;

const ViewTenants = () => {
  const [dataSource, setDataSource] = useState([]);

  // Fetch the tenants list from the API
  const fetchTenants = async () => {
    try {
      const response = await fetch("https://website-ed11b270.yeo.vug.mybluehost.me/api/admin/tenant", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setDataSource(data.data);  // Set tenants data in state
      } else {
        message.error("Failed to fetch tenants");
      }
    } catch (error) {
      message.error("Error fetching tenants");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTenants();  // Fetch tenants on component mount
  }, []);

  // Delete tenant
  const deleteTenant = async (tenantId) => {
    try {
      const response = await fetch(`https://website-ed11b270.yeo.vug.mybluehost.me/api/admin/tenant/${tenantId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        message.success("Tenant deleted successfully");
        // Refresh tenant list after deletion
        fetchTenants();
      } else {
        message.error("Failed to delete tenant");
      }
    } catch (error) {
      message.error("Error deleting tenant");
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "name",
    },
    {
      title: "Building",
      dataIndex: "building_name",
      key: "building",
    },
    {
      title: "Flat No.",
      dataIndex: "flat_no",
      key: "flat",
    },
    {
      title: "Mobile No",
      dataIndex: "mobile_no",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Date Added",
      dataIndex: "created_at",
      key: "date",
      render: (text) => {
        // Truncate the date string to remove time after 'T'
        const date = text.split('T')[0];
        return date; // Only return the date part (before 'T')
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            type="link"
            style={{ color: "#7b3e82" }}
          />
          <Popconfirm
            title="Are you sure to delete this tenant?"
            onConfirm={() => deleteTenant(record.id)}
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
        <TitleHeader title="View Tenants" />
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
            rowKey="id"
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewTenants;
