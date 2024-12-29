import React, { useState } from "react";
import { Layout, Typography, InputNumber, Button, Row, Col, Form, Radio, Input } from "antd";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;

const AddBuilding = () => {
  const [form] = Form.useForm(); // Create form instance
  const [floorCount, setFloorCount] = useState(0);
  const [parkingFloorCount, setParkingFloorCount] = useState(0);
  const [floorOption, setFloorOption] = useState("");
  const [parkingOption, setParkingOption] = useState("");

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form failed:", errorInfo);
  };

  const handleClear = () => {
    form.resetFields(); // Clear all form fields
    setFloorCount(0); // Reset floor count
    setParkingFloorCount(0); // Reset parking floor count
    setFloorOption(""); // Reset floor option
    setParkingOption(""); // Reset parking option
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Admin" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Add Building" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Title level={5} style={{ color: "#4b244a" }}>
            Add Building Details
          </Title>
          {/* Add Building Form */}
          <Form
            form={form} // Link form instance
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/* Building Details */}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Building Name"
                  name="buildingName"
                  rules={[{ required: true, message: "Please enter the building name" }]}
                >
                  <Input placeholder="Building Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Please enter the address" }]}
                >
                  <Input placeholder="Address" />
                </Form.Item>
              </Col>
            </Row>

            {/* Number of Floors */}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="No. of Floors"
                  name="noOfFloors"
                  rules={[
                    { required: true, message: "Please enter the number of floors" },
                    {
                      type: "number",
                      min: 1,
                      message: "Floors must be at least 1",
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    placeholder="No. of Floors"
                    style={{ width: "100%" }}
                    onChange={(value) => setFloorCount(value || 0)}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="No. of Parking Floors"
                  name="parkingFloors"
                  rules={[
                    { required: true, message: "Please enter the number of parking floors" },
                    {
                      type: "number",
                      min: 0,
                      message: "Parking floors cannot be negative",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    placeholder="No. of Parking Floors"
                    style={{ width: "100%" }}
                    onChange={(value) => setParkingFloorCount(value || 0)}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Floor Options and Parking Options in the same row */}
            <Row gutter={16}>
              {/* Count of Flats */}
              <Col span={12}>
                {floorCount > 0 && (
                  <>
                    <Form.Item label="Count of Flats" name="countOfFlats">
                      <Radio.Group onChange={(e) => setFloorOption(e.target.value)}>
                        <Radio value="Same">Same</Radio>
                        <Radio value="Distinct">Distinct</Radio>
                      </Radio.Group>
                    </Form.Item>

                    {floorOption === "Same" && (
                      <Form.Item
                        label="Flats on Each Floor"
                        name="flatsPerFloor"
                        rules={[{ required: true, message: "Please enter the number of flats per floor" }]}
                      >
                        <InputNumber
                          min={1}
                          placeholder="Flats per Floor"
                          style={{ width: "100%" }}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </Form.Item>
                    )}

                    {floorOption === "Distinct" &&
                      Array.from({ length: floorCount }, (_, index) => (
                        <Form.Item
                          key={index}
                          label={`Flats on Floor ${index + 1}`}
                          name={`flatsFloor${index + 1}`}
                          rules={[{ required: true, message: "Please enter the number of flats" }]}
                        >
                          <InputNumber
                            min={1}
                            placeholder={`Flats on Floor ${index + 1}`}
                            style={{ width: "100%" }}
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </Form.Item>
                      ))}
                  </>
                )}
              </Col>

              {/* Count of Parking Slots */}
              <Col span={12}>
                {parkingFloorCount > 0 && (
                  <>
                    <Form.Item label="Count of Parking Slots" name="countOfParkingSlots">
                      <Radio.Group onChange={(e) => setParkingOption(e.target.value)}>
                        <Radio value="Same">Same</Radio>
                        <Radio value="Distinct">Distinct</Radio>
                      </Radio.Group>
                    </Form.Item>

                    {parkingOption === "Same" && (
                      <Form.Item
                        label="Parking Slots on Each Floor"
                        name="parkingSlotsPerFloor"
                        rules={[{ required: true, message: "Please enter parking slots per floor" }]}
                      >
                        <InputNumber
                          min={1}
                          placeholder="Parking Slots per Floor"
                          style={{ width: "100%" }}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </Form.Item>
                    )}

                    {parkingOption === "Distinct" &&
                      Array.from({ length: parkingFloorCount }, (_, index) => (
                        <Form.Item
                          key={index}
                          label={`Parking Slots on Floor ${index + 1}`}
                          name={`parkingSlotsFloor${index + 1}`}
                          rules={[{ required: true, message: "Please enter parking slots" }]}
                        >
                          <InputNumber
                            min={1}
                            placeholder={`Parking Slots on Floor ${index + 1}`}
                            style={{ width: "100%" }}
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </Form.Item>
                      ))}
                  </>
                )}
              </Col>
            </Row>

            {/* Action Buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <Button
                type="default"
                style={{ marginRight: "10px" }}
                onClick={handleClear} // Call handleClear on click
              >
                Clear
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

export default AddBuilding;
