import React from "react";
import { Modal, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const statuses = ["Pending", "WIP", "Resolved"];
const statusColors = {
  Pending: "#d32029",
  WIP: "#faad14",
  Resolved: "#52c41a",
};

const ComplaintModal = ({ visible, onCancel, complaint }) => {
  const isEdit = !!complaint;
  const editable = complaint?.status === "Pending";

  const renderStatusBar = () => {
    const activeStatuses = {
      Pending: ["Pending"],
      WIP: ["Pending", "WIP"],
      Resolved: ["Pending", "WIP", "Resolved"],
    }[complaint.status] || [];
  
    return (
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        {statuses.map((status, idx) => {
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
      footer={
        <Button type="primary" danger disabled={isEdit && !editable}>
          {isEdit ? "Edit Complaint" : "Submit"}
        </Button>
      }
    >
      <div style={{ marginBottom: 16 }}>
        <label>Complaint Category</label>
        <Select
          defaultValue={complaint?.category}
          style={{ width: "100%", marginTop: 4 }}
          placeholder="AC, Sewerage, Others..."
          disabled={isEdit && !editable}
        >
          <Option value="Property Condition">Property Condition</Option>
          <Option value="Rent Increase">Rent Increase</Option>
          <Option value="Maintenance">Maintenance</Option>
        </Select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Description</label>
        <TextArea
          rows={4}
          defaultValue={complaint?.description}
          placeholder="Describe your issue briefly..."
          disabled={isEdit && !editable}
        />
      </div>

      <div>
        <label>Upload Image</label>
        <Upload listType="picture-card" disabled={isEdit && !editable}>
          <div>
            <UploadOutlined />
            <div>Upload</div>
          </div>
        </Upload>
      </div>
    </Modal>
  );
};

export default ComplaintModal;
