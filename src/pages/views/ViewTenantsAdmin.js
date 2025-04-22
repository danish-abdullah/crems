import React, { useState, useEffect } from "react";
import { Layout, Table, Input, Button, message, Popconfirm, Modal, Form, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";
import ViewTenants from "./ViewTenants.js";

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const ViewTenantsList = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Admin" selectedTab="viewTenantsList" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="View Tenants" />
        <ViewTenants isViewAll={true}></ViewTenants>
      </Layout>
    </Layout>
  );
};

export default ViewTenantsList;
