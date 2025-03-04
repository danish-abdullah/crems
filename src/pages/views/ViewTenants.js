import React, { useEffect, useState } from "react";
import {
  Layout,
  Table,
  Input,
  Button,
  message,
  Popconfirm,
  Modal,
  Form,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../App.css";
import Sidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const ViewTenants = () => {
  const [dataSource, setDataSource] = useState([]);
  const [buildingList, setBuildingList] = useState([]); // State for building list
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);
  const [form] = Form.useForm();

  // Fetch the tenants list from the API
  const fetchTenants = async () => {
    try {
      const response = await fetch(
        "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/tenant",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setDataSource(data.data); // Set tenants data in state
      } else {
        message.error("Failed to fetch tenants");
      }
    } catch (error) {
      message.error("Error fetching tenants");
      console.error(error);
    }
  };

  // Fetch the building list from the API
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

  useEffect(() => {
    fetchTenants(); // Fetch tenants on component mount
    fetchBuildings(); // Fetch buildings on component mount
  }, []);

  // Delete tenant
  const deleteTenant = async (tenantId) => {
    try {
      const response = await fetch(
        `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/tenant/${tenantId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        message.success("Tenant deleted successfully");
        fetchTenants(); // Refresh tenant list after deletion
      } else {
        message.error("Failed to delete tenant");
      }
    } catch (error) {
      message.error("Error deleting tenant");
      console.error(error);
    }
  };

  // Show edit modal
  const showEditModal = (record) => {
    setEditingTenant(record);
    form.setFieldsValue(record); // Pre-fill form with tenant's data
    setIsModalVisible(true);
  };

  // Handle modal submission with PATCH
  const handleUpdateTenant = async (values) => {
    try {
      const response = await fetch(
        `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/tenant/${editingTenant.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (data.success) {
        message.success("Tenant updated successfully");
        setIsModalVisible(false);
        fetchTenants(); // Refresh tenant list after update
      } else {
        message.error(data.message || "Failed to update tenant");
      }
    } catch (error) {
      message.error("Error updating tenant");
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "name",
    },
    {
      title: "Building",
      dataIndex: "building_name",
      key: "building",
    },
    {
      title: "Flat No.",
      dataIndex: "flat_no",
      key: "flat",
    },
    {
      title: "Mobile No",
      dataIndex: "mobile_no",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Date Added",
      dataIndex: "created_at",
      key: "date",
      render: (text) => {
        const date = text.split("T")[0];
        return date; // Only return the date part (before 'T')
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            type="link"
            style={{ color: "#7b3e82" }}
            onClick={() => showEditModal(record)}
          />
          <Popconfirm
            title="Are you sure to delete this tenant?"
            onConfirm={() => deleteTenant(record.id)}
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
        <TitleHeader title="View Tenants" />
        <Content
          style={{ margin: "20px", padding: "20px", background: "white" }}
        >
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
            pagination={{ pageSize: 5 }}
            rowKey="id"
          />
        </Content>

        {/* Edit Modal */}
        <Modal
          title="Edit Tenant"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                handleUpdateTenant(values);
              })
              .catch((info) => {
                console.error("Validation Failed:", info);
              });
          }}
        >
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Name"
              name="full_name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Building"
              name="building_name"
              rules={[{ required: true, message: "Please select a building" }]}
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
              label="Flat No."
              name="flat_no"
              rules={[{ required: true, message: "Please enter the flat number" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mobile No"
              name="mobile_no"
              rules={[{ required: true, message: "Please enter the mobile number" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    </Layout>
  );
};

export default ViewTenants;
