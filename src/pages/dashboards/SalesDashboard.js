import React from "react";
import { Layout, Card, Row, Col, Select } from "antd";
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

const { Option } = Select;

const SalesDashboard = () => {
  const newVisitors = 3615;
  const pending = 15;
  const inProgress = 268;
  const followUps = 269;
  const currentMonth = "Sep";

  const monthlyData = {
    Jan: 10,
    Feb: 11,
    Mar: 8,
    Apr: 9,
    May: 5,
    Jun: 3,
    Jul: 4,
    Aug: 6,
    Sep: 12,
    Oct: 6,
    Nov: 9,
    Dec: 4,
  };

  const months = Object.keys(monthlyData);
  const values = Object.values(monthlyData);

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
      {/* Sidebar */}
      <Sidebar username="Salesman1" selectedTab="dashboard" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Sales Dashboard" />
        <div style={{ padding: 24 }}>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card style={{ borderRadius: 8 }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{newVisitors}</div>
            <div style={{ color: "#a4161a", fontWeight: 500 }}>New Visitors</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderRadius: 8 }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{followUps}</div>
            <div style={{ color: "#a4161a", fontWeight: 500 }}>Follow-ups</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderRadius: 8 }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{inProgress}</div>
            <div style={{ color: "#a4161a", fontWeight: 500 }}>In Progress</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderRadius: 8 }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{pending}</div>
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