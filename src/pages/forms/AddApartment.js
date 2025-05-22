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
  Modal
} from "antd";
import { PlusOutlined, MinusOutlined, UploadOutlined } from "@ant-design/icons";
import "../../App.css";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AddApartment = ({visible, onClose, editData, refreshData}) => {
  const isEditing = !!editData;
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
  const [realEstateID, setRealEstateID] = useState([]);

  useEffect(() => {
      if (editData) {
        form.setFieldsValue({
          apartment_type: editData.apartmentType,
          area: editData.area,
          furnished: editData.furnished,
          balcony: editData.balcony,
          rooms: editData.room,
          bed: editData.bed,
          living: editData.living,
          pantry: editData.pantry,
          laundry: editData.laundry,
          bath: editData.bath,
          dining: editData.dining,
          rent: editData.rent,
          comments: editData.comments, // Submit selected building ID
        });
      } else {
        form.resetFields();      
      }
    }, [editData, form]);

  // Fetch building names from the API
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/buildings",
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
    fetchUserDetails();
  }, []);

  const onClear = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        apartmentType: editData.apartment_type,
        name: editData.name,
        furnished: editData.furnished,
        balcony: editData.balcony ? "Yes" : "No",
        rent: editData.rent,
        building: editData.building_id,
      });
  
      // Set room counts from editData
      setRoomCounts({
        bed: editData.bed || 0,
        living: editData.living || 0,
        pantry: editData.pantry || 0,
        laundry: editData.laundry || 0,
        bath: editData.bath || 0,
        dining: editData.dining || 0,
      });
    } else {
      form.resetFields();
      setRoomCounts({
        bed: 0,
        living: 0,
        pantry: 0,
        laundry: 0,
        bath: 0,
        dining: 0,
      });
    }
  }, [editData, form]);
  

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
          setRealEstateID(data.data.real_estate_id);
        } else {
          message.error(data.message || "Failed to fetch user details");
        }
      } catch (error) {
        message.error("Failed to fetch user details");
        console.error("Fetch User Details Error:", error);
      }
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
      building_id: values.building,
      real_estate_id: realEstateID,
    };
  
    // Add _method: PATCH if editing
    if (isEditing && editData?.key) {
      apartmentDetails._method = "PATCH";
    }
  
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        isEditing
          ? `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/apartments/${editData.key}`
          : "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/apartments",
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
        message.success(
          isEditing
            ? "Apartment updated successfully"
            : "Apartment details saved successfully"
        );
        form.resetFields();
        refreshData();
        onClose();
      } else {
        message.error(
          `Failed to ${isEditing ? "update" : "add"} apartment: ${
            data.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      message.error(`Error: ${error.message}`);
      console.error("Error:", error);
    }
  };
  

  const onFinishFailed = (errorInfo) => {
    console.error("Form failed:", errorInfo);
    message.error("Please fill out all required fields correctly.");
  };

  return (
    <Modal
      title={isEditing ? "Edit Apartment" : "Add New Apartment"}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
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
                      <Option key={building.id} value={building.id}>
                        {building.building_name}
                      </Option>
                    ))}
                  </Select>
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
                      gridTemplateColumns: "repeat(2, 1fr)",
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
                            width: "55px", // Equal width for room names
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
        </Modal>
  );
};

export default AddApartment;
