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
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "../../App.css";

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const ViewTenants = () => {
  const [dataSource, setDataSource] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);
  const [form] = Form.useForm();

  const fetchTenants = async () => {
    try {
      const response = await fetch(
        "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setDataSource(data?.data?.filter(user => user.roles[0]?.name === "Tenant") || []);
      } else {
        message.error("Failed to fetch tenants");
      }
    } catch (error) {
      message.error("Error fetching tenants");
      console.error(error);
    }
  };

  const fetchBuildings = async () => {
    try {
      const response = await fetch(
        "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/buildings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setBuildingList(data.data);
      } else {
        message.error("Failed to fetch buildings");
      }
    } catch (error) {
      message.error("Error fetching buildings");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

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
        fetchTenants();
      } else {
        message.error("Failed to delete tenant");
      }
    } catch (error) {
      message.error("Error deleting tenant");
      console.error(error);
    }
  };

  const showEditModal = (record) => {
    fetchBuildings();
    setEditingTenant(record);
    form.setFieldsValue({
      full_name: record.name,
      building_name: record.building_name,
      flat_no: record.flat_no,
      mobile_no: record.mobile_no,
      email: record.email,
    });
    setIsModalVisible(true);
  };

  const showAddModal = () => {
    fetchBuildings();
    setEditingTenant(null);
    form.resetFields();
    setIsModalVisible(true);
  };

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
        fetchTenants();
      } else {
        message.error(data.message || "Failed to update tenant");
      }
    } catch (error) {
      message.error("Error updating tenant");
      console.error(error);
    }
  };

  const handleAddTenant = async (values) => {
    try {
      const response = await fetch(
        `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/tenant`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (data.success) {
        message.success("Tenant added successfully");
        setIsModalVisible(false);
        fetchTenants();
      } else {
        message.error(data.message || "Failed to add tenant");
      }
    } catch (error) {
      message.error("Error adding tenant");
      console.error(error);
    }
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
      render: (text) => text?.split("T")[0],
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
    <Layout>
      <Content>
        <div className="flex justify-between items-center mb-4">
          <Search
            placeholder="Search"
            allowClear
            style={{
              width: 300,
              marginBottom: "10px",
              borderColor: "#4b244a",
            }}
          />
          <div className="flex gap-2">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={showAddModal}
            >
              Add Tenant
            </Button>
          </div>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="id"
        />
      </Content>

      <Modal
        title={editingTenant ? "Edit Tenant" : "Add Tenant"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              editingTenant
                ? handleUpdateTenant(values)
                : handleAddTenant(values);
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
                <Option
                  key={building.building_name}
                  value={building.building_name}
                >
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
  );
};

export default ViewTenants;
