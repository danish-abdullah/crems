import React from "react";
import { Layout, Menu, Avatar, message } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  PlusOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import Logo from "../assets/logo.png";
import "../App.css"; // Ensure you have a separate CSS file for styling
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useState, useEffect } from "react";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ username, selectedTab }) => {
    const navigate = useNavigate(); // Initialize navigate
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
            fetchUserDetails();
          }, []);
  
      const fetchUserDetails = async () => {
        try {
          const token = localStorage.getItem("access_token");
          const response = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/auth/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const data = await response.json();
          if (data.success) {
            setUserDetails(data.data);
          } else {
            message.error(data.message || "Failed to fetch user details");
          }
        } catch (error) {
          message.error("Failed to fetch user details");
          console.error("Fetch User Details Error:", error);
        }
      };

    const handleMenuClick = ({ key }) => {
        if (key === "dashboard") {
          navigate("/sales-dashboard");
        }  
        else if (key === "viewVisitors") {
          navigate("/view-visitors-sales");
        }
        else if (key === "followUps") {
          navigate("/view-followups");
        }
      };
  return (
    <Sider className="sidebar">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="avatar-container">
        <Avatar src={userDetails.profile_picture || null} icon={!userDetails.profile_picture && <UserOutlined />} size={64}/>
        <div className="avatar-text">
          <span>{userDetails.name}</span>
          <br />
          <small>Sales</small>
        </div>
      </div>
      <div className="menu-container">
        <Menu
          mode="inline"
          onClick={handleMenuClick}
          selectedKeys={[selectedTab]}
        >
          <Menu.Item className="main-item" key="dashboard" icon={<UserOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item className="main-item" key="viewVisitors" icon={<UserOutlined />}>
            Visitors
          </Menu.Item>
          <Menu.Item className="main-item" key="followUps" icon={<UserOutlined />}>
            Follow-Ups
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
};

Sidebar.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Sidebar;
