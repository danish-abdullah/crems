import React, { useEffect, useState } from "react";
import { Layout, Card, Row, Col, message } from "antd";
import { Bar } from "react-chartjs-2";
import Sidebar from "../../components/SalesSidebar";
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

const SalesDashboard = () => {
  const [data, setData] = useState({
    new_visitors: 0,
    follow_ups: 0,
    in_progress: 0,
    pending: 0,
    monthly_visitors: [],
  });

  const currentMonth = new Date().toLocaleString("default", { month: "short" });

  useEffect(() => {
    const fetchData = async () => {
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

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          message.error("Failed to load dashboard data.");
        }
      } catch (error) {
        console.error(error);
        message.error("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, []);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const values = months.map((month) => {
    const record = data.monthly_visitors.find((m) => m.month === month);
    return record ? record.count : 0;
  });

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
          stepSize: 2,
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
      <Sidebar username="Salesman1" selectedTab="dashboard" />
      <Layout>
        <TitleHeader title="Sales Dashboard" />
        <div style={{ padding: 24 }}>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card style={{ borderRadius: 8 }}>
                <div style={{ fontSize: 28, fontWeight: 600 }}>{data.new_visitors}</div>
                <div style={{ color: "#a4161a", fontWeight: 500 }}>New Visitors</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ borderRadius: 8 }}>
                <div style={{ fontSize: 28, fontWeight: 600 }}>{data.follow_ups}</div>
                <div style={{ color: "#a4161a", fontWeight: 500 }}>Follow-ups</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ borderRadius: 8 }}>
                <div style={{ fontSize: 28, fontWeight: 600 }}>{data.in_progress}</div>
                <div style={{ color: "#a4161a", fontWeight: 500 }}>In Progress</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ borderRadius: 8 }}>
                <div style={{ fontSize: 28, fontWeight: 600 }}>{data.pending}</div>
                <div style={{ color: "#a4161a", fontWeight: 500 }}>Pending</div>
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

export default SalesDashboard;
