// pages/RealEstate/BuildingDetail.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Button, Tag, Descriptions, Card, Row, Col } from "antd";
import { ArrowLeftOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import SuperAdminSidebar from "../../components/SuperAdminSidebar";
import TitleHeader from "../../components/TitleHeader";
import "../../App.css";
import ViewTenants from "./ViewTenants"

const { Content } = Layout;


<style>
    .ant-card-body {
        
    }
</style>

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
      <SuperAdminSidebar selectedTab="viewRealEstates" />
      <Layout>
        <TitleHeader title="Access Building" />
        <Content className="p-1">
          <div className="mb-1">
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>

          <div className="bg-white p-2 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{data.name}</h2>
              <Tag color={data.status === 1 ? "green" : "red"}>
                {data.status === 1 ? "Active" : "Inactive"}
              </Tag>
            </div>
            <Descriptions layout="horizontal" column={3}>
              <Descriptions.Item label="Building Name">{data.building}</Descriptions.Item>
              <Descriptions.Item label="Address">{data.address}</Descriptions.Item>
              <Descriptions.Item label="Total Apartments">{data.apartments}</Descriptions.Item>
              <Descriptions.Item label="Total Tenants">{data.tenants}</Descriptions.Item>
              <Descriptions.Item label="Date Added">{data.dateAdded}</Descriptions.Item>
            </Descriptions>
            <div className="text-right">
              <Button icon={<EditOutlined />}>Edit</Button>
            </div>
          </div>

          <div className="bg-white rounded shadow">
            <h3 className="text-lg font-semibold p-2">Insights & Statistics</h3>
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
          <ViewTenants></ViewTenants>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BuildingDetail;
