import React, { useEffect, useState } from "react";
import { Layout, Card, Row, Col, message } from "antd";
import { Bar } from "react-chartjs-2";
import Sidebar from "../../components/MaintenanceSidebar";
import TitleHeader from "../../components/TitleHeader";
import "../../App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MaintenanceDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    new_complaints: 0,
    progress_complaints: 0,
    resolved_complaints: 0,
    monthly_complaints: [],
  });

  const currentMonth = new Date().toLocaleString("default", { month: "short" });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(
          "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/dashboard",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          setDashboardData(data.data);
        } else {
          message.error("Failed to fetch dashboard data.");
        }
      } catch (error) {
        console.error("Dashboard API error:", error);
        message.error("Something went wrong while loading the dashboard.");
      }
    };

    fetchDashboardData();
  }, []);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const monthlyCountsMap = Object.fromEntries(
    dashboardData.monthly_complaints?.map((m) => [m.month, m.count]) || []
  );

  const values = months.map((month) => monthlyCountsMap[month] || 0);

  const backgroundColors = months.map((month) =>
    month === currentMonth ? "rgba(164, 22, 26, 0.4)" : "rgba(164, 22, 26, 0.2)"
  );

  const hoverColors = months.map(() => "#a4161a");

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Complaints",
        data: values,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverColors,
        borderRadius: 4,
        barThickness: 30,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#999",
        },
        grid: {
          color: "#eee",
        },
      },
      x: {
        ticks: {
          color: "#555",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: "#a4161a",
        titleColor: "#fff",
        bodyColor: "#fff",
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y} complaints`,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar username="Plumber" selectedTab="dashboard" />
      <Layout>
        <TitleHeader title="Maintenance Dashboard" />
        <div style={{ padding: 24 }}>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={8}>
              <Card style={{ borderRadius: 8 }}>
                <div style={{ fontSize: 28, fontWeight: 600 }}>
                  {dashboardData.new_complaints + dashboardData.progress_complaints}
                </div>
                <div style={{ color: "#a4161a", fontWeight: 500 }}>Pending</div>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ borderRadius: 8 }}>
                <div style={{ fontSize: 28, fontWeight: 600 }}>
                  {dashboardData.resolved_complaints}
                </div>
                <div style={{ color: "#a4161a", fontWeight: 500 }}>Resolved</div>
              </Card>
            </Col>
          </Row>

          <Card style={{ borderRadius: 8 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
                alignItems: "center",
              }}
            >
              <h3 style={{ margin: 0 }}>Total Complaints</h3>
            </div>
            <div style={{ height: 240 }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </Card>
        </div>
      </Layout>
    </Layout>
  );
};

export default MaintenanceDashboard;
