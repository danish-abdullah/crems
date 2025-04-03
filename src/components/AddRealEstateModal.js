import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Switch, Button, Upload, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddRealEstateModal = ({ visible, onClose, editData }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [color, setColor] = useState("#0000FF");
  const [pricingPlan, setPricingPlan] = useState(null);
  const isEditing = !!editData; // Check if it's edit mode

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        realStateName: editData.name,
        address: editData.address,
        phoneNumber: editData.phone,
        email: editData.email,
        admin: editData.admin,
        totalBuildings: editData.totalBuildings,
        status: editData.status === 1, // Convert 1/0 to true/false
        plan: editData.pricing_plan,
      });
      setPricingPlan(editData.plan); // Ensure state updates
    } else {
      form.resetFields(); // Clear form when adding new
    }
  }, [editData, form]);

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("real_estate_name", values.realStateName);
    formData.append("address", values.address);
    formData.append("phone_number", values.phoneNumber);
    formData.append("email_address", values.email);
    formData.append("total_number_of_buildings", values.totalBuildings);
    formData.append("pick_color", color);
    formData.append("status", values.status ? 1 : 0);
    formData.append("user_id", 1); // Example user ID
    formData.append("pricing_plan_id", pricingPlan);

    // Append new logo file if uploaded
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("logo", fileList[0].originFileObj);
    }

    const url = isEditing
      ? `YOUR_API_URL_HERE/${editData.id}` // Edit URL (PUT)
      : "YOUR_API_URL_HERE"; // Add URL (POST)

    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method,
      body: formData,
    })
  };

  return (
    <Modal
      title={isEditing ? "Edit Real Estate" : "Add New Real Estate"}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        {/* Upload Logo */}
        <Form.Item label="Upload Logo">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUpload}
            beforeUpload={() => false}
          >
            {fileList.length < 1 && (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        {/* Real Estate Name & Address */}
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Real Estate Name" name="realStateName" style={{ flex: 1 }}>
            <Input placeholder="Enter Real Estate Name" />
          </Form.Item>
          <Form.Item label="Address" name="address" style={{ flex: 1 }}>
            <Input placeholder="Enter Full Address" />
          </Form.Item>
        </div>

        {/* Phone & Email */}
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Phone Number" name="phoneNumber" style={{ flex: 1 }}>
            <Input placeholder="Enter Phone Number" />
          </Form.Item>
          <Form.Item label="Email Address" name="email" style={{ flex: 1 }}>
            <Input placeholder="Enter Email Address" />
          </Form.Item>
        </div>

        {/* Assign Admin & Total Buildings */}
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Assign Admin" name="admin" style={{ flex: 1 }}>
            <Select placeholder="Select Admin">
              <Option value="admin1">Admin 1</Option>
              <Option value="admin2">Admin 2</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Total Number of Buildings" name="totalBuildings" style={{ flex: 1 }}>
            <Input placeholder="Enter Total Buildings" />
          </Form.Item>
        </div>

        {/* Color & Status */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Form.Item label="Pick Colour" name="colour">
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                width: 50,
                height: 30,
                border: "none",
                cursor: "pointer",
              }}
            />
          </Form.Item>
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>

        {/* Pricing Plan */}
        <Form.Item label="Pricing Plan" name="plan">
          <Radio.Group onChange={(e) => setPricingPlan(e.target.value)} value={pricingPlan}>
            {[
              { label: "Silver", value: "Silver", price: "1200 AED", color: "#C0C0C0" },
              { label: "Gold", value: "Gold", price: "1200 AED", color: "#FFD700" },
              { label: "Platinum", value: "Platinum", price: "1200 AED", color: "#CD7F32" },
            ].map((option) => (
              <Radio.Button
              className="pricing-plan"
                key={option.value}
                value={option.value}
                style={{
                  margin: "8px",
                  padding: "10px",
                  borderRadius: "8px",
                  height: "80px",
                  backgroundColor: option.color,
                  color: "black",
                  width: "120px",
                  textAlign: "center",
                }}
              >
                {option.label}
                <br />
                {option.price}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item style={{ textAlign: "center", marginTop: 16 }}>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: "#A52A2A", border: "none", width: "90px" }}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRealEstateModal;
