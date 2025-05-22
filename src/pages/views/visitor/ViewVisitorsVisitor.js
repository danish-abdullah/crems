import React, { useState, useEffect } from "react";
import { Layout, Table, Button, Modal, Form, Input, Select, Checkbox, message } from "antd";
import axios from "axios";
import "../../../App.css";
import Sidebar from "../../../components/VisitorSidebar";
import TitleHeader from "../../../components/TitleHeader";
import SearchBar from "../../../components/SearchBar";
import {
  SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined,
  UploadOutlined, DeleteOutlined
} from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;

const ViewVisitors = () => {
  const [form] = Form.useForm();
  const [visitors, setVisitors] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVisitor, setEditingVisitor] = useState(null);
  const [buildings, setBuildings] = useState([]);
const [apartments, setApartments] = useState([]);
const [filteredApartments, setFilteredApartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVisitors = async () => {
    try {
      const response = await fetch(
        "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/visitors",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.json();
      const formattedUsers = data?.data?.map((item, index) => ({
        key: index + 1,
        id: item.id,
        full_name: item.full_name,
        created_at: item.created_at,
        building_id: item.building_id,
        apartment_id: item.apartment_id,
        apartment_type: item.apartment_type,
        email: item.email,
        phone_no: item.phone_no,
        nationality: item.nationality,
        comments: item.comments,
        balcony: item.balcony,
        maid_room: item.maid_room
      })) || [];
      setVisitors(formattedUsers);
      setFilteredData(formattedUsers);
    } catch (error) {
      message.error("Failed to fetch visitors.");
    }
  };

  useEffect(() => {
    fetchBuildings();
    fetchApartments();
  }, []);

  const fetchBuildings = async () => {
    const res = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/buildings",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const data = await res.json();
    setBuildings(data?.data || []);
  };

  const fetchApartments = async () => {
    const res = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/apartments",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const data = await res.json();
    setApartments(data?.data || []);
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

  useEffect(() => {
    if (editingVisitor?.building_id) {
      const relevant = apartments.filter(
        (apt) => apt.building_id === editingVisitor.building_id
      );
      setFilteredApartments(relevant);
    }
  }, [editingVisitor, apartments]);
  

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
  
      const payload = editingVisitor
        ? { ...values, _method: "PATCH" }
        : values;
  
      const url = editingVisitor
        ? `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/visitors/${editingVisitor.id}`
        : `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/visitors`;
  
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) throw new Error();
      message.success(editingVisitor ? "Visitor updated!" : "Visitor added!");
      setModalVisible(false);
      fetchVisitors();
    } catch {
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
      render: (id) => buildings.find((b) => b.id === id)?.name || "N/A",
    },
    {
      title: "Flat No.",
      dataIndex: "apartment_id",
      key: "apartment_id",
      render: (id) => apartments.find((a) => a.id === id)?.flat_number || "N/A",
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
        <Button type="link" icon={<EditOutlined/>} onClick={() => handleEdit(record)}>
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

          <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 7 }} />

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
              <Select
                placeholder="Select building"
                onChange={(value) => {
                  form.setFieldsValue({ apartment_id: null }); // reset apartment
                  setFilteredApartments(apartments.filter(a => a.building_id === value));
                }}
              >
                {buildings.map((b) => (
                  <Option key={b.id} value={b.id}>{b.building_name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="apartment_id" label="Flat Number" rules={[{ required: true }]}>
              <Select placeholder="Select flat" disabled={!form.getFieldValue("building_id")}>
                {filteredApartments.map((a) => (
                  <Option key={a.id} value={a.id}>{a.area}</Option>
                ))}
              </Select>
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
                  <Option value="residential">Residential</Option>
                  <Option value="commercial">Commercial</Option>
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
