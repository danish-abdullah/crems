import React from "react";
import { Layout, Card, Row, Col } from "antd";
import { Line } from "react-chartjs-2";
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

const { Content } = Layout;

const SalesDashboard = () => {
  // Mock data for graphs

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

  const conversionRates = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Conversion Rate (%)",
        data: [15, 20, 18, 25, 22, 19], // Example conversion rates
        borderColor: "#4b244a",
        backgroundColor: "rgba(75, 36, 74, 0.2)",
      },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Salesman1" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Sales Dashboard" />
        <Content style={{ margin: "10px", padding: "10px", background: "#f0f2f5" }}>
          <Row gutter={[16, 16]}>
            {/* Card 1: Total Visitors */}
            <Col span={12}>
              <Card
                title="Total Visitors"
                bordered={false}
                style={{ backgroundColor: "#f6f0f7", color: "#4b244a" }}
              >
                <Line data={visitorsHistory} />
              </Card>
            </Col>

            {/* Card 2: Visitor-to-Tenant Conversion Rates */}
            <Col span={12}>
              <Card
                title="Visitor-to-Tenant Conversion Rates"
                bordered={false}
                style={{ backgroundColor: "#f6f0f7", color: "#4b244a" }}
              >
                <Bar data={conversionRates} />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SalesDashboard;
