import React, { useState, useEffect } from "react";
import { Layout, Table, Button, Typography, Popover, message, Popconfirm, Spin } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Sidebar from "../../components/AdminSidebar.js";
import "../../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import TitleHeader from "../../components/TitleHeader.js";
import SearchBar from "../../components/SearchBar.js";
import AddApartmentModal from "../forms/AddApartment.js";

const { Content } = Layout;
const { Title } = Typography;

const ViewApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [isApartmentModalVisible, setIsApartmentModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false); // 👈 Loader state
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredData, setFilteredData] = useState([]);
  // Fetch data from API on component mount
  const fetchBuildings = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/buildings`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        const formattedData = result.data.map((building) => ({
          key: building.id,
          building_name: building.building_name,
          address: building.address,
          NoOfFloors: building.no_of_floors,
          NoOfParkingFloors: building.no_of_parking_floors,
          rawData: building,
        }));
        setBuildings(formattedData);
      } else {
        console.error("Unexpected data structure:", result);
      }
    } catch (error) {
      console.error("Error fetching buildings:", error);
      message.error("Failed to load buildings.");
    }
  };
  const fetchApartments = async () => {
    try {
      const token = localStorage.getItem("access_token");  // Get session token
      const response = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/apartments", {
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
          comments: apartment.comments,
          building_id: apartment.building_id
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
  useEffect(() => {
fetchBuildings();
    fetchApartments();
  }, []); // Empty dependency array to run only on mount

  // Function to handle apartment deletion
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("access_token"); // Get session token
      const response = await fetch(`https://website-64a18929.yeo.vug.mybluehost.me/api/admin/apartments/${id}`, {
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
      dataIndex: "building_id",
      key: "building_id",
      render: (id) => buildings.length === 0 ? <Spin size="small" /> :
  buildings.find((b) => String(b.key) === String(id))?.building_name || "N/A"
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
            onClick={() => {
              setEditData(record); // ✅ Set selected apartment data
              setIsApartmentModalVisible(true); // ✅ Open modal
            }}
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
      <Sidebar username="Admin" selectedTab="viewApartments" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="View Apartments" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
        <Spin spinning={loading} size="large">
        <div className="flex justify-between items-center mb-4">
          <SearchBar
            data={apartments}
            fieldsToSearch={["building_id", "name"]}
            onFilteredData={setFilteredData}
          />
          <div className="flex gap-2">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => {
                setEditData(null);
                setIsApartmentModalVisible(true);
              }}
            >
              Add Apartment
            </Button>
          </div>
        </div>

        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </Spin>

      <AddApartmentModal
        visible={isApartmentModalVisible}
        onClose={() => {
          setIsApartmentModalVisible(false);
          setEditData(null);
        }}
        editData={editData}
        refreshData={fetchApartments}
      />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewApartments;
