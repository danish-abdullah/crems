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
              <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>Add New</Button>
            </div>
          </div>
          {loading ? <Spin /> : <Table columns={columns} dataSource={users} pagination={{ pageSize: 10 }} />}
        </Content>
      </Layout>

      {/* Add User Modal */}
      <Modal title="Add New" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form layout="vertical" form={form} onFinish={handleAddUser}>
          <Form.Item label="Profile Picture">
            <Upload showUploadList={false} beforeUpload={() => false} onChange={handleUpload}>
              <div className="relative w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden">
                {imageUrl ? <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" /> : <UploadOutlined className="text-gray-500 text-xl" />}
              </div>
            </Upload>
            {imageUrl && (
              <Button onClick={handleRemoveImage} icon={<DeleteOutlined />} className="mt-2">Remove</Button>
            )}
          </Form.Item>

          <Form.Item label="User Type" name="user_type" rules={[{ required: true, message: "Please select user type" }]}>
            <Select placeholder="Select user type" onChange={setUserType}>
              <Option value="Admin">Admin</Option>
              <Option value="Sales Person">Sales Person</Option>
              <Option value="Tenant">Tenant</Option>
              <Option value="Maintenance">Maintenance</Option>
              <Option value="Visitor">Visitor</Option>
              <Option value="Receptionist/Watchman">Receptionist/Watchman</Option>
            </Select>
          </Form.Item>

          <div className="flex gap-4">
            <div className="w-1/2">
              <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Please enter full name" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: "Please enter phone number" }]}>
                <Input />
              </Form.Item>
            </div>
            <div className="w-1/2">
              <Form.Item label="Email Address" name="email" rules={[{ required: true, type: "email", message: "Please enter valid email" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter password" }]}>
                <Input.Password />
              </Form.Item>
            </div>
          </div>

          {/* Dynamic Fields */}
          {userType === "Tenant" && (
            <>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Form.Item label="Date of Birth" name="dob"><DatePicker /></Form.Item>
                  <Form.Item label="Flat No" name="flat_no"><Input /></Form.Item>
                  <Form.Item label="Creation Date" name="creation_date"><DatePicker /></Form.Item>
                </div>
                <div className="w-1/2">
                  <Form.Item label="Nationality" name="nationality"><Input /></Form.Item>
                  <Form.Item label="Assigned Building" name="building"><Input /></Form.Item>
                  <Form.Item label="Joining Date" name="joining_date"><DatePicker /></Form.Item>
                </div>
              </div>
            </>
          )}

          {userType === "Maintenance" && (
            <>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Form.Item label="Maintenance ID" name="maintenance_id"><Input /></Form.Item>
                  <Form.Item label="Designation" name="designation"><Input /></Form.Item>
                  <Form.Item label="Is Outsourced" name="is_outsourced"><Switch onChange={setIsOutsourced} /></Form.Item>
                </div>
                <div className="w-1/2">
                  <Form.Item label="Assigned Building" name="building"><Input /></Form.Item>
                  {isOutsourced && (
                    <>
                      <Form.Item label="Company Name" name="company_name"><Input /></Form.Item>
                      <Form.Item label="Company Phone" name="company_phone"><Input /></Form.Item>
                    </>
                  )}
                  <Form.Item label="Categories" name="categories">
                    <Checkbox.Group options={["Plumbing", "Electrical", "Paint", "Lift"]} />
                  </Form.Item>
                </div>
              </div>
            </>
          )}

          {userType === "Visitor" && (
            <>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Form.Item label="Assigned Building" name="building"><Input /></Form.Item>
                  <Form.Item label="Flat Type" name="flat_type"><Checkbox.Group options={["Studio", "1BHK", "2BHK", "3BHK"]} /></Form.Item>
                  <Form.Item label="Submission Date" name="submission_date"><DatePicker /></Form.Item>
                </div>
                <div className="w-1/2">
                  <Form.Item label="Notification Preference" name="notification_preference"><Checkbox.Group options={["Email", "SMS", "WhatsApp"]} /></Form.Item>
                  <Form.Item label="Amenities" name="amenities"><Checkbox.Group options={["Pool", "Gym", "Parking"]} /></Form.Item>
                  <Form.Item label="Desired Start Date" name="start_date"><DatePicker /></Form.Item>
                </div>
              </div>
            </>
          )}

          <Form.Item label="Status" name="status" valuePropName="checked"><Switch /></Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={submitLoading}>Add</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default RealEstate;
