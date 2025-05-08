import React from "react";
import { Layout, Menu, Avatar } from "antd";
import {
  UserOutlined,
  PlusOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import Logo from "../assets/logo.png";
import "../App.css"; // Ensure you have a separate CSS file for styling
import { useNavigate } from "react-router-dom"; // Import useNavigate

const { Sider } = Layout;

const Sidebar = ({ username, selectedTab }) => {
    const navigate = useNavigate(); // Initialize navigate

    const handleMenuClick = ({ key }) => {
        if (key === "viewComplaints") {
          navigate("/view-complaints-tenant");
        }
      };
  return (
    <Sider className="sidebar">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="avatar-container">
        <Avatar size={64} className="avatar-photo"/>
        <div className="avatar-text">
          <span>{username}</span>
          <br />
          <small>Tenant</small>
        </div>
      </div>
      <div className="menu-container">
        <Menu
          mode="inline"
          onClick={handleMenuClick}
          selectedKeys={[selectedTab]}
        >
          <Menu.Item className="main-item" key="viewComplaints" icon={<UserOutlined />}>
            Complaints
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
