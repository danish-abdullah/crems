import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Layout, Typography, Button, Badge, Drawer, List, Divider, message } from "antd";
import { LogoutOutlined, BellOutlined } from "@ant-design/icons";
import axios from "axios";

const { Header } = Layout;
const { Title } = Typography;

const TitleHeader = ({ title }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New tenant added", read: false },
    { id: 2, message: "Building maintenance scheduled", read: false },
    { id: 3, message: "Upcoming system update", read: true },
  ]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Logout function
  const handleLogoutClick = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Retrieve token from localStorage
      await axios.post(
        "https://website-ed11b270.yeo.vug.mybluehost.me/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );
      message.success("Logout successful!");
      localStorage.removeItem("access_token"); // Clear token from localStorage
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      message.error("Failed to log out. Please try again.");
    }
  };

  const handleNotificationClick = () => {
    setDrawerVisible(true);
    // Mark notifications as read
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) => ({ ...notif, read: true }))
    );
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Calculate unread notifications
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <Header
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <Title level={4} style={{ color: "#4b244a", margin: 0 }}>
        {title}
      </Title>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Badge
          count={unreadCount}
          size="small"
          offset={[-5, 5]}
          style={{
            backgroundColor: "#4b244a", // Sidebar color
          }}
        >
          <Button
            type="link"
            icon={<BellOutlined />}
            style={{ color: "#4b244a" }}
            onClick={handleNotificationClick}
          />
        </Badge>
        <Button
          type="link"
          icon={<LogoutOutlined />}
          style={{ color: "#4b244a" }}
          onClick={handleLogoutClick}
        >
          Logout
        </Button>
      </div>
      <Drawer
        title="Notifications"
        placement="right"
        onClose={closeDrawer}
        visible={drawerVisible}
        width={300}
      >
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item>
              <span style={{ color: item.read ? "gray" : "black" }}>
                {item.message}
              </span>
            </List.Item>
          )}
        />
        <Divider />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="default"
            onClick={handleClearNotifications}
            style={{
              color: "#4b244a",
              borderColor: "#4b244a",
              marginRight: "10px",
            }}
            disabled={notifications.length === 0}
          >
            Clear
          </Button>
        </div>
      </Drawer>
    </Header>
  );
};

TitleHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitleHeader;
