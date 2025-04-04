import React, { useState, useEffect } from "react";
import {
  Layout, Table, Button, Input, Dropdown, Menu, Tag, Avatar, Modal, Space, Popconfirm,
  Form, Select, Upload, Switch, DatePicker, Checkbox, message, Spin
} from "antd";
import {
  SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined,
  UploadOutlined, DeleteOutlined
} from "@ant-design/icons";
import AdminSidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";
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

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isOutsourced, setIsOutsourced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/users",
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
        id: item.id,
        key: index + 1,
        name: item.name,
        email: item.email,
        phone: item.phone || "-",
        type: item.roles[0]?.name || "-",
        // module: item.assigned_module || "-",
        // realState: item.real_state_company || "-",
        status: item.status === 1 ? "Active" : "Inactive",
        avatar: item.profile_picture || "https://via.placeholder.com/150"
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

  const showModal = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setImageUrl(null);
    setUserType(null);
    setIsOutsourced(false);
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const handleSaveUser = async (values) => {
    try {
      setSubmitLoading(true);
  
      // Construct the payload as per your sample body
      const formData = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: userType?.toLowerCase() || "user", // Default to 'user' if not selected
      };

      const url = editingUser
        ? `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/users/${editingUser.id}`
        : "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/users";

      const method = editingUser ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}` // Include if required
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        message.success(editingUser ? "User updated successfully!" : "User added successfully!");
        handleCancel();
        fetchUsers();
      } else {
        message.error(data.message || "Failed to save user.");
      }
  
    } catch (err) {
      message.error("Error submitting user data.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    setUserType(record.type);
    console.log(record);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      password: record.password,
      phone: record.phone,
      user_type: record.type,
    });
    setIsModalVisible(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`https://website-64a18929.yeo.vug.mybluehost.me/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        message.success("User deleted successfully.");
        fetchUsers(); // Refresh table data
      } else {
        message.error(data.message || "Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Error deleting user.");
    }
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.avatar} />
          {text}
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "User Type", dataIndex: "type", key: "type" },
    // { title: "Assigned Module", dataIndex: "module", key: "module" },
    // { title: "Real State", dataIndex: "realState", key: "realState" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="link" onClick={() => handleEdit(record)}></Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger></Button>
          </Popconfirm>
        </Space>
      ),
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar username="Admin" selectedTab="userManagement"/>
      <Layout>
        <TitleHeader title="User Management" />
        <Content className="p-6 bg-white">
          <div className="flex justify-between items-center mb-4">
            <Input placeholder="Search" prefix={<SearchOutlined />} className="w-1/3" />
            <div className="flex gap-2">
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button icon={<FilterOutlined />}>Filter By</Button>
              </Dropdown>
              <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>Add User</Button>
            </div>
          </div>
          {loading ? <Spin /> : <Table columns={columns} dataSource={users} pagination={{ pageSize: 10 }} />}
        </Content>
      </Layout>

      {/* Add User Modal */}
      <Modal title="Add User" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form layout="vertical" form={form} onFinish={handleSaveUser}>
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
            <Select placeholder="Select user type" onChange={setUserType} value={userType}>
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

export default UserManagement;
