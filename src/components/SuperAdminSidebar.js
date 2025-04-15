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

const SuperAdminSidebar = ({selectedTab}) => {
    const navigate = useNavigate(); // Initialize navigate

    const handleMenuClick = ({ key }) => {
        if (key === "viewDashboard") {
          navigate("/super-admin-dashboard");
        }
        else if (key === "viewUserManagement") {
          navigate("/view-user-management-sa");
        }
        else if (key === "viewRealEstates") {
          navigate("/view-real-estates-sa");
        }
        else if (key === "addAdmin") {
          navigate("/add-admin");
        }
        // else if (key === "viewAdmins") {
        //   navigate("/view-admins");
        // }
        else if (key === "viewAccessRealEstates") {
          navigate("/view-access-real-estates-sa");
        }
        else if (key === "viewNotificationManagement") {
          navigate("/view-notification-management-sa");
        }
        else if (key === "viewAccessControl") {
          navigate("/view-access-control-sa");
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
            <span>VLookin</span>
            <br />
            <small>SuperAdmin</small>
          </div>
        </div>
        <div className="menu-container">
          <Menu
            mode="inline"
            onClick={handleMenuClick}
            selectedKeys={[selectedTab]}
          >
            <Menu.Item key="viewDashboard" icon={<FileTextOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="viewUserManagement" icon={<FileTextOutlined />}>
              User Management
            </Menu.Item>
            <Menu.Item key="viewRealEstates" icon={<FileTextOutlined />}>
              Real Estates
            </Menu.Item>
            {/* <Menu.Item key="viewAccessRealEstates" icon={<FileTextOutlined />}>
              Access Real Estates
            </Menu.Item> */}
            <Menu.Item key="viewAvailableFlats" icon={<FileTextOutlined />}>
              Available Flats
            </Menu.Item>
            <Menu.Item key="viewNotificationManagement" icon={<FileTextOutlined />}>
              Notification Management
            </Menu.Item>
            <Menu.Item key="viewAccessControl" icon={<FileTextOutlined />}>
              Access Control
            </Menu.Item>
            {/* <Menu.Item className="main-item" key="superAdminDashboard" icon={<UserOutlined />}>
              Dashboard
            </Menu.Item> */}
          {/* <SubMenu key="admins" icon={<UserOutlined />} title="Admins">
          <Menu.Item key="addAdmin" icon={<PlusOutlined />}>
              Add Admin
            </Menu.Item>
            <Menu.Item key="viewAdmins" icon={<FileTextOutlined />}>
              View Admins
            </Menu.Item>
          </SubMenu> */}
          </Menu>
        </div>
      </Sider>
  );
};

export default SuperAdminSidebar;
