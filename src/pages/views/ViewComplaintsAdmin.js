import React, { useState } from "react";
import { Layout, Typography, Input, Table, Tooltip, Tag, message, Button } from "antd";
import { Dropdown, Menu, Modal} from "antd";
import { CheckCircleOutlined, ToolOutlined, FileOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const ViewComplaints = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [maintenanceUsers, setMaintenanceUsers] = useState([
    { id: "M001", name: "John Doe" },
    { id: "M002", name: "Jane Smith" },
  ]);
  const [selectedMaintenanceUser, setSelectedMaintenanceUser] = useState(null);
  const [data, setData] = useState([
    {
      key: "1",
      Id: "C001",
      buildingName: "Sunset Apartments",
      flatNo: "A-101",
      description: "Water leakage in the bathroom.",
      status: "Pending",
      attachment: "https://example.com/files/water-leakage-photo.jpg", // File URL
    },
    {
      key: "2",
      Id: "C002",
      buildingName: "Emerald Heights",
      flatNo: "B-202",
      description: "Elevator not working.",
      status: "Sent to Maintenance",
      attachment: null, // No file attachment
    },
  ]);

  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.Id.toLowerCase().includes(searchText.toLowerCase()) ||
      item.buildingName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.flatNo.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      item.status.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSendToMaintenance = (key, assignedUserName) => {
    const updatedData = data.map((item) =>
      item.key === key
        ? { ...item, status: "Sent to Maintenance", assignedTo: assignedUserName }
        : item
    );
    setData(updatedData);
    message.success(`Request sent to ${assignedUserName}`);
  };

  const handleMarkResolved = (key) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, status: "Resolved" } : item
    );
    setData(updatedData);
    message.success("Request marked as resolved.");
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
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "volcano";
        if (status === "Resolved") color = "green";
        if (status === "Sent to Maintenance") color = "blue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    // {
    //   title: "Attachment",
    //   key: "attachment",
    //   render: (_, record) =>
    //     record.attachment ? (
    //       <a href={record.attachment} target="_blank" rel="noopener noreferrer">
    //         <Tooltip title="View Attachment">
    //           <Button
    //             type="link"
    //             icon={<FileOutlined />}
    //             style={{ color: "#4b244a" }}
    //           >
    //             View File
    //           </Button>
    //         </Tooltip>
    //       </a>
    //     ) : (
    //       <span>No Attachment</span>
    //     ),
    // },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const maintenanceMenu = (
          <Menu
            onClick={({ key }) => {
              handleSendToMaintenance(record.key, key);
            }}
          >
            {maintenanceUsers.map((user) => (
              <Menu.Item key={user.key}>{user.name}</Menu.Item>
            ))}
          </Menu>
        );
    
        const isPending = record.status === "Pending";
        const isSent = record.status === "Sent to Maintenance";
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            {/* Mark as Resolved */}
            <Tooltip title="Mark as Resolved">
              <CheckCircleOutlined
                style={{
                  fontSize: "20px",
                  color: isPending || isSent ? "green" : "gray",
                  cursor: isPending || isSent ? "pointer" : "not-allowed",
                }}
                onClick={() =>
                  isPending || isSent && handleMarkResolved(record.key)
                }
              />
            </Tooltip>
    
            {/* Send to Maintenance with conditional dropdown */}
            {isPending ? (
              <Dropdown overlay={maintenanceMenu} trigger={["hover"]}>
                <Tooltip title="Send to Maintenance">
                  <ToolOutlined
                    style={{
                      fontSize: "20px",
                      color: "#4b244a",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </Dropdown>
            ) : (
              <Tooltip title="Send to Maintenance">
                <ToolOutlined
                  style={{
                    fontSize: "20px",
                    color: "gray",
                    cursor: "not-allowed",
                  }}
                />
              </Tooltip>
            )}
          </div>
        );
      },
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar username="Admin" selectedTab="viewComplaints" />

      <Layout>
        <TitleHeader title="View Complaints" />
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
              onClick: (event) => {
                // Prevent modal open if clicking an action button
                const tagName = event.target.tagName.toLowerCase();
                const className = event.target.className;
                const isAction = tagName === "svg" || tagName === "path" || className.includes("anticon");

                if (!isAction) {
                  setSelectedComplaint(record);
                  setIsModalVisible(true);
                }
              },
            })}
          />
          
          {selectedComplaint && (
            <Modal
            title={`Complaint #${selectedComplaint?.Id}`}
            open={isModalVisible}
            onCancel={() => {
              setIsModalVisible(false);
              setSelectedMaintenanceUser(null);
            }}
            footer={[
              selectedComplaint?.status !== "Resolved" && selectedComplaint?.status !== "Sent to Maintenance" && (
                <span key="send-maintenance-group" style={{   margin: "8px" }}>
                  <select
                    style={{
                      padding: "6px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      minWidth: "200px",
                    }}
                    value={selectedMaintenanceUser || ""}
                    onChange={(e) => setSelectedMaintenanceUser(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Maintenance User
                    </option>
                    {maintenanceUsers.map((user) => (
                      <option key={user.id} value={user.name}>
                        {user.name}
                      </option>
                    ))}
                  </select>
          
                  <Button
                    key="sendToMaintenance"
                    style={{ backgroundColor: "#ffc0cb", marginLeft: "8px", borderColor: "#ffc0cb", color: "#000" }}
                    onClick={() => {
                      if (!selectedMaintenanceUser) {
                        message.warning("Please select a maintenance user.");
                        return;
                      }
                      handleSendToMaintenance(selectedComplaint.key, selectedMaintenanceUser);
                      setSelectedMaintenanceUser(null);
                      setIsModalVisible(false);
                    }}
                  >
                    Send to Maintenance
                  </Button>
                </span>
              ),
              selectedComplaint?.status !== "Resolved" && (
                <Button
                  key="resolve"
                  type="primary"
                  onClick={() => {
                    handleMarkResolved(selectedComplaint.key);
                    setIsModalVisible(false);
                  }}
                >
                  Mark as Resolved
                </Button>
              ),
              <Button key="close" onClick={() => setIsModalVisible(false)}>
                Close
              </Button>,
            ]}
            width={800} // Wider modal
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p><strong>Building:</strong> {selectedComplaint?.buildingName}</p>
              <p><strong>Flat No:</strong> {selectedComplaint?.flatNo}</p>
              <p><strong>Category:</strong> {selectedComplaint?.category || "N/A"}</p>
              <p><strong>Status:</strong> {selectedComplaint?.status}</p>
              {selectedComplaint?.assignedTo && (
                <p><strong>Assigned To:</strong> {selectedComplaint.assignedTo}</p>
              )}
              <p><strong>Description:</strong> {selectedComplaint?.description}</p>
              <p><strong>Attachment:</strong></p>
              {selectedComplaint?.attachment ? (
                <img
                  src={selectedComplaint.attachment}
                  alt="Attachment"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                    border: "1px solid #ccc",
                    padding: 10,
                  }}
                />
              ) : (
                <p>No attachment available.</p>
              )}
            </div>
          </Modal>          
          )}
          
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewComplaints;
