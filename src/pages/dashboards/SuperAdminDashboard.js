import React, { useEffect, useState } from "react";
import { Layout, Card } from "antd";
import "../../App.css";
import SuperAdminSidebar from "../../components/SuperAdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import { FaBuilding, FaUsers, FaHome, FaExclamationCircle, FaUserCheck, FaHandshake } from "react-icons/fa";

const { Content } = Layout;

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState([]);

  const calculateChange = (current, last) => {
    if (last === 0) return 0;
    return Number((((current - last) / last) * 100).toFixed(2));
  };

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
              title: "Total Real Estates",
              icon: <FaHome size={24} />,
              value: d.total_real_estates.count,
              change: calculateChange(d.total_real_estates.count, d.total_real_estates.last_month_total),
              lastMonth: d.total_real_estates.last_month_total,
              positive: d.total_real_estates.count >= d.total_real_estates.last_month_total,
            },
            {
              title: "Total Buildings",
              icon: <FaBuilding size={24} />,
              value: d.total_buildings.count,
              change: calculateChange(d.total_buildings.count, d.total_buildings.last_month_total),
              lastMonth: d.total_buildings.last_month_total,
              positive: d.total_buildings.count >= d.total_buildings.last_month_total,
            },
            {
              title: "Total Apartments",
              icon: <FaHome size={24} />,
              value: d.total_apartments.count,
              change: calculateChange(d.total_apartments.count, d.total_apartments.last_month_total),
              lastMonth: d.total_apartments.last_month_total,
              positive: d.total_apartments.count >= d.total_apartments.last_month_total,
            },
            {
              title: "Total Tenants",
              icon: <FaUsers size={24} />,
              value: d.total_tenants.count,
              change: calculateChange(d.total_tenants.count, d.total_tenants.last_month_total),
              lastMonth: d.total_tenants.last_month_total,
              positive: d.total_tenants.count >= d.total_tenants.last_month_total,
            },
            {
              title: "Total Visitors",
              icon: <FaUserCheck size={24} />,
              value: d.total_visitors.count,
              change: calculateChange(d.total_visitors.count, d.total_visitors.last_month_total),
              lastMonth: d.total_visitors.last_month_total,
              positive: d.total_visitors.count >= d.total_visitors.last_month_total,
            },
            {
              title: "Total Complaints",
              icon: <FaExclamationCircle size={24} />,
              value: d.total_complaints.count,
              change: calculateChange(d.total_complaints.count, d.total_complaints.last_month_total),
              lastMonth: d.total_complaints.last_month_total,
              positive: d.total_complaints.count <= d.total_complaints.last_month_total,
            },
            {
              title: "Total Sales Follow-ups",
              icon: <FaHandshake size={24} />,
              value: d.total_sales_followups.count,
              change: calculateChange(d.total_sales_followups.count, d.total_sales_followups.last_month_total),
              lastMonth: d.total_sales_followups.last_month_total,
              positive: d.total_sales_followups.count >= d.total_sales_followups.last_month_total,
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
      {/* Sidebar */}
      <SuperAdminSidebar selectedTab="viewDashboard" />

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
                      <span className="text-green-500 flex items-center" style={{ backgroundColor: "#d8ffe7", padding: "3px", borderRadius: "10px" }}>
                        <FontAwesomeIcon icon={faArrowTrendUp} style={{ color: "#22c55e", marginRight: "5px" }} /> {stat.change}%
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center" style={{ backgroundColor: "#fae4e4", padding: "3px", borderRadius: "10px" }}>
                        <FontAwesomeIcon icon={faArrowTrendDown} style={{ color: "#ef4444", marginRight: "5px" }} /> {stat.change}%
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
