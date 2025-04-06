// pages/RealEstate/BuildingDetail.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Button, Tag, Descriptions, Card, Row, Col } from "antd";
import { ArrowLeftOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import SuperAdminSidebar from "../../components/SuperAdminSidebar";
import TitleHeader from "../../components/TitleHeader";
import "../../App.css";

const { Content } = Layout;

const BuildingDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const stats = {
    tenantOverview: "55/60 Apartment Occupied",
    visitorLoggedToday: 12,
    pendingMaintenanceRequests: 12,
    totalComplaints: 12,
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SuperAdminSidebar selectedTab="viewAccessRealEstates" />
      <Layout>
        <TitleHeader title="Access Real Estate/Building" />
        <Content className="p-6">
          <div className="mb-4">
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>

          <div className="bg-white p-6 rounded shadow mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{data.name}</h2>
              <Tag color={data.status === 1 ? "green" : "red"}>
                {data.status === 1 ? "Active" : "Inactive"}
              </Tag>
            </div>
            <Descriptions layout="horizontal" column={3}>
              <Descriptions.Item label="Admin">{data.admin}</Descriptions.Item>
              <Descriptions.Item label="Phone Number">{data.phone}</Descriptions.Item>
              <Descriptions.Item label="Email Address">{data.email}</Descriptions.Item>
              <Descriptions.Item label="Total Apartments">{data.apartments}</Descriptions.Item>
              <Descriptions.Item label="Total Tenants">{data.tenants}</Descriptions.Item>
              <Descriptions.Item label="Date Added">{data.dateAdded}</Descriptions.Item>
            </Descriptions>
            <div className="text-right mt-4">
              <Button icon={<EditOutlined />}>Edit</Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Insights & Statistics</h3>
            <Row gutter={16}>
              <Col span={6}>
                <Card title="Tenant Overview">{stats.tenantOverview}</Card>
              </Col>
              <Col span={6}>
                <Card title="Visitor Logged Today">{stats.visitorLoggedToday}</Card>
              </Col>
              <Col span={6}>
                <Card title="Pending Maintenance Requests">{stats.pendingMaintenanceRequests}</Card>
              </Col>
              <Col span={6}>
                <Card title="Total Complaints">{stats.totalComplaints}</Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BuildingDetail;
