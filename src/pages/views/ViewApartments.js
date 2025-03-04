import React, { useState, useEffect } from "react";
import { Layout, Table, Button, Typography, Popover, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;

const ViewApartments = () => {
  const [apartments, setApartments] = useState([]);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const token = localStorage.getItem("access_token");  // Get session token
        const response = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/apartment", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.success) {
          const formattedData = data.data.map(apartment => ({
            key: apartment.id,
            apartmentType: apartment.apartment_type.charAt(0).toUpperCase() + apartment.apartment_type.slice(1),
            name: apartment.area,
            rent: `${parseFloat(apartment.rent).toFixed(2)}`,  // Format rent as currency
            rooms: apartment.rooms ? apartment.rooms.join(", ") : "N/A", // Format rooms list
            furnished: apartment.furnished,
            balcony: apartment.balcony ? "Yes" : "No",
            building: apartment.comments,
          }));
          setApartments(formattedData);
        } else {
          message.error("Failed to fetch apartment data");
        }
      } catch (error) {
        message.error("Error fetching apartment data");
        console.error("Error:", error);
      }
    };

    fetchApartments();
  }, []); // Empty dependency array to run only on mount

  // Function to handle apartment deletion
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("access_token"); // Get session token
      const response = await fetch(`https://website-64a18929.yeo.vug.mybluehost.me/api/admin/apartment/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        message.success("Apartment deleted successfully");
        // Remove the deleted apartment from state
        setApartments((prevApartments) =>
          prevApartments.filter((apartment) => apartment.key !== id)
        );
      } else {
        message.error("Failed to delete apartment");
      }
    } catch (error) {
      message.error("Error deleting apartment");
      console.error("Error:", error);
    }
  };

  // Table columns configuration
  const columns = [
    {
      title: "Apartment Type",
      dataIndex: "apartmentType",
      key: "apartmentType",
    },
    {
      title: "Apartment Name",
      dataIndex: "name",
      key: "name",
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
      title: "Building Name",
      dataIndex: "building",
      key: "building",
    },
    // {
    //   title: "Comments",
    //   key: "comments",
    //   render: (_, record) => (
    //     <Popover content={record.comments}>
    //       <InfoCircleOutlined style={{ color: "#4b244a", cursor: "pointer" }} />
    //     </Popover>
    //   ),
    // },
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
          {/* Popconfirm to ask for confirmation before deleting */}
          <Popconfirm
            title="Are you sure you want to delete this apartment?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Admin" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="View Apartments" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Title level={5} style={{ color: "#4b244a" }}>
            Apartment List
          </Title>
          <Table columns={columns} dataSource={apartments} pagination={{ pageSize: 5 }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewApartments;
