import React, { useState, useEffect } from "react";
import { Layout, Table, Button, Modal, Form, Input, Select, Checkbox, message } from "antd";
import axios from "axios";
import "../../../App.css";
import Sidebar from "../../../components/VisitorSidebar";
import TitleHeader from "../../../components/TitleHeader";
import SearchBar from "../../../components/SearchBar";

const { Content } = Layout;
const { Option } = Select;

const ViewVisitors = () => {
  const [form] = Form.useForm();
  const [visitors, setVisitors] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVisitor, setEditingVisitor] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVisitors = async () => {
    try {
      const response = await axios.get("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/visitors");
      setVisitors(response.data);
      setFilteredData(response.data);
    } catch (error) {
      message.error("Failed to fetch visitors.");
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleAdd = () => {
    setEditingVisitor(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingVisitor(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (editingVisitor) {
        await axios.put(
          `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/visitors/${editingVisitor.id}`,
          values
        );
        message.success("Visitor updated successfully!");
      } else {
        await axios.post("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/visitors", values);
        message.success("Visitor added successfully!");
      }

      setModalVisible(false);
      fetchVisitors();
    } catch (error) {
      message.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Submission Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Building",
      dataIndex: "building_id",
      key: "building_id",
    },
    {
      title: "Flat No.",
      dataIndex: "apartment_id",
      key: "apartment_id",
    },
    {
      title: "Flat Type",
      dataIndex: "apartment_type",
      key: "apartment_type",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Mobile No",
      dataIndex: "phone_no",
      key: "phone_no",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar username="Receptionist" selectedTab="viewVisitors" />
      <Layout>
        <TitleHeader title="View Visitors" />
        <Content style={{ margin: "20px", padding: "20px", background: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <SearchBar
              data={visitors}
              fieldsToSearch={["full_name", "building_id", "email"]}
              onFilteredData={setFilteredData}
            />
            <Button type="primary" onClick={handleAdd} style={{ background: "#a94442" }}>
              Add Visitor
            </Button>
          </div>

          <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />

          <Modal
            title={editingVisitor ? "Edit Visitor" : "Add New Visitor"}
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            onOk={handleModalSubmit}
            confirmLoading={loading}
            okText={editingVisitor ? "Update" : "Add"}
            okButtonProps={{ style: { background: "#a94442", borderColor: "#a94442" } }}
          >
            <Form layout="vertical" form={form}>
            <div className="flex gap-4">
            <div className="w-1/2">
              <Form.Item name="full_name" label="Full Name" rules={[{ required: true }]}>
                <Input placeholder="Enter your full name" />
              </Form.Item>
              <Form.Item name="phone_no" label="Phone Number" rules={[{ required: true }]}>
                <Input placeholder="+971-XX-XXXXXXX" />
              </Form.Item>
              <Form.Item name="building_id" label="Building Name" rules={[{ required: true }]}>
                <Input placeholder="Enter your building name" />
              </Form.Item>
              <Form.Item name="apartment_id" label="Flat Number" rules={[{ required: true }]}>
                <Input placeholder="Enter Flat Number" />
              </Form.Item>
              </div>
              <div className="w-1/2">
              <Form.Item name="email" label="Email Address" rules={[{ required: true, type: "email" }]}>
                <Input placeholder="Enter your email address" />
              </Form.Item>
              <Form.Item name="nationality" label="Nationality" rules={[{ required: true }]}>
                <Input placeholder="Enter your nationality" />
              </Form.Item>
              <Form.Item name="apartment_type" label="Flat Type" rules={[{ required: true }]}>
                <Select placeholder="Select your flat type">
                  <Option value="studio">Studio Apartment</Option>
                  <Option value="1bhk">1 Bedroom</Option>
                  <Option value="2bhk">2 Bedroom</Option>
                  <Option value="3bhk">3 Bedroom</Option>
                  <Option value="4bhk">4 Bedroom</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Extra Facility" style={{ marginBottom: 0 }}>
                <Form.Item name="balcony" valuePropName="checked" noStyle>
                  <Checkbox>Balcony</Checkbox>
                </Form.Item>
                <Form.Item name="maid_room" valuePropName="checked" noStyle>
                  <Checkbox style={{ marginLeft: "16px" }}>Maid Room</Checkbox>
                </Form.Item>
              </Form.Item>
              </div>
              </div>
              <Form.Item name="comments" label="Comments">
                <Input.TextArea placeholder="Write here..." rows={3} />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewVisitors;
