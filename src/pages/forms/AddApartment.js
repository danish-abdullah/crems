import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Input,
  Button,
  Form,
  Row,
  Col,
  Radio,
  Upload,
  Select,
  message,
} from "antd";
import { PlusOutlined, MinusOutlined, UploadOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AddApartment = () => {
  const [roomCounts, setRoomCounts] = useState({
    bed: 0,
    living: 0,
    pantry: 0,
    laundry: 0,
    bath: 0,
    dining: 0,
  });

  const [form] = Form.useForm();
  const [buildingList, setBuildingList] = useState([]); // State to store building names

  // Fetch building names from the API
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/building",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setBuildingList(data.data); // Assuming `data.data` contains the list of buildings
        } else {
          message.error(data.message);
        }
      } catch (error) {
        message.error("Error fetching building list");
        console.error("Error:", error);
      }
    };

    fetchBuildings();
  }, []);

  const onClear = () => {
    form.resetFields();
  };

  const handleRoomCountChange = (room, increment) => {
    setRoomCounts((prevCounts) => ({
      ...prevCounts,
      [room]: Math.max(0, prevCounts[room] + (increment ? 1 : -1)),
    }));
  };

  const onFinish = async (values) => {
    const apartmentDetails = {
      apartment_type: values.apartmentType.toLowerCase(),
      area: values.name,
      furnished: values.furnished.toLowerCase(),
      balcony: values.balcony === "Yes",
      rooms: Object.keys(roomCounts).filter((room) => roomCounts[room] > 0),
      bed: roomCounts.bed,
      living: roomCounts.living,
      pantry: roomCounts.pantry,
      laundry: roomCounts.laundry,
      bath: roomCounts.bath,
      dining: roomCounts.dining,
      rent: parseFloat(values.rent),
      comments: values.building, // Submit selected building ID
    };

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/apartment",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apartmentDetails),
        }
      );

      const data = await response.json();
      if (data.success) {
        message.success("Apartment details saved successfully");
        form.resetFields();
      } else {
        message.error("Failed to save apartment details");
      }
    } catch (error) {
      message.error("Error saving apartment details");
      console.error("Error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form failed:", errorInfo);
    message.error("Please fill out all required fields correctly.");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Admin" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="Add Apartment" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Title level={5} style={{ color: "#4b244a" }}>
            Add Apartment Details
          </Title>
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Apartment Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter the apartment name" },
                  ]}
                >
                  <Input placeholder="Apartment name" />
                </Form.Item>
                <Form.Item
                  label="Rent"
                  name="rent"
                  rules={[
                    { required: true, message: "Please enter the rent" },
                  ]}
                >
                  <Input placeholder="Rent" />
                </Form.Item>
                <Form.Item
                  label="Building"
                  name="building"
                  rules={[
                    { required: true, message: "Please select a building" },
                  ]}
                >
                  <Select placeholder="Select Building">
                    {buildingList.map((building) => (
                      <Option key={building.building_name} value={building.building_name}>
                        {building.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="File Upload"
                  name="fileUpload"
                  valuePropName="fileList"
                  getValueFromEvent={(e) =>
                    Array.isArray(e) ? e : e && e.fileList
                  }
                >
                  <Upload name="file" action="/upload.do" listType="text">
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
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
                <Form.Item
                  label="Furnished"
                  name="furnished"
                  rules={[{ required: true, message: "Please select furnishing status" }]}
                >
                  <Radio.Group>
                    <Radio.Button value="Semi-Furnished">Semi-Furnished</Radio.Button>
                    <Radio.Button value="Fully-Furnished">Fully-Furnished</Radio.Button>
                    <Radio.Button value="Not-Furnished">Not Furnished</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Rooms">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "10px",
                    }}
                  >
                    {Object.keys(roomCounts).map((room) => (
                      <div
                        key={room}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            width: "50px", // Equal width for room names
                            textAlign: "left",
                          }}
                        >
                          {room.charAt(0).toUpperCase() + room.slice(1)}
                        </span>
                        <Button
                          size="small"
                          icon={<MinusOutlined />}
                          onClick={() => handleRoomCountChange(room, false)}
                        />
                        <span style={{ width: "30px", textAlign: "center" }}>
                          {roomCounts[room]}
                        </span>
                        <Button
                          size="small"
                          icon={<PlusOutlined />}
                          onClick={() => handleRoomCountChange(room, true)}
                          style={{ marginRight: "40px" }} // Fixed width for buttons
                        />
                      </div>
                    ))}
                  </div>
                </Form.Item>
                <Form.Item
                  label="Balcony"
                  name="balcony"
                  rules={[{ required: true, message: "Please select if a balcony is present" }]}
                >
                  <Radio.Group>
                    <Radio.Button value="Yes">Yes</Radio.Button>
                    <Radio.Button value="No">No</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="default"
                onClick={onClear}
                style={{ marginRight: "10px" }}
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

export default AddApartment;
