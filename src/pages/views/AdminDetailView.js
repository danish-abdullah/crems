import React from "react";
import {
  Layout,
  Button,
  Switch,
  Avatar,
  Divider,
  Space,
} from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import SuperAdminSidebar from "../../components/SuperAdminSidebar";
import TitleHeader from "../../components/TitleHeader";

const { Content } = Layout;

const AdminDetailView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dummy admin data (replace with real API call if needed)
  const admin = {
    name: "Shad Muller IV",
    phone: "+971-76-8763451",
    email: "Johndoe12@yopmail.com",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    status: true,
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SuperAdminSidebar selectedTab="viewAccessControl" />
      <Layout>
        <TitleHeader title="Admin Access Control" />
        <Content style={{ padding: 24 }}>
          <div style={{ marginBottom: 24 }}>
            <Button
              type="link"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
              style={{ padding: 0, fontSize: 18 }}
            >
              Admin Access Control
            </Button>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar src={admin.avatar} size={64} />
              <div style={{ marginLeft: 16 }}>
                <h3 style={{ margin: 0 }}>{admin.name}</h3>
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 12, color: "#888" }}>Phone Number</div>
                  <div style={{ fontWeight: 500 }}>{admin.phone}</div>
                </div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 12, color: "#888" }}>Email Address</div>
                  <div style={{ fontWeight: 500 }}>{admin.email}</div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <Space>
                <Button
                  icon={<EditOutlined />}
                  style={{
                    backgroundColor: "#fbeaea",
                    color: "#b01225",
                    borderColor: "#f3c7c7",
                  }}
                >
                  Edit
                </Button>
                <span>Disable</span>
                <Switch
                  defaultChecked={admin.status}
                  style={{
                    backgroundColor: admin.status ? "#b01225" : undefined,
                  }}
                />
              </Space>
              <div style={{ marginTop: 16 }}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#b01225",
                    borderColor: "#b01225",
                  }}
                >
                  Manage Access
                </Button>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDetailView;
