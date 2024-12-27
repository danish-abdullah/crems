import React from "react";
import { Layout, Table, Button, Typography, Popover } from "antd";
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;

const ViewApartments = () => {
  // Mock data for apartments
  const data = [
    {
      key: "1",
      apartmentType: "Residential",
      area: "1200 sqft",
      rent: "$1500",
      rooms: "2 Bed, 1 Bath, 1 Living",
      furnished: "Semi-Furnished",
      balcony: "Yes",
      comments: "Close to the park",
    },
    {
      key: "2",
      apartmentType: "Commercial",
      area: "1800 sqft",
      rent: "$2500",
      rooms: "1 Studio, 1 Pantry",
      furnished: "Not Furnished",
      balcony: "No",
      comments: "Good location for an office",
    },
  ];

  // Table columns configuration
  const columns = [
    {
      title: "Apartment Type",
      dataIndex: "apartmentType",
      key: "apartmentType",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "Rent",
      dataIndex: "rent",
      key: "rent",
    },
    {
      title: "Rooms",
      dataIndex: "rooms",
      key: "rooms",
    },
    {
      title: "Furnished",
      dataIndex: "furnished",
      key: "furnished",
    },
    {
      title: "Balcony",
      dataIndex: "balcony",
      key: "balcony",
    },
    {
      title: "Comments",
      key: "comments",
      render: (_, record) => (
        <Popover content={record.comments}>
          <InfoCircleOutlined style={{ color: "#4b244a", cursor: "pointer" }} />
        </Popover>
      ),
    },
    {
      title: "Update",
      key: "update",
      render: (_, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            type="link"
            style={{ color: "#7b3e82" }}
          />
          <Button icon={<DeleteOutlined />} type="link" danger />
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Admin" role="Admin" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="View Apartments" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Title level={5} style={{ color: "#4b244a" }}>
            Apartment List
          </Title>
          <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewApartments;
