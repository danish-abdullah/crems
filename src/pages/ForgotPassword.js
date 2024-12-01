import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { MailOutlined } from "@ant-design/icons";
import "./ForgotPassword.css";
import "../App.css";
import Logo from "../assets/logo.png"

const { Title } = Typography;

const ForgotPassword = () => {
  const onFinish = (values) => {
    console.log("Forgot Password Request:", values);
    alert("Password reset link has been sent to your email!");
  };

  return (
    <div className="forgot-password-container">
        <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <Card className="forgot-password-card">
        <Title level={3} className="forgot-password-title">
          Reset Password
        </Title>
        <p className="forgot-password-instructions">
          Enter your registered email address to receive a password reset link.
        </p>
        <Form name="forgot_password_form" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              className="forgot-password-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="forgot-password-button"
              block
            >
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
