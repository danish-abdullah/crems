import React, { useState } from "react";
import { Layout, Typography, Input, Button, Form, Row, Col, Radio, Upload } from "antd";
import { PlusOutlined, MinusOutlined, UploadOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;

const AddApartment = () => {
  const [roomCounts, setRoomCounts] = useState({
    bed: 0,
    living: 0,
    pantry: 0,
    laundry: 0,
    bath: 0,
    dining: 0,
  });

  const handleRoomCountChange = (room, increment) => {
    setRoomCounts((prevCounts) => ({
      ...prevCounts,
      [room]: Math.max(0, prevCounts[room] + (increment ? 1 : -1)),
    }));
  };

  const onFinish = (values) => {
    const apartmentDetails = { ...values, roomCounts };
    console.log("Apartment details:", apartmentDetails);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Admin" role="Admin" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Add Apartment" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Title level={5} style={{ color: "#4b244a" }}>
            Add Apartment Details
          </Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Apartment Type"
                  name="apartmentType"
                  rules={[{ required: true, message: "Please select an apartment type" }]}
                >
                  <Radio.Group>
                    <Radio.Button value="Residential">Residential</Radio.Button>
                    <Radio.Button value="Commercial">Commercial</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Rooms">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                    {Object.keys(roomCounts).map((room) => (
                      <div
                        key={room}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "5px" }}
                      >
                        <span>{room.charAt(0).toUpperCase() + room.slice(1)}</span>
                        <Button
                          size="small"
                          icon={<MinusOutlined />}
                          onClick={() => handleRoomCountChange(room, false)}
                        />
                        <span>{roomCounts[room]}</span>
                        <Button
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() => handleRoomCountChange(room, true)}
                        />
                      </div>
                    ))}
                  </div>
                </Form.Item>
                <Form.Item
                  label="Rent (per month)"
                  name="rent"
                  rules={[{ required: true, message: "Please enter the rent" }]}
                >
                  <Input placeholder="Rent" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Area (in sqft)"
                  name="area"
                  rules={[{ required: true, message: "Please enter the area" }]}
                >
                  <Input placeholder="Area" />
                </Form.Item>
                <Form.Item
                  label="Furnished"
                  name="furnished"
                  rules={[{ required: true, message: "Please select furnishing status" }]}
                >
                  <Radio.Group>
                    <Radio.Button value="Semi-Furnished">Semi-Furnished</Radio.Button>
                    <Radio.Button value="Fully-Furnished">Fully-Furnished</Radio.Button>
                    <Radio.Button value="Not Furnished">Not Furnished</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="Balcony"
                  name="balcony"
                  rules={[{ required: true, message: "Please select if a balcony is present" }]}
                  style={{ marginTop: "50px" }}
                >
                  <Radio.Group>
                    <Radio.Button value="Yes">Yes</Radio.Button>
                    <Radio.Button value="No">No</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="Comments" name="comments">
                  <Input.TextArea placeholder="Additional Comments" rows={3} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="File Upload"
                  name="fileUpload"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                >
                  <Upload name="file" action="/upload.do" listType="text">
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="default" style={{ marginRight: "10px" }}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#4b244a", borderColor: "#4b244a" }}
              >
                Save
              </Button>
            </div>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AddApartment;
