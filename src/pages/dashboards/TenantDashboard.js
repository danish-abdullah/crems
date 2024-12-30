import React from "react";
import { Layout, Table, Card, Row, Col } from "antd";
import Sidebar from "../../components/TenantSidebar";
import TitleHeader from "../../components/TitleHeader";
import "../../App.css";

const { Content } = Layout;

const TenantDashboard = () => {
  // Mock data for tables
  const rentStatusData = [
    {
      key: "1",
      month: "January",
      amountDue: "20,000",
      dueDate: "2024-01-10",
      status: "Paid",
    },
    {
      key: "2",
      month: "February",
      amountDue: "20,000",
      dueDate: "2024-02-10",
      status: "Pending",
    },
    {
      key: "3",
      month: "March",
      amountDue: "20,000",
      dueDate: "2024-03-10",
      status: "Pending",
    },
  ];

  const complaintsData = [
    {
      key: "1",
      complaintID: "C102",
      description: "Noisy neighbors on floor 3",
      status: "Pending",
      dateSubmitted: "2024-01-15",
    },
  ];

  const maintenanceRequestsData = [
    {
      key: "1",
      requestID: "M201",
      description: "Replace broken light in bedroom",
      status: "In Progress",
      dateSubmitted: "2024-01-20",
    },
    {
      key: "2",
      requestID: "M202",
      description: "AC maintenance request",
      status: "Resolved",
      dateSubmitted: "2024-01-10",
    },
  ];

  // Table columns
  const rentColumns = [
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Amount Due",
      dataIndex: "amountDue",
      key: "amountDue",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "Paid" ? "green" : "red" }}>
          {status}
        </span>
      ),
    },
  ];

  const complaintsColumns = [
    {
      title: "Complaint ID",
      dataIndex: "complaintID",
      key: "complaintID",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "Resolved" ? "green" : "orange" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Date Submitted",
      dataIndex: "dateSubmitted",
      key: "dateSubmitted",
    },
  ];

  const maintenanceColumns = [
    {
      title: "Request ID",
      dataIndex: "requestID",
      key: "requestID",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{
            color: status === "Resolved"
              ? "green"
              : status === "In Progress"
              ? "blue"
              : "red",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Date Submitted",
      dataIndex: "dateSubmitted",
      key: "dateSubmitted",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Tenant1" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Tenant Dashboard" />
        <Content style={{ margin: "10px", padding: "10px", background: "#f0f2f5" }}>
          <Row gutter={[16, 16]}>
            {/* Rent Status Table */}
            <Col span={24}>
              <Card
                title="Rent Status"
                bordered={false}
                style={{ backgroundColor: "#f6f0f7", color: "#4b244a" }}
              >
                <Table
                  dataSource={rentStatusData}
                  columns={rentColumns}
                  pagination={{ pageSize: 5 }}
                />
              </Card>
            </Col>

            {/* Complaints Overview Table */}
            <Col span={24}>
              <Card
                title="Complaints Overview"
                bordered={false}
                style={{ backgroundColor: "#f6f0f7", color: "#4b244a" }}
              >
                <Table
                  dataSource={complaintsData}
                  columns={complaintsColumns}
                  pagination={{ pageSize: 5 }}
                />
              </Card>
            </Col>

            {/* Maintenance Requests Overview Table */}
            <Col span={24}>
              <Card
                title="Maintenance Requests Overview"
                bordered={false}
                style={{ backgroundColor: "#f6f0f7", color: "#4b244a" }}
              >
                <Table
                  dataSource={maintenanceRequestsData}
                  columns={maintenanceColumns}
                  pagination={{ pageSize: 5 }}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TenantDashboard;
