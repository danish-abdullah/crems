import React from "react";
import { Layout, Card } from "antd";
import "../../App.css";
import SuperAdminSidebar from "../../components/SuperAdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import { FaBuilding, FaUsers, FaHome, FaExclamationCircle, FaUserCheck, FaHandshake } from "react-icons/fa";

const { Content } = Layout;

const stats = [
  { title: "Total Real Estates", icon: <FaHome size={24} />, value: 320, change: 20, lastMonth: 1050, positive: true },
  { title: "Total Buildings", icon: <FaBuilding size={24} />, value: 320, change: 20, lastMonth: 1050, positive: true },
  { title: "Total Tenants", icon: <FaUsers size={24} />, value: 320, change: 20, lastMonth: 1050, positive: false },
  { title: "Total Visitors", icon: <FaUserCheck size={24} />, value: 320, change: 20, lastMonth: 1050, positive: true },
  { title: "Total Complaints", icon: <FaExclamationCircle size={24} />, value: 320, change: 20, lastMonth: 1050, positive: false },
  { title: "Total Sales Follow-ups", icon: <FaHandshake size={24} />, value: 320, change: 20, lastMonth: 1050, positive: true },
];

const SuperAdminDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <SuperAdminSidebar selectedTab="viewDashboard"/>

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Super Admin Dashboard" />
        <Content style={{ padding: "20px", background: "#f8f9fa" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4 rounded-xl shadow-lg bg-white flex flex-col">
                <div className="flex items-center gap-2 text-gray-700 text-lg font-semibold">
                  {stat.icon} {stat.title}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <span className="flex items-center gap-2 text-sm mt-1">
                    {stat.positive ? (
                      <span className="text-green-500 flex items-center" style={{backgroundColor: "#d8ffe7", padding: "3px", borderRadius: "10px"}}>
                        <FontAwesomeIcon icon={faArrowTrendUp} style={{color: "#22c55e", marginRight: "5px"}} /> {stat.change}%
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center" style={{backgroundColor: "#fae4e4", padding: "3px", borderRadius: "10px"}}>
                        <FontAwesomeIcon icon={faArrowTrendDown} style={{color: "#ef4444", marginRight: "5px"}} /> {stat.change}%
                      </span>
                    )}
                    <span className="text-gray-500">Last month total {stat.lastMonth}</span>
                  
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SuperAdminDashboard;
