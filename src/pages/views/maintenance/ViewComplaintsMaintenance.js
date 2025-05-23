import React, { useEffect, useState } from "react";
import { Layout, Typography, Input, Table, Tooltip, Tag, message, Button } from "antd";
import { Dropdown, Menu, Modal} from "antd";
import { CheckCircleOutlined, ToolOutlined, FileOutlined } from "@ant-design/icons";
import "../../../App.css";
import Sidebar from "../../../components/MaintenanceSidebar.js";
import TitleHeader from "../../../components/TitleHeader.js";
import SearchBar from "../../../components/SearchBar.js";

const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const ViewComplaints = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
    const [complaints, setComplaints] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [apartments, setApartments] = useState([]);
  
  const fetchComplaints = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/complains", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const json = await res.json();
        const data = json?.data?.map((item, index) => ({
          key: item.complain_no,
          id: item.id,
          complain_no: item.complain_no,
          name: item.name,
          description: item.description,
          status: item.status == "in-progress" ? "Pending" : item.status == "resolved" ? "Resolved" : item.status,
          category: item.category,
          user_id: item.user_id,
          apartment_id: item.apartment_id,
          images: item.complain_images
        })) || [];
        console.log("Complaint data:", data);
        setComplaints(data);
        setFilteredData(data);
      } catch (err) {
        message.error("Failed to fetch complaints");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchComplaints();
    }, []);

     useEffect(() => {
        fetchBuildings();
        fetchApartments();
      }, []);
    
      const fetchBuildings = async () => {
        const res = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/buildings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const data = await res.json();
        setBuildings(data?.data || []);
      };
    
      const fetchApartments = async () => {
        const res = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/apartments",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const data = await res.json();
        setApartments(data?.data || []);
      };
 
  const handleMarkResolved = async (key) => {
    try {
          const formData = new FormData();
          formData.append("status", "resolved");
          formData.append("_method", "PATCH");
          const res = await fetch(
            `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/complains${`/${key}`}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
              body: formData,
            }
          );
      
          const result = await res.json();
          if (result.success) {
            message.success("Complaint resolved successfully");
            fetchComplaints();
          } else {
            message.error(result.message || "Failed to resolve complaint");
          }
        } catch (err) {
          console.error(err);
          message.error("Error resolving complaint");
        }
  };

  const columns = [
    {
      title: "Complain #",
      dataIndex: "complain_no",
      key: "complain_no",
    },
    {
      title: "Building Name",
      dataIndex: "apartment_id",
      key: "buildingName",
      render: (id) => buildings.find((b) => apartments.find((a) => a.id === id)?.building_id === b.id)?.building_name || "N/A",
    },
    {
      title: "Flat No",
      dataIndex: "apartment_id",
      key: "flatNo",
      render: (id) => apartments.find((a) => a.id === id)?.area || "N/A",
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
      render: (_, record) => {
        const isPending = record.status === "Pending";
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            {/* Mark as Resolved */}
            <Tooltip title="Mark as Resolved">
              <CheckCircleOutlined
                style={{
                  fontSize: "20px",
                  color: isPending  ? "green" : "gray",
                  cursor: isPending  ? "pointer" : "not-allowed",
                }}
                onClick={() =>
                  (isPending) && handleMarkResolved(record.id)
                }
              />
            </Tooltip>
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
        <SearchBar
              data={complaints}
              fieldsToSearch={["id", "description", "status", "category"]}
              onFilteredData={setFilteredData}
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
            title={`Complaint #${selectedComplaint?.complain_no}`}
            open={isModalVisible}
            onCancel={() => {
              setIsModalVisible(false);
            }}
            footer={[
              selectedComplaint?.status !== "Resolved" && (
                <Button
                  key="resolve"
                  type="primary"
                  onClick={() => {
                    handleMarkResolved(selectedComplaint.id);
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
            <p>
              <strong>Building Name:</strong>{" "}
              {
                buildings.find(
                  (b) =>
                    b.id === apartments.find((a) => a.id === selectedComplaint.apartment_id)?.building_id
                )?.building_name || "N/A"
              }
            </p>

            <p>
              <strong>Flat No:</strong>{" "}
              {
                apartments.find((a) => a.id === selectedComplaint.apartment_id)?.area || "N/A"
              }
            </p>
              <p><strong>Category:</strong> {selectedComplaint?.category || "N/A"}</p>
              <p><strong>Status:</strong> {selectedComplaint?.status}</p>
              <p><strong>Description:</strong> {selectedComplaint?.description}</p>
              <p><strong>Attachment:</strong></p>
              {selectedComplaint?.images.length > 0 ? (
                <img
                  src={selectedComplaint.images}
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
