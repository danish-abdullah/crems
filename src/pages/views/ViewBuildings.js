import React, { useEffect, useState } from "react";
import {
  Layout,
  Table,
  Input,
  Button,
  message,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "../../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import AddBuildingModal from "../forms/AddBuilding";

const { Content } = Layout;
const { Search } = Input;

const ViewBuildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [isBuildingModalVisible, setIsBuildingModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const fetchBuildings = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/buildings",
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
          building: building.building_name,
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
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  const handleRowClick = (record) => {
    navigate("/building-detail-sa", {
      state: {
        ...record,
        // realEstateName: data.name,
        dateAdded: "12-12-2024", // Example
        tenants: 12, // Optional: Replace with actual data
      },
    });
  };

  const deleteBuilding = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/buildings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setBuildings((prev) => prev.filter((b) => b.key !== id));
        message.success("Building deleted successfully");
      } else {
        message.error("Failed to delete building");
      }
    } catch (error) {
      message.error("Error deleting building");
      console.error(error);
    }
  };

  const handleEdit = (record, e) => {
    e.stopPropagation(); // prevent row click
    setEditData(record.rawData); // pass full building object
    setIsBuildingModalVisible(true);
  };

  const handleDelete = (record, e) => {
    e.stopPropagation(); // prevent row click
    deleteBuilding(record.key);
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
        <div onClick={(e) => e.stopPropagation()}>
          <Button
            icon={<EditOutlined />}
            type="link"
            style={{ color: "#7b3e82" }}
            onClick={(e) => handleEdit(record, e)}
          />
          <Popconfirm
            title="Are you sure to delete this building?"
            onConfirm={(e) => handleDelete(record, e)}
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
    <Content>
      <div className="flex justify-between items-center mb-4">
        <Search
          placeholder="Search"
          allowClear
          style={{
            width: 300,
            marginBottom: "20px",
            borderColor: "#4b244a",
          }}
        />
        <div className="flex gap-2">
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setEditData(null); // Clear previous data
              setIsBuildingModalVisible(true);
            }}
          >
            Add Building
          </Button>
        </div>
      </div>

      <Table
        dataSource={buildings}
        columns={columns}
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />

      <AddBuildingModal
        visible={isBuildingModalVisible}
        onClose={() => {
          setIsBuildingModalVisible(false);
          setEditData(null);
        }}
        editData={editData}
        refreshData={fetchBuildings} // refresh after add/edit
      />
    </Content>
  );
};

export default ViewBuildings;
