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
  
  
  // Function to get today's date in "YYYY-MM-DD" format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

  const [dataSource, setDataSource] = useState([]);
  
  const [tempdataSource, setTempDataSource] = useState([
    {
      key: 1,
      full_name: "John Doe",
      phone_no: "+971-1111111111",
      date: "2024-05-01",
      time: "10:00 AM",
      status: "Negotiating",
      result: "In Progress",
      comments: "Discussed pricing options.",
    },
    {
      key: 2,
      full_name: "Jane Smith",
      phone_no: "+971-2222222222",
      date: "2024-05-02",
      time: "11:30 AM",
      status: "Interested",
      result: "In Progress",
      comments: "Interested but wants to consult family.",
    },
    {
      key: 3,
      full_name: "Ali Khan",
      phone_no: "+971-3333333333",
      date: "2024-05-03",
      time: "2:00 PM",
      status: "Not Interested",
      result: "Failed",
      comments: "Found another place.",
    },
    {
      key: 4,
      full_name: "Sara Lee",
      phone_no: "+971-4444444444",
      date: "2024-05-04",
      time: "3:30 PM",
      status: "Negotiating",
      result: "In Progress",
      comments: "Negotiating on final rent.",
    },
    {
      key: 5,
      full_name: "John Doe",
      phone_no: "+971-1111111111",
      date: "2024-05-05",
      time: "1:00 PM",
      status: "Interested",
      result: "Successful",
      comments: "Deal closed successfully.",
    },
    {
      key: 6,
      full_name: "Jane Smith",
      phone_no: "+971-2222222222",
      date: "2024-05-06",
      time: "4:00 PM",
      status: "Interested",
      result: "In Progress",
      comments: "Asking about payment plans.",
    },
    {
      key: 7,
      full_name: "Carlos Mendez",
      phone_no: "+971-5555555555",
      date: "2024-05-07",
      time: "9:30 AM",
      status: "Not Interested",
      result: "Failed",
      comments: "Left the country.",
    },
    {
      key: 8,
      full_name: "Ali Khan",
      phone_no: "+971-3333333333",
      date: "2024-05-08",
      time: "11:00 AM",
      status: "Negotiating",
      result: "In Progress",
      comments: "Wants a discount.",
    },
    {
      key: 9,
      full_name: "Nora Allen",
      phone_no: "+971-6666666666",
      date: "2024-05-09",
      time: "2:45 PM",
      status: "Interested",
      result: "In Progress",
      comments: "Asked for site visit again.",
    },
    {
      key: 10,
      full_name: "Sara Lee",
      phone_no: "+971-4444444444",
      date: "2024-05-10",
      time: "3:15 PM",
      status: "Negotiating",
      result: "In Progress",
      comments: "Still reviewing offer.",
    },
    {
      key: 11,
      full_name: "John Doe",
      phone_no: "+971-1111111111",
      date: "2024-05-11",
      time: "12:00 PM",
      status: "Interested",
      result: "Successful",
      comments: "Confirmed apartment choice.",
    },
    {
      key: 12,
      full_name: "Carlos Mendez",
      phone_no: "+971-5555555555",
      date: "2024-05-12",
      time: "10:45 AM",
      status: "Negotiating",
      result: "In Progress",
      comments: "Negotiation in final stage.",
    },
    {
      key: 13,
      full_name: "Jane Smith",
      phone_no: "+971-2222222222",
      date: "2024-05-13",
      time: "1:15 PM",
      status: "Not Interested",
      result: "Failed",
      comments: "Too expensive.",
    },
    {
      key: 14,
      full_name: "Nora Allen",
      phone_no: "+971-6666666666",
      date: "2024-05-14",
      time: "4:30 PM",
      status: "Interested",
      result: "In Progress",
      comments: "Wants to move in next month.",
    },
    {
      key: 15,
      full_name: "Sara Lee",
      phone_no: "+971-4444444444",
      date: "2024-05-15",
      time: "9:00 AM",
      status: "Negotiating",
      result: "In Progress",
      comments: "Asking for multiple unit discount.",
    },
  ]);

  const handleRowClick = (record) => {
    const phone = record.phone_no;
    const matches = tempdataSource.filter(fu => fu.phone_no === phone);
    setSelectedFollowUp(record);
    setRelatedFollowUps(matches);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        const response = await axios.get("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/follow-ups");
        const formattedData = response.data.data.map((item) => ({
          key: item.id,
          full_name: item.visitor?.name || "N/A",
          phone_no: item.visitor?.phone_number || "N/A",
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
            data={tempdataSource}
            fieldsToSearch={["full_name", "status", "result"]}
            onFilteredData={setFilteredData}
            />
          <Table
            dataSource={tempdataSource}
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
            />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewFollowUps;
