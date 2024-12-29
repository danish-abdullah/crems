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
const { SubMenu } = Menu;

const Sidebar = ({ username }) => {
    const navigate = useNavigate(); // Initialize navigate

    const handleMenuClick = ({ key }) => {
        if (key === "dashboard") {
          navigate("/visitor-dashboard");
        }
        else if (key === "addMaintenanceRequest") {
          navigate("/add-maintenance-request");
        }
        else if (key === "viewMaintenanceRequests") {
          navigate("/view-maintenance-requests-tenant");
        }
        else if (key === "addComplaint") {
          navigate("/add-complaint");
        }
        else if (key === "viewComplaints") {
          navigate("/view-complaints-tenant");
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
          <span>{username}</span>
          <br />
          <small>Receptionist</small>
        </div>
      </div>
      <div className="menu-container">
        <Menu
          theme="dark"
          mode="inline"
          style={{ backgroundColor: "#420B31", flexGrow: 1 }}
          onClick={handleMenuClick}
        >
          <Menu.Item className="main-item" key="dashboard" icon={<UserOutlined />}>
            Dashboard
          </Menu.Item>
          <SubMenu key="maintenance" icon={<UserOutlined />} title="Maintenance">
            <Menu.Item key="addMaintenanceRequest" icon={<PlusOutlined />}>
              Add Request
            </Menu.Item>
            <Menu.Item key="viewMaintenanceRequests" icon={<FileTextOutlined />}>
              View Requests
            </Menu.Item>
          </SubMenu>
          <SubMenu key="complaints" icon={<UserOutlined />} title="Complaints">
            <Menu.Item key="addComplaint" icon={<PlusOutlined />}>
              Add Complaint
            </Menu.Item>
            <Menu.Item key="viewComplaints" icon={<FileTextOutlined />}>
              View Complaints
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Sider>
  );
};

Sidebar.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Sidebar;
