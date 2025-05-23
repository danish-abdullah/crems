import React, { useEffect, useState } from "react";
import { Layout, Card, message } from "antd";
import { Bar } from "react-chartjs-2";
import Sidebar from "../../components/VisitorSidebar";
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

const VisitorDashboard = () => {
  const [monthlyVisitors, setMonthlyVisitors] = useState([]);
  const currentMonth = new Date().toLocaleString("default", { month: "short" });

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
        const data = await response.json();
        if (data.success) {
          setMonthlyVisitors(data.data.monthly_visitors || []);
        } else {
          message.error("Failed to fetch visitor dashboard data.");
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        message.error("Error fetching dashboard data.");
      }
    };

    fetchDashboardData();
  }, []);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const visitorMap = Object.fromEntries(
    monthlyVisitors.map((item) => [item.month, item.count])
  );

  const values = months.map((month) => visitorMap[month] || 0);

  const backgroundColors = months.map((month) =>
    month === currentMonth ? "rgba(164, 22, 26, 0.4)" : "rgba(164, 22, 26, 0.2)"
  );

  const hoverColors = months.map(() => "#a4161a");

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Visitors",
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
          label: (ctx) => ` ${ctx.parsed.y} visitors`,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Receptionist" selectedTab="dashboard" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Visitor Dashboard" />
        <div style={{ padding: 24 }}>
          <Card style={{ borderRadius: 8 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
                alignItems: "center",
              }}
            >
              <h3 style={{ margin: 0 }}>Total Visitors</h3>
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

export default VisitorDashboard;
