import React from "react";
import { Layout, Menu, Avatar } from "antd";
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

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ username }) => {
    const navigate = useNavigate(); // Initialize navigate

    const handleMenuClick = ({ key }) => {
        if (key === "dashboard") {
          navigate("/sales-dashboard");
        }  
        else if (key === "addTenant") {
          navigate("/add-tenant");
        }
        else if (key === "addVisitor") {
          navigate("/add-visitor-sales");
        }
        else if (key === "viewTenants") {
          navigate("/view-tenants");
        }
        else if (key === "viewVisitors") {
          navigate("/view-visitors-sales");
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
          <small>Sales</small>
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
          <SubMenu key="visitor" icon={<UserOutlined />} title="Visitor">
          <Menu.Item key="addVisitor" icon={<PlusOutlined />}>
              Add Visitor
            </Menu.Item>
            <Menu.Item key="viewVisitors" icon={<FileTextOutlined />}>
              View Visitors
            </Menu.Item>
          </SubMenu>
          <SubMenu key="tenant" icon={<TeamOutlined />} title="Tenant" style={{visibility: "hidden"}} >
            <Menu.Item key="addTenant" icon={<PlusOutlined />}>
              Add Tenant
            </Menu.Item>
            <Menu.Item key="viewTenants" icon={<FileTextOutlined />}>
              View Tenants
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
