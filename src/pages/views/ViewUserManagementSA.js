import React from "react";
import { Layout, Table, Button, Input, Dropdown, Menu, Tag, Avatar } from "antd";
import { SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import SuperAdminSidebar from "../../components/SuperAdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";
import "../../App.css";

const { Content } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="1">Date</Menu.Item>
    <Menu.Item key="2">Flat Type</Menu.Item>
    <Menu.Item key="3">Building</Menu.Item>
  </Menu>
);

const users = [
  { key: 1, name: "John Doe", email: "Johndoe12@yopmail.com", phone: "+971-76-8763451", type: "Admin", module: "Visitor", realState: "AR Builders", status: "Active", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
  { key: 2, name: "John Doe", email: "Johndoe12@yopmail.com", phone: "+971-76-8763451", type: "Salesperson", module: "Sales", realState: "Simma Villas", status: "Inactive", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { key: 3, name: "John Doe", email: "Johndoe12@yopmail.com", phone: "+971-76-8763451", type: "Maintenance", module: "Tenant", realState: "AR Builders", status: "Active", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
];

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
  { title: "Assigned Module", dataIndex: "module", key: "module" },
  { title: "Real State", dataIndex: "realState", key: "realState" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => <EditOutlined className="text-red-500 cursor-pointer" />,
  },
];

const UserManagement = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SuperAdminSidebar />
      <Layout>
        <TitleHeader title="User Management" />
        <Content className="p-6 bg-white">
          <div className="flex justify-between items-center mb-4">
            <Input placeholder="Search" prefix={<SearchOutlined />} className="w-1/3" />
            <div className="flex gap-2">
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button icon={<FilterOutlined />}>Filter By</Button>
              </Dropdown>
              <Button icon={<PlusOutlined />} type="primary">Add User</Button>
            </div>
          </div>
          <Table columns={columns} dataSource={users} pagination={{ pageSize: 10 }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserManagement;
