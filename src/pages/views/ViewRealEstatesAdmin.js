import React, { useState, useEffect } from "react";
import {
  Layout, Table, Button, Input, Dropdown, Menu, Tag, Avatar,
  Form, message, Spin, Space, Popconfirm
} from "antd";
import AdminSidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";
import "../../App.css";
import ViewBuildings from "./ViewBuildings.js";

const { Content } = Layout;

const RealEstate = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch users from API
  const fetchRealEstates = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/real-estates",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.json();
      const formattedUsers = data?.data?.map((item, index) => ({
        key: index + 1,
        id: item.id,
        name: item.real_estate_name,
        email: item.email_address,
        phone: item.phone_number || "-",
        address: item.address || "-",
        admin: item.assigned_admin || "-",
        pricing_plan: item.pricing_plan_name,
        logo: item.logo,
        status: item.status,
      })) || [];
      setUsers(formattedUsers);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealEstates();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar username="Admin" selectedTab="viewBuildings" />
      <Layout>
        <TitleHeader title="Buildings" />
        
        {loading ? "" : users.length > 0 ? (
          <ViewBuildings realEstateID={users[0].id} isSuperAdmin={false}/>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            No Real Estates Found
          </div>
        )}
      </Layout>
    </Layout>
  );
};

export default RealEstate;
