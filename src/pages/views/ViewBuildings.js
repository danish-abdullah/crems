import React, { useEffect, useState } from "react";
import { Layout, Table, Input, Button, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Search } = Input;

const ViewBuildings = () => {
  const [buildings, setBuildings] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchBuildings = async () => {
      const token = localStorage.getItem("access_token");  // Get session token
      try {
        const response = await fetch("https://website-ed11b270.yeo.vug.mybluehost.me/api/admin/building", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,  // Pass the token in the Authorization header
          },
        });

        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          const formattedData = data.data.map((building) => ({
            key: building.id,
            building: building.building_name,
            address: building.address,
            NoOfFloors: building.no_of_floors,
            NoOfParkingFloors: building.no_of_parking_floors,
          }));
          setBuildings(formattedData);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching building data:", error);
      }
    };

    fetchBuildings();
  }, []);

  // Delete building by ID
  const deleteBuilding = async (id) => {
    const token = localStorage.getItem("access_token");  // Get session token
    try {
      const response = await fetch(`https://website-ed11b270.yeo.vug.mybluehost.me/api/admin/building/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        // If the deletion was successful, remove the building from the state
        setBuildings((prevBuildings) => prevBuildings.filter((building) => building.key !== id));
        message.success("Building deleted successfully");
      } else {
        message.error("Failed to delete building");
      }
    } catch (error) {
      message.error("Error deleting building");
      console.error("Error deleting building:", error);
    }
  };

  const columns = [
    {
      title: "Building Name",
      dataIndex: "building",
      key: "building",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "No. of Floors",
      dataIndex: "NoOfFloors",
      key: "NoOfFloors",
    },
    {
      title: "No. of Parking Floors",
      dataIndex: "NoOfParkingFloors",
      key: "NoOfParkingFloors",
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
          <Popconfirm
            title="Are you sure to delete this building?"
            onConfirm={() => deleteBuilding(record.key)}
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
        <TitleHeader title="View Buildings" />
        <Content
          style={{ margin: "20px", padding: "20px", background: "white" }}
        >
          <Search
            placeholder="Search"
            allowClear
            style={{
              width: 300,
              marginBottom: "20px",
              borderColor: "#4b244a",
            }}
          />
          <Table
            dataSource={buildings.length > 0 ? buildings : []}
            columns={columns}
            pagination={{ pageSize: 5 }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewBuildings;
