import React, { useState } from "react";
import { Modal, Form, Input, Select, Switch, Button, Upload, Radio } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddRealEstateModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [color, setColor] = useState("#0000FF");
  const [pricingPlan, setPricingPlan] = useState(null);

  const pricingOptions = [
    { label: "Silver", value: "silver", price: "1200 AED", color: "#C0C0C0" },
    { label: "Gold", value: "golden", price: "1200 AED", color: "#FFD700" },
    { label: "Platinum", value: "platinum", price: "1200 AED", color: "#CD7F32" },
  ];

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = (values) => {
    console.log("Form Values:", { ...values, color, pricingPlan });
    onClose();
  };

  return (
    <Modal
      title="Add New Real State"
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

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Real State Name" name="realStateName" style={{ flex: 1 }}>
            <Input placeholder="Enter Real Estate Name" />
          </Form.Item>

          <Form.Item label="Address" name="address" style={{ flex: 1 }}>
            <Input placeholder="Enter Full Address" />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Phone Number" name="phoneNumber" style={{ flex: 1 }}>
            <Input placeholder="Enter your Building number" />
          </Form.Item>

          <Form.Item label="Email Address" name="email" style={{ flex: 1 }}>
            <Input placeholder="Select your Email Address" />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Assign Admin" name="admin" style={{ flex: 1 }}>
            <Select placeholder="Select Admin">
              <Option value="admin1">Admin 1</Option>
              <Option value="admin2">Admin 2</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Total Numbers of Building" name="totalBuildings" style={{ flex: 1 }}>
            <Input placeholder="Assign total number of building" />
          </Form.Item>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Pick Color */}
          <div>
          <Form.Item label="Pick Colour" name="colour" style={{ flex: 1 }}>
          <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ width: 50, paddingLeft: 5, paddingRight: 0, paddingTop: 4, paddingBottom: 0, height: 30, border: "none", cursor: "pointer" }}
            />
          </Form.Item>
          </div>

          {/* Status */}
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>

        {/* Pricing Plan */}
        <div>
        <Form.Item label="Pricing Plan" name="plan">
          <Radio.Group onChange={(e) => setPricingPlan(e.target.value)} value={pricingPlan}>
            {pricingOptions.map((option) => (
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
        </div>

        {/* Submit Button */}
        <Form.Item style={{ textAlign: "center", marginTop: 16 }}>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: "#A52A2A", border: "none", width: "90px" }}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRealEstateModal;
