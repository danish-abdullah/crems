import React, { useState } from "react";
import {
  Layout,
  Typography,
  Input,
  Table,
  Tooltip,
  Tag,
  message,
  Modal,
  Button,
} from "antd";
import {
  CheckCircleOutlined,
} from "@ant-design/icons";
import "../../../App.css";
import Sidebar from "../../../components/MaintenanceSidebar.js";
import TitleHeader from "../../../components/TitleHeader.js";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const ViewMaintenanceRequests = () => {
  const [data, setData] = useState([
    {
      key: "1",
      Id: "C001",
      buildingName: "Sunset Apartments",
      flatNo: "A-101",
      name: "John Doe",
      category: "Plumbing",
      description: "Water leakage in the bathroom.",
      status: "Pending",
      attachment: "https://example.com/files/water-leakage-photo.jpg",
    },
    {
      key: "2",
      Id: "C002",
      buildingName: "Emerald Heights",
      flatNo: "B-202",
      name: "Jane Smith",
      category: "Electrical",
      description: "Elevator not working.",
      status: "Resolved",
      attachment: null,
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleMarkResolved = (key) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, status: "Resolved" } : item
    );
    setData(updatedData);
    if (selectedRow && selectedRow.key === key) {
      setSelectedRow({ ...selectedRow, status: "Resolved" });
    }
    message.success("Request marked as resolved.");
  };

  const handleRowClick = (record) => {
    setSelectedRow(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Complain #",
      dataIndex: "Id",
      key: "Id",
    },
    {
      title: "Building Name",
      dataIndex: "buildingName",
      key: "buildingName",
    },
    {
      title: "Flat No",
      dataIndex: "flatNo",
      key: "flatNo",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Resolved" ? "green" : "volcano";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Tooltip title="Mark as Resolved">
          <CheckCircleOutlined
            onClick={(e) => {
              e.stopPropagation(); // prevent row click
              if (record.status === "Pending") handleMarkResolved(record.key);
            }}
            style={{
              fontSize: "20px",
              color: record.status === "Pending" ? "green" : "gray",
              cursor: record.status === "Pending" ? "pointer" : "not-allowed",
            }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar username="4Walls Works" selectedTab="viewComplaints" />
      <Layout>
        <TitleHeader title="Complaints" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Search
            placeholder="Search by ID, building, flat, or status"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ margin: "10px 0", width: "100%" }}
          />
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 5 }}
            style={{ marginTop: "20px" }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </Content>
      </Layout>

      {/* Modal */}
      <Modal
        title={`Complaint Details - ${selectedRow?.Id}`}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>,
          selectedRow?.status !== "Resolved" && (
            <Button
              key="resolve"
              type="primary"
              onClick={() => handleMarkResolved(selectedRow.key)}
            >
              Mark as Resolved
            </Button>
          ),
        ]}
      >
        {selectedRow && (
          <div>
            <p><b>Building:</b> {selectedRow.buildingName}</p>
            <p><b>Flat No:</b> {selectedRow.flatNo}</p>
            <p><b>Name:</b> {selectedRow.name}</p>
            <p><b>Category:</b> {selectedRow.category}</p>
            <p><b>Status:</b> <Tag color={selectedRow.status === "Resolved" ? "green" : "volcano"}>{selectedRow.status}</Tag></p>
            <p><b>Description:</b> {selectedRow.description}</p>
            {selectedRow.attachment ? (
              <div>
                <p><b>Attachment:</b></p>
                <img
                  src={selectedRow.attachment}
                  alt="Attachment"
                  style={{ width: "100%", maxHeight: 300, objectFit: "contain", border: "1px solid #ddd", padding: 5 }}
                />
              </div>
            ) : (
              <Text type="secondary">No attachment available.</Text>
            )}
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default ViewMaintenanceRequests;
