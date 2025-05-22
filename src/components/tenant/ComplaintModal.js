import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Upload, Button, Form, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const statuses = ["Pending", "WIP", "Resolved"];
const statusColors = {
  Pending: "#d32029",
  WIP: "#faad14",
  Resolved: "#52c41a",
};

const ComplaintModal = ({ visible, onCancel, onSuccess, complaint }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const isEdit = !!complaint;
  const editable = complaint?.status === "Pending";
  const [apartment_id, setApartmentID] = useState([]);

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
        setApartmentID(data.data.apartment_id);
      } else {
        message.error(data.message || "Failed to fetch user details");
      }
    } catch (error) {
      message.error("Failed to fetch user details");
      console.error("Fetch User Details Error:", error);
    }
  };

  const renderStatusBar = () => {
    const activeStatuses = {
      Pending: ["Pending"],
      WIP: ["Pending", "WIP"],
      Resolved: ["Pending", "WIP", "Resolved"],
    }[complaint.status] || [];

    return (
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        {statuses.map((status) => {
          const isActive = activeStatuses.includes(status);
          return (
            <div
              key={status}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "6px 0",
                fontWeight: isActive ? "bold" : 500,
                backgroundColor: isActive ? statusColors[status] : "#f0f0f0",
                color: isActive ? "white" : "#999",
                transition: "all 0.3s ease",
              }}
            >
              {status}
            </div>
          );
        })}
      </div>
    );
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
  
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("user_id", "Tenant");
      formData.append("name", "Tenant");
      formData.append("status", "new");
      formData.append("apartment_id", apartment_id);
  
      if (isEdit) {
        formData.append("_method", "PATCH");
        formData.append("complain_images[]", []);
      }
      if (fileList && fileList.length > 0) {
        fileList.forEach((file) => {
          if (!file.url && file.originFileObj) {
            formData.append("complain_images[]", file.originFileObj);
          }
        });
      }
  
      const res = await fetch(
        `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/complains${isEdit ? `/${complaint.id}` : ""}`,
        {
          method: "POST", // POST even for edit (backend should support `_method: PATCH`)
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: formData,
        }
      );
  
      const result = await res.json();
      if (result.success) {
        message.success(isEdit ? "Complaint updated successfully" : "Complaint submitted successfully");
        onCancel();
        onSuccess();
        form.resetFields();
        setFileList([]);
      } else {
        message.error(result.message || "Failed to submit complaint");
      }
    } catch (err) {
      console.error(err);
      message.error("Error submitting complaint");
    }
  };
  

  useEffect(() => {
    fetchUserDetails();
    if (complaint) {
      console.log("Complaint data:", complaint);
      form.setFieldsValue({
        category: complaint.category,
        description: complaint.description,
      });

      const existingImages = (complaint.images || []).map((url, index) => ({
        uid: `existing-${index}`,
        name: `Image-${index + 1}`,
        status: "done",
        url: url,
      }));
      setFileList(existingImages);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [complaint, form]);

  return (
    <Modal
      title={
        isEdit ? (
          <>
            <div style={{ marginBottom: 8, fontWeight: "bold" }}>
              Complaint No: {complaint.id}
            </div>
            {renderStatusBar()}
          </>
        ) : (
          "New Complaint"
        )
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Complaint Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="AC, Sewerage, Others..." disabled={isEdit && !editable}>
            <Option value="Property Condition">Property Condition</Option>
            <Option value="Rent Increase">Rent Increase</Option>
            <Option value="Maintenance">Maintenance</Option>
            <Option value="Plumbing">Plumbing</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <TextArea
            rows={4}
            placeholder="Describe your issue briefly..."
            disabled={isEdit && !editable}
          />
        </Form.Item>

        <Form.Item label="Upload Images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={({ fileList }) => setFileList(fileList)}
            disabled={isEdit && !editable}
          >
            {editable || !isEdit ? (
              <div>
                <UploadOutlined />
                <div>Upload</div>
              </div>
            ) : null}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            danger
            disabled={isEdit && !editable}
            block
          >
            {isEdit ? "Edit Complaint" : "Submit Complaint"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ComplaintModal;
