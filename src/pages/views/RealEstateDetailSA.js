// pages/RealEstate/RealEstateDetail.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Table, Avatar, Tag, Button } from "antd";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import SuperAdminSidebar from "../../components/SuperAdminSidebar";
import TitleHeader from "../../components/TitleHeader";
import ViewBuildings from "./ViewBuildings";
import "../../App.css";

const { Content } = Layout;

const RealEstateDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SuperAdminSidebar selectedTab="viewRealEstates" />
      <Layout>
        <TitleHeader title="Access Real Estate" />
        <Content className="p-6">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} className="mb-4">
            Back
          </Button>
          <div className="bg-white p-4 rounded shadow mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar size={64} src={data.logo} />
              <div>
                <h2 className="text-lg font-bold">{data.name}</h2>
                <p>
                  <span className="text-gray-600">{data.phone}</span> |{" "}
                  <span className="text-gray-600">{data.email}</span>
                </p>
                <p className="text-sm text-gray-600">Admin: {data.admin}</p>
              </div>
              <Tag color={data.status === 1 ? "green" : "red"}>
                {data.status === 1 ? "Active" : "Inactive"}
              </Tag>
            </div>
            <Button icon={<EditOutlined />} type="default">
              Edit
            </Button>
          </div>

          {/* <Table columns={columns} dataSource={sampleBuildings}
          onRow={(record) => ({
            onClick: () => handleBuildingClick(record),
          })}
           /> */}
           <ViewBuildings></ViewBuildings>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RealEstateDetail;
