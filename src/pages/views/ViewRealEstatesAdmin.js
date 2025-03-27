import React, { useState, useEffect } from "react";
import {
  Layout, Table, Button, Input, Dropdown, Menu, Tag, Avatar, Modal,
  Form, Select, Upload, Switch, DatePicker, Checkbox, message, Spin
} from "antd";
import {
  SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined,
  UploadOutlined, DeleteOutlined
} from "@ant-design/icons";
import AdminSidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";
import axios from "axios";
import "../../App.css";
import AddRealEstateModal from "../../components/AddRealEstateModal.js"

const { Content } = Layout;
const { Option } = Select;

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
  const [userType, setUserType] = useState(null);
  const [isOutsourced, setIsOutsourced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

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
        logo : item.logo
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

  // Upload Image Handler
  const handleUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    form.resetFields();
    setImageUrl(null);
    setUserType(null);
    setIsOutsourced(false);
    setIsModalVisible(false);
  };

  const handleAddUser = async (values) => {
    try {
      setSubmitLoading(true);

      const formData = {
        ...values,
        profile_picture: imageUrl,
        status: values.status ? 1 : 0,
        is_outsourced: isOutsourced ? 1 : 0,
        user_type: userType,
      };

      const response = await axios.post("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/user", formData);

      if (response.data.success) {
        message.success("User added successfully!");
        handleCancel();
        fetchUsers();
      } else {
        message.error(response.data.message || "Failed to add user.");
      }
    } catch (err) {
      message.error("Error submitting user data.");
    } finally {
      setSubmitLoading(false);
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
      render: (status) => <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: () => <EditOutlined className="text-red-500 cursor-pointer" />,
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
        onClose={() => setIsModalVisible(false)}
      />
    </Layout>
  );
};

export default RealEstate;
