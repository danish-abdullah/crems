import React, { useEffect, useState } from "react";
import {
  Layout,
  Table,
  Input,
  Button,
  message,
  Popconfirm,
  Spin,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "../../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import AddBuildingModal from "../forms/AddBuilding";
import SearchBar from "../../components/SearchBar";

const { Content } = Layout;
const { Search } = Input;

const ViewBuildings = ({ realEstateID, isSuperAdmin }) => {
  const [buildings, setBuildings] = useState([]);
  const [isBuildingModalVisible, setIsBuildingModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false); // 👈 Loader state
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredData, setFilteredData] = useState([]);

  const fetchBuildings = async () => {
    const token = localStorage.getItem("access_token");
    setLoading(true); // 👈 Start loading
    try {
      const response = await fetch(
        `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/buildings?real_estate_id=${realEstateID}`,
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
        setFilteredData(formattedData); // Update filteredData as well
      } else {
        console.error("Unexpected data structure:", result);
      }
    } catch (error) {
      console.error("Error fetching buildings:", error);
      message.error("Failed to load buildings.");
    } finally {
      setLoading(false); // 👈 End loading
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  const handleRowClick = (record) => {
    const path = isSuperAdmin ? "/building-detail-sa" : "/building-detail-admin";
    navigate(path, {
      state: {
        ...record,
        dateAdded: "12-12-2024",
        tenants: 12,
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
        setFilteredData((prev) => prev.filter((b) => b.key !== id)); // Remove from filteredData too
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
    e.stopPropagation();
    setEditData(record.rawData);
    setIsBuildingModalVisible(true);
  };

  const handleDelete = (record, e) => {
    e.stopPropagation();
    deleteBuilding(record.key);
  };

  const columns = [
    {
      title: "Building Name",
      dataIndex: "building",
      key: "building",
    },
    {
      title: "Building ID",
      dataIndex: "key",
      key: "key",
      visible: false,
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

  const visibleColumns = columns.filter((col) => col.visible !== false);

  return (
    <Content>
      <Spin spinning={loading} size="large">
        <div className="flex justify-between items-center mb-4">
          <SearchBar
            data={buildings}
            fieldsToSearch={["building", "address"]}
            onFilteredData={setFilteredData}
          />
          <div className="flex gap-2">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => {
                setEditData(null);
                setIsBuildingModalVisible(true);
              }}
            >
              Add Building
            </Button>
          </div>
        </div>

        <Table
          dataSource={filteredData}
          columns={visibleColumns}
          pagination={{ pageSize: 5 }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </Spin>

      <AddBuildingModal
        visible={isBuildingModalVisible}
        onClose={() => {
          setIsBuildingModalVisible(false);
          setEditData(null);
        }}
        editData={editData}
        realEstateID={realEstateID}
        refreshData={fetchBuildings}
      />
    </Content>
  );
};

export default ViewBuildings;
