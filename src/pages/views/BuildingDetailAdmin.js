import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Button, Tag, Descriptions, Card, Row, Col } from "antd";
import { ArrowLeftOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import AdminSidebar from "../../components/AdminSidebar";
import TitleHeader from "../../components/TitleHeader";
import "../../App.css";
import ViewTenants from "./ViewTenants"

const { Content } = Layout;

const BuildingDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar selectedTab="viewBuildings" />
      <Layout>
        <TitleHeader title="Access Building" />
        <Content className="p-1">
          <div className="mb-1">
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>

          <div className="bg-white p-2 rounded shadow" style={{margin:"20px"}}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{data.name}</h2>
            </div>
            <Descriptions layout="horizontal" column={2}>
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
