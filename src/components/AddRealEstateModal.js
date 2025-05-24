import React, { useState, useEffect } from "react";
import {
  Modal, Form, Input, Select, Switch, Button, Upload, Radio, message
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddRealEstateModal = ({ visible, onClose, editData, onSuccess }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [color, setColor] = useState("#0000FF");
  const [pricingPlan, setPricingPlan] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const isEditing = !!editData;

  useEffect(() => {
    // Fetch admin users
    const fetchAdmins = async () => {
      try {
        const res = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/users", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
          }
        });
        const data = await res.json();
        const admins = data?.data?.filter(user => user.roles[0]?.name === "Admin") || [];
        setAdminUsers(admins);
      } catch (err) {
        message.error("Failed to fetch admins");
      }
    };

    fetchAdmins();
  }, []);

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        realStateName: editData.name,
        address: editData.address,
        phoneNumber: editData.phone,
        email: editData.email,
        // admin: editData.admin,
        totalBuildings: editData.total_buildings,
        status: editData.status === 1,
        plan: editData.pricing_plan_id.toString(),
      });
      setPricingPlan(editData.pricing_plan_id.toString());
      if (editData.logo)
      {
            setFileList([
            {
                url: editData.logo,
            },
        ]);
      }
    } else {
      form.resetFields();
      setPricingPlan(null); // reset when adding new
        setFileList([]);
    }
  }, [editData, form]);

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("real_estate_name", values.realStateName);
    formData.append("address", values.address);
    formData.append("phone_number", values.phoneNumber);
    formData.append("email_address", values.email);
    formData.append("total_number_of_buildings", values.totalBuildings);
    formData.append("pick_color", color);
    formData.append("status", values.status ? 1 : 0);
    formData.append("user_id", 1); // From dropdown
    formData.append("pricing_plan_id", pricingPlan);
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("logo", fileList[0].originFileObj); 
    }
    
    const url = isEditing
      ? `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/real-estates/${editData.id}`
      : "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/real-estates";
    const method = "POST";
    if (isEditing)
      formData.append("_method", "PATCH");

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        },
        body: formData
      });
      const result = await response.json();
      if (result.success) {
        message.success(isEditing ? "Real estate updated" : "Real estate added");
        onSuccess();
        onClose();
      } else {
        message.error(result.message || "Something went wrong");
      }
    } catch (err) {
      message.error("Error submitting form");
    }
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

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Real Estate Name" name="realStateName" style={{ flex: 1 }}>
            <Input placeholder="Enter Real Estate Name" />
          </Form.Item>
          <Form.Item label="Total Number of Buildings" name="totalBuildings" style={{ flex: 1 }}>
            <Input placeholder="Enter Total Buildings" />
          </Form.Item>
          
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Phone Number" name="phoneNumber" style={{ flex: 1 }}>
            <Input placeholder="Enter Phone Number" />
          </Form.Item>
          <Form.Item label="Email Address" name="email" style={{ flex: 1 }}>
            <Input placeholder="Enter Email Address" />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          {/* <Form.Item label="Assign Admin" name="admin" style={{ flex: 1 }}>
            <Select placeholder="Select Admin">
              {adminUsers.map((admin) => (
                <Option key={admin.id} value={admin.id}>
                  {admin.name}
                </Option>
              ))}
            </Select>
          </Form.Item> */}
         <Form.Item label="Address" name="address" style={{ flex: 1 }}>
            <Input placeholder="Enter Full Address" />
          </Form.Item>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* <Form.Item label="Pick Colour" name="colour">
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
          </Form.Item> */}
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>

        <Form.Item label="Pricing Plan" name="plan">
          <Radio.Group onChange={(e) => {setPricingPlan(e.target.value); form.setFieldsValue({ plan: e.target.value });}}  value={pricingPlan}>
            {[
              { label: "Silver", value: "1", id: "1", price: "1200 AED", color: "#C0C0C0" },
              { label: "Gold", value: "2", id: "2", price: "1600 AED", color: "#FFD700" },
              { label: "Platinum", value: "3", id: "3", price: "2000 AED", color: "#CD7F32" },
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
