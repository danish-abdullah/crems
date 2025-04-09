import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Typography, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";
import "../App.css";
import Logo from "../assets/logo.png";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  // Login API call
  const loginUser = async (email, password) => {
    try {
      const response = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        message.success(data.message);
        // Store the token in localStorage
        localStorage.setItem("access_token", data.data.access_token);
        return true;
      } else {
        message.error(data.message || "Login failed");
        return false;
      }
    } catch (error) {
      message.error("Something went wrong!");
      console.error("Login Error:", error);
      return false;
    }
  };

  // Fetch user details and redirect
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
        const role = data.data.roles[0]?.slug;

        // Navigate to respective dashboard
        switch (role) {
          case "super-admin":
            navigate("/super-admin-dashboard");
            break;
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "maintenance":
            navigate("/view-requests");
            break;
          case "tenant":
            navigate("/tenant-dashboard");
            break;
          case "sale":
            navigate("/sales-dashboard");
            break;
          case "visitor":
            navigate("/view-visitors-visitor");
            break;
          default:
            message.error("Role not recognized!");
            break;
        }
      } else {
        message.error(data.message || "Failed to fetch user details");
      }
    } catch (error) {
      message.error("Failed to fetch user details");
      console.error("Fetch User Details Error:", error);
    }
  };

  const handleMenuClick = () => {
      navigate("/forgot-password");
  };

  // Handle form submission
  const onFinish = async (values) => {
    const { username, password } = values;
    const success = await loginUser(username, password);

    if (success) {
      // Fetch user details and redirect
      fetchUserDetails();
    }
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="login-centre">
        <div className="login-div"></div>
        <Card className="login-card">
          <Title level={4} className="login-title">
            Login
          </Title>
          <Form
            name="login_form"
            onFinish={onFinish}
            layout="vertical"
            className="login-form"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                className="login-input"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                className="login-input"
              />
            </Form.Item>
            <Form.Item>
              <Checkbox className="login-checkbox">Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                block
              >
                Login
              </Button>
            </Form.Item>
            <Form.Item className="forgot-password-item">
              <a onClick={handleMenuClick} className="forgot-password-link">
                Forgot Password?
              </a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
