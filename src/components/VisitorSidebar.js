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
        else if (key === "addVisitor") {
          navigate("/add-visitor-visitor");
        }
        else if (key === "viewVisitors") {
          navigate("/view-visitors-visitor");
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
        </div>
      </div>
      <div className="menu-container">
        <Menu
          theme="dark"
          mode="inline"
          style={{ backgroundColor: "#420B31", flexGrow: 1 }}
          onClick={handleMenuClick}
        >
          <SubMenu key="visitor" icon={<UserOutlined />} title="Visitor">
            <Menu.Item key="addVisitor" icon={<PlusOutlined />}>
              Add Visitor
            </Menu.Item>
            <Menu.Item key="viewVisitors" icon={<FileTextOutlined />}>
              View Visitors
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