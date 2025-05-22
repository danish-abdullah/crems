import React, { useEffect, useState } from "react";
import { Layout, Input, Table, Button, Tag, message } from "antd";
import "../../../App.css";
import Sidebar from "../../../components/TenantSidebar.js";
import TitleHeader from "../../../components/TitleHeader.js";
import SearchBar from "../../../components/SearchBar.js";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import ComplaintModal from "../../../components/tenant/ComplaintModal.js";

const { Content } = Layout;

const ViewComplaints = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editComplaint, setEditComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);

  // ✅ Fetch complaints from API
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
        status: item.status == "new" ? "Pending" : item.status == "in-progress" ? "WIP" : item.status == "resolved" ? "Resolved" : item.status,
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

  const handleEdit = (record) => {
    setEditComplaint(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Complain #",
      dataIndex: "complain_no",
      key: "complain_no",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "black";
        if (status === "Resolved") color = "green";
        if (status === "WIP") color = "yellow";
        if (status === "Pending") color = "volcano";
        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      <Sidebar username="Tenant1" selectedTab={"viewComplaints"} />
      <Layout>
        <TitleHeader title="View Complaints" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <div className="flex justify-between items-center mb-4">
            <SearchBar
              data={complaints}
              fieldsToSearch={["id", "description", "status", "category"]}
              onFilteredData={setFilteredData}
            />
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => {
                setEditComplaint(null);
                setIsModalVisible(true);
              }}
            >
              New Complaint
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            pagination={{ pageSize: 5 }}
          />

          {isModalVisible && (
            <ComplaintModal
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              onSuccess={fetchComplaints}
              complaint={editComplaint}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewComplaints;
