import React, { useEffect, useState } from "react";
import { Layout, Card } from "antd";
import Sidebar from "../../components/AdminSidebar";
import TitleHeader from "../../components/TitleHeader";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import { FaBuilding, FaUsers, FaExclamationCircle } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

const { Content } = Layout;

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { title: "Total Buildings", icon: <FaBuilding size={24} />, value: 0, change: 0, lastMonth: 0, positive: true },
    { title: "Total Apartments", icon: <FaHouse size={24} />, value: 0, change: 0, lastMonth: 0, positive: true },
    { title: "Total Tenants", icon: <FaUsers size={24} />, value: 0, change: 0, lastMonth: 0, positive: true },
    { title: "Total Complaints", icon: <FaExclamationCircle size={24} />, value: 0, change: 0, lastMonth: 0, positive: true },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/dashboard",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          const d = result.data;

          setStats([
            {
              title: "Total Buildings",
              icon: <FaBuilding size={24} />,
              value: d.total_buildings.count,
              change: d.total_buildings.change,
              lastMonth: d.total_buildings.last_month_total,
              positive: d.total_buildings.change >= 0,
            },
            {
              title: "Total Apartments",
              icon: <FaHouse size={24} />,
              value: d.total_apartments.count,
              change: d.total_apartments.change,
              lastMonth: d.total_apartments.last_month_total,
              positive: d.total_apartments.change >= 0,
            },
            {
              title: "Total Tenants",
              icon: <FaUsers size={24} />,
              value: d.total_tenants.count,
              change: d.total_tenants.change,
              lastMonth: d.total_tenants.last_month_total,
              positive: d.total_tenants.change >= 0,
            },
            {
              title: "Total Complaints",
              icon: <FaExclamationCircle size={24} />,
              value: d.total_complaints.count,
              change: d.total_complaints.change,
              lastMonth: d.total_complaints.last_month_total,
              positive: d.total_complaints.change >= 0,
            },
          ]);
        } else {
          console.error("Failed to fetch admin dashboard data.");
        }
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar username="Admin" selectedTab="adminDashboard" />

      <Layout>
        <TitleHeader title="Admin Dashboard" />
        <Content style={{ padding: "20px", background: "#f8f9fa" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4 rounded-xl shadow-lg bg-white flex flex-col">
                <div className="flex items-center gap-2 text-gray-700 text-lg font-semibold">
                  {stat.icon} {stat.title}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <span className="flex items-center gap-2 text-sm mt-1">
                    {stat.positive ? (
                      <span className="text-green-500 flex items-center" style={{ backgroundColor: "#d8ffe7", padding: "3px", borderRadius: "10px" }}>
                        <FontAwesomeIcon icon={faArrowTrendUp} style={{ color: "#22c55e", marginRight: "5px" }} />
                        {stat.change}%
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center" style={{ backgroundColor: "#fae4e4", padding: "3px", borderRadius: "10px" }}>
                        <FontAwesomeIcon icon={faArrowTrendDown} style={{ color: "#ef4444", marginRight: "5px" }} />
                        {Math.abs(stat.change)}%
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

export default AdminDashboard;
