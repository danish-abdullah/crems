import React, { useState, useEffect } from "react";
import {
  Layout, Table, Button, Input, Tag, Avatar, Space, Popconfirm, message, Spin
} from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import SuperAdminSidebar from "../../components/SuperAdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";
import "../../App.css";
import { useNavigate } from "react-router-dom"; 

const { Content } = Layout;

const AccessRealEstate = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Sample Data for Testing
      const sampleData = [
        {
          id: 1,
          real_estate_name: "ABC Real Estate",
          email_address: "johndoe12@yopmail.com",
          phone_number: "+971-76-8763451",
          assigned_admin: "John DOE",
          total_buildings: 12,
          total_tenants: 200,
          logo: "https://randomuser.me/api/portraits/men/1.jpg",
          status: 1, // Active
        },
        {
          id: 2,
          real_estate_name: "XYZ Properties",
          email_address: "xyzmanager@yopmail.com",
          phone_number: "+971-50-6543210",
          assigned_admin: "Alice Smith",
          total_buildings: 40,
          total_tenants: 120,
          logo: "https://randomuser.me/api/portraits/women/2.jpg",
          status: 0, // Inactive
        },
        {
          id: 3,
          real_estate_name: "Sunshine Apartments",
          email_address: "sunshine@yopmail.com",
          phone_number: "+971-55-1234567",
          assigned_admin: "Michael Brown",
          total_buildings: 25,
          total_tenants: 180,
          logo: "https://randomuser.me/api/portraits/men/3.jpg",
          status: 1, // Active
        },
        {
          id: 4,
          real_estate_name: "Luxury Villas",
          email_address: "luxuryvillas@yopmail.com",
          phone_number: "+971-58-9876543",
          assigned_admin: "Emma Wilson",
          total_buildings: 10,
          total_tenants: 80,
          logo: "https://randomuser.me/api/portraits/women/4.jpg",
          status: 0, // Inactive
        },
      ];
  
      // Format sample data to match the table structure
      const formattedData = sampleData.map((item, index) => ({
        key: index + 1,
        id: item.id,
        name: item.real_estate_name,
        email: item.email_address,
        phone: item.phone_number || "-",
        admin: item.assigned_admin || "-",
        totalBuildings: item.total_buildings || 0,
        totalTenants: item.total_tenants || 0,
        logo: item.logo,
        status: item.status === 1 ? "Active" : "Inactive",
      }));
  
      setData(formattedData);
    } catch (error) {
      message.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (record) => {
    console.log("Edit:", record);
    // Implement edit modal functionality
  };

  const handleRowClick = (record) => {
    navigate("/real-estate-detail-sa", { state: record });
  };

  const columns = [
    {
      title: "Real Estate Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar src={record.logo} />
          {text}
        </Space>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "Assigned Admin", dataIndex: "admin", key: "admin" },
    { title: "Total Buildings", dataIndex: "totalBuildings", key: "totalBuildings" },
    { title: "Total Tenants", dataIndex: "totalTenants", key: "totalTenants" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button icon={<EditOutlined />} type="link" onClick={() => handleEdit(record)} />
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SuperAdminSidebar selectedTab="viewAccessRealEstates" />
      <Layout>
        <TitleHeader title="Access Real Estate/Building" />
        <Content className="p-6 bg-white">
          <div>
            <Input placeholder="Search Real Estate" prefix={<SearchOutlined />} className="mb-4 w-1/3" />
          </div>
          {loading ? <Spin /> : <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} 
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AccessRealEstate;
