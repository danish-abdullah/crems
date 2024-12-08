import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { Form, Input, Button, Checkbox, Typography, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";
import "../App.css";
import Logo from "../assets/logo.png";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const onFinish = (values) => {
    const { username, password } = values;

    if (username === "sa" && password === "a")
    {
        message.success("Login Successful!");
        navigate("/super-admin-dashboard");
    }
    else if (username === "admin" && password === "a")
    {
        message.success("Login Successful!");
        navigate("/admin-dashboard");
    }
    else if (username === "main" && password === "a")
    {
        message.success("Login Successful!");
        navigate("/maintenance-dashboard");
    }
    else if (username === "tenant" && password === "a")
    {
        message.success("Login Successful!");
        navigate("/tenant-dashboard");
    }
    else if (username === "sales" && password === "a")
    {
        message.success("Login Successful!");
        navigate("/sales-dashboard");
    }
    else
    {
        message.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="login-centre" style={{ flexDirection: "row" }}>
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
              rules={[{ required: true, message: "Please enter your User ID!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="User Id"
                className="login-input"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please enter your Password!" }]}
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
            <Form.Item>
              <a href="/forgot-password" className="forgot-password-link">
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
