import React, { useState, useEffect } from "react";
import { Layout, Table, Input, Button, message, Popconfirm, Modal, Form, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const ViewVisitors = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVisitor, setCurrentVisitor] = useState(null);
  const [buildingList, setBuildingList] = useState([]); // State for building list
  const [form] = Form.useForm();

  // Fetch visitors list
  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/visitor",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Add token if required
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        const visitors = data.data.map((visitor) => ({
          key: visitor.id,
          name: visitor.name,
          building_name: visitor.building_name,
          flat: visitor.flat_no || "N/A",
          mobile: visitor.mobile_number,
          email: visitor.email,
          date: visitor.created_at.split("T")[0], // Extract date before "T"
        }));
        setDataSource(visitors);
        message.success(data.message);
      } else {
        message.error("Failed to fetch visitors.");
      }
    } catch (error) {
      console.error(error);
      message.error("Error fetching visitors.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch building list
  const fetchBuildings = async () => {
    try {
      const response = await fetch(
        "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/building",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setBuildingList(data.data); // Assuming data.data contains the list of buildings
      } else {
        message.error("Failed to fetch buildings");
      }
    } catch (error) {
      message.error("Error fetching buildings");
      console.error(error);
    }
  };

  // Fetch visitors and buildings on component mount
  useEffect(() => {
    fetchVisitors();
    fetchBuildings();
  }, []);

  // Delete visitor
  const deleteVisitor = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/visitor/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        message.success("Visitor deleted successfully.");
        fetchVisitors(); // Refresh the list after deletion
      } else {
        message.error("Failed to delete visitor.");
      }
    } catch (error) {
      console.error(error);
      message.error("Error deleting visitor.");
    } finally {
      setLoading(false);
    }
  };

  // Edit visitor - open modal with data
  const editVisitor = (visitor) => {
    setCurrentVisitor(visitor);
    form.setFieldsValue({
      name: visitor.name,
      building_name: visitor.building_name,
      flat: visitor.flat,
      mobile: visitor.mobile,
      email: visitor.email,
    });
    setIsModalVisible(true);
  };

  // Handle form submission (update visitor)
  const handleOk = async () => {
    const values = await form.validateFields();
    setLoading(true);
    try {
      const response = await fetch(
        `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/visitor/${currentVisitor.key}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (data.success) {
        message.success("Visitor updated successfully.");
        setIsModalVisible(false);
        fetchVisitors(); // Refresh the list after update
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.error(error);
      message.error("Error updating visitor.");
    } finally {
      setLoading(false);
    }
  };

  // Close modal without making changes
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Building",
      dataIndex: "building_name",
      key: "building_name",
    },
    {
      title: "Flat No.",
      dataIndex: "flat",
      key: "flat",
    },
    {
      title: "Mobile No",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Update",
      key: "update",
      render: (_, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            type="link"
            style={{ color: "#7b3e82" }}
            onClick={() => editVisitor(record)}
          />
          <Popconfirm
            title="Are you sure to delete this visitor?"
            onConfirm={() => deleteVisitor(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar username="Admin" />

      {/* Main Content */}
      <Layout>
        <TitleHeader title="View Visitors" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <Search
            placeholder="Search"
            allowClear
            style={{
              width: 300,
              marginBottom: "20px",
              borderColor: "#4b244a",
            }}
          />
          <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            pagination={{ pageSize: 5 }}
          />
        </Content>
      </Layout>

      {/* Edit Visitor Modal */}
      <Modal
        title="Edit Visitor"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: currentVisitor?.name,
            building_name: currentVisitor?.building_name,
            flat: currentVisitor?.flat,
            mobile: currentVisitor?.mobile,
            email: currentVisitor?.email,
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the visitor's name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="building_name"
            label="Building"
            rules={[{ required: true, message: "Please input the building name!" }]}
          >
            <Select placeholder="Select Building">
              {buildingList.map((building) => (
                <Option key={building.id} value={building.building_name}>
                  {building.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="flat" label="Flat No.">
            <Input />
          </Form.Item>
          <Form.Item
            name="mobile"
            label="Mobile No."
            rules={[{ required: true, message: "Please input the mobile number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", message: "Please input a valid email!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ViewVisitors;
