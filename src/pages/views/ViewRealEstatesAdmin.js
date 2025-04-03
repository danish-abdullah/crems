import React, { useState, useEffect } from "react";
import {
  Layout, Table, Button, Input, Dropdown, Menu, Tag, Avatar,
  Form, message, Spin, Space, Popconfirm
} from "antd";
import {
  SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined, DeleteOutlined
} from "@ant-design/icons";
import AdminSidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";
import axios from "axios";
import "../../App.css";
import AddRealEstateModal from "../../components/AddRealEstateModal.js"

const { Content } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="1">Date</Menu.Item>
    <Menu.Item key="2">Flat Type</Menu.Item>
    <Menu.Item key="3">Building</Menu.Item>
  </Menu>
);

const RealEstate = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);
  
  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/real-estates",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Add token if required
          },
        }
      );
      const data = await response.json();
      const formattedUsers = data?.data?.map((item, index) => ({
        key: index + 1,
        id: item.id,
        name: item.real_estate_name,
        email: item.email_address,
        phone: item.phone_number || "-",
        address: item.address || "-",
        admin: item.assigned_admin || "-",
        pricing_plan: item.pricing_plan_name,
        logo : item.logo,
        status: item.status,
      })) || [];
      setUsers(formattedUsers);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (record) => {
    console.log("Editing Record:", record);
    setEditData(record); // Set the selected row data
    setIsModalVisible(true); // Open modal
  };

  const handleDeleteRealEstate = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/real-estates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
  
      if (response.data.success) {
        message.success("Real estate deleted successfully!");
        fetchUsers(); // Refresh the table
      } else {
        message.error(response.data.message || "Failed to delete real estate.");
      }
    } catch (error) {
      message.error("Error deleting real estate.");
    } finally {
      setLoading(false);
    }
  };
  
  const columns = [
    {
      title: "Real Estate Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.logo} />
          {text}
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "Assigned Admin", dataIndex: "admin", key: "admin" },
    { title: "Pricing Plan", dataIndex: "pricing_plan", key: "pricing_plan" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === 1 ? "green" : "red"}>{status === 1 ? "Active" : "Inactive"}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="link" onClick={() => handleEdit(record)}></Button>
          <Popconfirm
            title="Are you sure you want to delete this real estate?"
            onConfirm={() => handleDeleteRealEstate(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar username="Admin" selectedTab="realEstate"/>
      <Layout>
        <TitleHeader title="Real Estates" />
        <Content className="p-6 bg-white">
          <div className="flex justify-between items-center mb-4">
            <Input placeholder="Search" prefix={<SearchOutlined />} className="w-1/3" />
            <div className="flex gap-2">
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button icon={<FilterOutlined />}>Filter By</Button>
              </Dropdown>
              <Button icon={<PlusOutlined />} type="primary" onClick={() => setIsModalVisible(true)}>Add New</Button>
            </div>
          </div>
          {loading ? <Spin /> : <Table columns={columns} dataSource={users} pagination={{ pageSize: 10 }} />}
        </Content>
      </Layout>
      <AddRealEstateModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setEditData(null); // Reset edit data when closing modal
        }}
        editData={editData}
      />
    </Layout>
  );
};

export default RealEstate;
