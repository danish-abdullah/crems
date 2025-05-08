import React, { useEffect, useState } from "react";
import { Layout, Input, Table, Button, Tag } from "antd";
import "../../../App.css";
import Sidebar from "../../../components/TenantSidebar.js";
import TitleHeader from "../../../components/TitleHeader.js";
import SearchBar from "../../../components/SearchBar.js";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import ComplaintModal from "../../../components/tenant/ComplaintModal.js";
const { Content } = Layout;
const { Search } = Input;

const ViewComplaints = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editComplaint, setEditComplaint] = useState(null);
    const [data] = useState([
    {
      key: "1",
      id: "C001",
      description: "Water leakage in the bathroom.",
      status: "Pending",
      category: "Rent Increase"
    },
    {
      key: "2",
      id: "C002",
      description: "Elevator not working.",
      status: "WIP",
      category: "Property Condition"
    },
  ]);

  const handleEdit = (record) => {
    setEditComplaint(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
        title: "Complain #",
        dataIndex: "id",
        key: "Id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "volcano";
        if (status === "Resolved") color = "green";
        if (status === "WIP") color = "yellow";
        return <Tag color={color}>{status}</Tag>;
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
          <Button icon={<EditOutlined />} type="link" onClick={() => handleEdit(record)}>
          </Button>
        ),
      }
  ];

  useEffect(() => {
    setFilteredData(data);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar username="Tenant1" selectedTab={"viewComplaints"} />

      <Layout>
        <TitleHeader title="View Complaints" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
        <div className="flex justify-between items-center mb-4">
        <SearchBar
            data={data}
            fieldsToSearch={["Id", "description", "status"]}
            onFilteredData={setFilteredData}
          />
          <div className="flex gap-2">
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
          </div>
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 5 }}
            style={{ marginTop: "20px" }}
          />
          {isModalVisible && (
            <ComplaintModal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                complaint={editComplaint}
            />
            )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewComplaints;