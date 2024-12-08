import React from "react";
import PropTypes from "prop-types";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Layout, Typography, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

const TitleHeader = ({ title }) => {
    const navigate = useNavigate(); // Initialize navigate
    const handleLogoutClick = () => {
        navigate("/");  
    }
    
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
          <Button
            type="link"
            icon={<LogoutOutlined />}
            style={{ color: "#4b244a" }}
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </Header>
  );
};

TitleHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitleHeader;