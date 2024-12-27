import React from "react";
import { Layout, Card, Row, Col } from "antd";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import Sidebar from "../../components/AdminSidebar";
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

const { Content } = Layout;

const AdminDashboard = () => {
  // Mock data for graphs
  const occupancyHistory = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Occupied Apartments",
        data: [75, 80, 85, 90, 88, 85],
        borderColor: "#4b244a",
        backgroundColor: "rgba(75, 36, 74, 0.2)",
      },
    ],
  };

  const rentHistory = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Rent Income (PKR)",
        data: [400000, 420000, 440000, 460000, 450000, 470000],
        borderColor: "#4b244a",
        backgroundColor: "rgba(75, 36, 74, 0.2)",
      },
    ],
  };

  const visitorsHistory = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Visitors",
        data: [120, 150, 140, 170, 160, 135],
        borderColor: "#4b244a",
        backgroundColor: "rgba(75, 36, 74, 0.2)",
      },
    ],
  };

  const complaintsData = {
    labels: ["Complaints", "Requests"],
    datasets: [
      {
        label: "Pending",
        data: [12, 8],
        backgroundColor: "rgba(255, 99, 132, 0.8)", // Red
      },
      {
        label: "Resolved",
        data: [20, 18],
        backgroundColor: "rgba(75, 192, 192, 0.8)", // Green
      },
      {
        label: "Sent to Maintenance",
        data: [0, 5],
        backgroundColor: "rgba(54, 162, 235, 0.8)", // Blue
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Admin" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Admin Dashboard" />
        <Content style={{ margin: "10px", padding: "10px", background: "#f0f2f5" }}>
          <Row gutter={[16, 16]}>
            {/* Card 1: Occupancy with Line Chart */}
            <Col span={12}>
              <Card
                title="Building & Apartment Occupancy"
                bordered={false}
                style={{ backgroundColor: "#f6f0f7", color: "#4b244a" }}
              >
                <Line data={occupancyHistory} />
              </Card>
            </Col>

            {/* Card 2: Expected Rent Income with Line Chart */}
            <Col span={12}>
              <Card
                title="Expected Rent Income"
                bordered={false}
                style={{ backgroundColor: "#f6f0f7", color: "#4b244a" }}
              >
                <Line data={rentHistory} />
              </Card>
            </Col>

            {/* Card 3: Visitors with Line Chart */}
            <Col span={12}>
              <Card
                title="Total Visitors This Month"
                bordered={false}
                style={{ backgroundColor: "#f6f0f7", color: "#4b244a" }}
              >
                <Line data={visitorsHistory} />
              </Card>
            </Col>

            {/* Card 4: Complaints and Maintenance Requests with Bar Chart */}
            <Col span={12}>
              <Card 
                title="Complaints and Maintenance Requests Overview"
                bordered={false}
                style={{ backgroundColor: "#f6f0f7" }}
                >
                <Bar data={complaintsData} options={barChartOptions} />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;