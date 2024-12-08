import React from "react";
import { Layout, Menu, Avatar } from "antd";
import {
  UserOutlined,
  PlusOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Logo from "../assets/logo.png";
import "../App.css"; // Ensure you have a separate CSS file for styling
import { useNavigate } from "react-router-dom"; // Import useNavigate

const { Sider } = Layout;
const { SubMenu } = Menu;

const SuperAdminSidebar = () => {
    const navigate = useNavigate(); // Initialize navigate

    const handleMenuClick = ({ key }) => {
        if (key === "superAdminDashboard") {
          navigate("/super-admin-dashboard");
        }
        else if (key === "addAdmin") {
          navigate("/add-admin");
        }
        else if (key === "viewAdmins") {
          navigate("/view-admins");
        }
        
      };
  return (
    <Sider
        theme="dark"
        style={{
          backgroundColor: "#420B31",
          color: "white",
        }}
      >
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className="avatar-container">
          <Avatar size={64} style={{ backgroundColor: "#fff" }} />
          <div style={{ color: "white", margin: "10px" }}>
            <span>VLookin</span>
            <br />
            <small>SuperAdmin</small>
          </div>
        </div>
        <div className="menu-container">
          <Menu
            theme="dark"
            mode="inline"
            style={{ backgroundColor: "#420B31", flexGrow: 1 }}
            onClick={handleMenuClick}
          >
            <Menu.Item className="main-item" key="adminDashboard" icon={<UserOutlined />}>
            Dashboard
          </Menu.Item>
          <SubMenu key="admins" icon={<UserOutlined />} title="Admins">
          <Menu.Item key="addAdmin" icon={<PlusOutlined />}>
              Add Admin
            </Menu.Item>
            <Menu.Item key="viewAdmins" icon={<FileTextOutlined />}>
              View Admins
            </Menu.Item>
          </SubMenu>
          </Menu>
        </div>
      </Sider>
  );
};

export default SuperAdminSidebar;
