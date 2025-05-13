import React from "react";
import { Layout, Card, Row, Col, Select } from "antd";
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

const { Option } = Select;

const MaintenanceDashboard = () => {
  const totalComplaints = 3615;
  const pending = 15;
  const resolved = 268;
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
      {/* Sidebar */}
      <Sidebar username="Plumber" selectedTab="dashboard" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Maintenance Dashboard" />
        <div style={{ padding: 24 }}>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card style={{ borderRadius: 8 }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{totalComplaints}</div>
            <div style={{ color: "#a4161a", fontWeight: 500 }}>New Complaints</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ borderRadius: 8 }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{pending}</div>
            <div style={{ color: "#a4161a", fontWeight: 500 }}>Pending</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ borderRadius: 8 }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{resolved}</div>
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
          <Select defaultValue="Monthly" style={{ width: 120 }}>
            <Option value="Monthly">Monthly</Option>
            <Option value="Weekly" disabled>Weekly</Option>
          </Select>
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