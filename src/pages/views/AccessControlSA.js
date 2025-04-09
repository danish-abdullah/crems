import React from "react";
import {
  Layout,
  Table,
  Input,
  Button,
  Avatar,
  Tag,
  Space,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SuperAdminSidebar from "../../components/SuperAdminSidebar";
import TitleHeader from "../../components/TitleHeader";

const { Content } = Layout;

const sampleAdmins = Array.from({ length: 9 }).map((_, index) => ({
  key: index,
  id: index + 1,
  name: "John Doe",
  email: "Johndoe12@yopmail.com",
  phone: "+971-76-8763451",
  status: index % 2 === 0 ? "Active" : "Inactive",
  avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
}));

const AccessControl = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} />
          {record.name}
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
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
      render: () => (
        <Button
          type="text"
          icon={<EditOutlined />}
          style={{ color: "#fa8c16" }}
        />
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SuperAdminSidebar selectedTab="viewAccessControl" />
      <Layout>
        <TitleHeader title="Admins Access Control" />
        <Content style={{ padding: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{
                backgroundColor: "#b01225",
                borderColor: "#b01225",
              }}
            >
              Add New
            </Button>
          </div>

          <Table
            dataSource={sampleAdmins}
            columns={columns}
            pagination={{
              total: 13,
              pageSize: 9,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total}`,
            }}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => navigate(`/view-access-control-sa/${record.id}`),
              style: { cursor: "pointer" },
            })}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AccessControl;
