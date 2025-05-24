import React, { useState } from "react";
import { Layout, Table, Input, Button, Space, Tooltip, message, } from "antd";
import "../../../App.css";
import Sidebar from "../../../components/SalesSidebar.js";
import TitleHeader from "../../../components/TitleHeader.js";
import SearchBar from "../../../components/SearchBar.js";
import {
  SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined,
  UploadOutlined, DeleteOutlined,
  FundViewOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { Modal, Switch, Select, Form, DatePicker, TimePicker } from "antd";
import { useEffect } from "react";
import axios from "axios";
import FollowUpModal from "../../../components/sales/FollowUpModal.js";

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const ViewFollowUps = () => {
  // Sample data for visitors table
  const [visitors, setVisitors] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [followUpEnabled, setFollowUpEnabled] = useState(false);
  const [selectedFollowUp, setSelectedFollowUp] = useState(null);
  const [relatedFollowUps, setRelatedFollowUps] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [dataSource, setDataSource] = useState([]);
  
  const handleRowClick = (record) => {
    const phone = record.phone_no;
    const matches = dataSource.filter(fu => fu.phone_no === phone && fu.key != record.key);
    setSelectedFollowUp(record);
    setRelatedFollowUps(matches);
    setIsModalOpen(true);
  };
  
  const fetchFollowUps = async () => {
    try {
      const response = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/follow-ups",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const formattedData = data.data.map((item) => ({
        key: item.id,
        full_name: item.visitor?.full_name || "N/A",
        phone_no: item.visitor?.phone_no || "N/A",
        email: item.visitor?.email || "N/A",
        nationality: item.visitor?.nationality || "N/A",
        phone_no: item.visitor?.phone_no || "N/A",
        building_id: item.visitor?.building_id,
        apartment_id: item.visitor?.apartment_id,
        visitor_id: item.visitor?.id,
        date: item.follow_up_date,
        time: item.follow_up_time,
        status: item.conversation_status,
        result: item.deal_result,
        comments: item.comments,
      }));
      setDataSource(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      console.error("Failed to fetch follow-ups:", error);
      message.error("Failed to load follow-ups");
    }
  };

  useEffect(() => {
    fetchFollowUps();
  }, []);
  

  const columns = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Mobile No",
      dataIndex: "phone_no",
      key: "phone_no",
    },
    {
      title: "Follow Up Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
        title: "Follow Up Time",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "Conv. Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Deal Result",
        dataIndex: "result",
        key: "result",
      },
      {
        title: "Comments",
        dataIndex: "comments",
        key: "comments",
      },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Salesman1" selectedTab="followUps" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Follow-Ups" />
        <Content
          style={{ margin: "20px", padding: "20px", background: "white" }}
        >
         <SearchBar
            data={dataSource}
            fieldsToSearch={["full_name", "status", "result"]}
            onFilteredData={setFilteredData}
            />
          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={{ pageSize: 10 }}
            onRow={(record) => ({
                onClick: () => handleRowClick(record),
              })}
          />

        <FollowUpModal
            visible={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            data={selectedFollowUp}
            pastFollowUps={relatedFollowUps}
            refresh={() => fetchFollowUps()}
            />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewFollowUps;
