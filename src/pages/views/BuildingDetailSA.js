import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Button, Tag, Descriptions, Card, Row, Col } from "antd";
import { ArrowLeftOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import SuperAdminSidebar from "../../components/SuperAdminSidebar";
import TitleHeader from "../../components/TitleHeader";
import "../../App.css";
import ViewTenants from "./ViewTenants"

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
      <SuperAdminSidebar selectedTab="viewRealEstates" />
      <Layout>
        <TitleHeader title="Access Building" />
        <Content className="p-1">
          <div className="mb-1">
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>

          <div className="bg-white p-2 rounded shadow" style={{margin: "20px"}}>
            <Descriptions layout="horizontal" column={3}>
              <Descriptions.Item label="Building Name">{data.building}</Descriptions.Item>
              <Descriptions.Item label="Address">{data.address}</Descriptions.Item>
            </Descriptions>
            {/* <div className="text-right">
              <Button icon={<EditOutlined />}>Edit</Button>
            </div> */}
          </div>
          <ViewTenants realEstateID={data.rawData.real_estate_id} buildingName={data.building} buildingID={data.key}></ViewTenants>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BuildingDetail;
