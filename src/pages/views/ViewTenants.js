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
  Upload,
  Switch,
  DatePicker,
  Avatar,
  Spin,
} from "antd";
import {
  EditOutlined,
  UploadOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "../../App.css";
import SearchBar from "../../components/SearchBar";
import dayjs from "dayjs";

const { Content } = Layout;
const { Option } = Select;

const ViewTenants = ({ realEstateID, buildingName, buildingID, isViewAll }) => {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [buildings, setBuildings] = useState([]);
const [apartments, setApartments] = useState([]);
const [filteredApartments, setFilteredApartments] = useState([]);

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
        setBuildings(data.data || []);
      } else {
        message.error("Failed to fetch buildings");
      }
    } catch (error) {
      message.error("Error fetching buildings");
      console.error(error);
    }
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

  const fetchTenants = async () => {
    try {
      setLoading(true);
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
        const filtered = isViewAll
          ? data?.data?.filter(
            (user) =>
              user.roles[0]?.name === "Tenant"
          )
          : data?.data?.filter(
              (user) =>
                user.roles[0]?.name === "Tenant" &&
                user.building_id === buildingID
            );

            if (isViewAll)
            {
              const tenantsWithBuildingName = filtered.map((tenant) => {
                const building = buildings.find((b) => b.id === tenant.building_id);
                return { ...tenant, building_name: building?.building_name || "-" };
              });
        
              setDataSource(tenantsWithBuildingName);
              setFilteredData(tenantsWithBuildingName);
            }
            else
            {
              setDataSource(filtered || []);
              setFilteredData(filtered || []);
            }

      } else {
        message.error("Failed to fetch tenants");
      }
    } catch (error) {
      message.error("Error fetching tenants");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const fetchData = async () => {
    await fetchBuildings();
    await fetchApartments();
  };
  fetchData();
}, []);

useEffect(() => {
  if (buildings.length > 0) {
    fetchTenants();
  }
}, [buildings]);

  const handleUpload = ({ fileList }) => setFileList(fileList);

  const showModal = () => {
    setIsEditMode(false);
    form.resetFields();
    form.setFieldsValue({ building_name: buildingName });
    setFilteredApartments(apartments.filter(a => a.building_id === buildingID));
    setEditingUser(null);
    setImageUrl(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingUser(null);
    setImageUrl(null);
    setIsModalVisible(false);
    setFileList([]);
  };

  const handleAddUser = async (values) => {
    try {
      setSubmitLoading(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone_no", values.phone);
      if (values.password?.length > 0) {
        formData.append("password", values.password);
      }
      formData.append("role", "Tenant");
      formData.append("real_estate_id", realEstateID);
      formData.append("status", values.status ? 1 : 0);
      formData.append("dob", values.dob ? values.dob.format("YYYY-MM-DD") : "");
      formData.append("nationality", values.nationality);
      formData.append("building_id", buildingID);
      formData.append("apartment_id", parseInt(values.flat_no));

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("profile_picture", fileList[0].originFileObj);
      }

      let url = "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/users";
      let method = "POST";

      if (editingUser) {
        url = `${url}/${editingUser.id}`;
        formData.append("_method", "PATCH");
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.success) {
        message.success(editingUser ? "Tenant updated!" : "Tenant added!");
        handleCancel();
        fetchTenants();
      } else {
        message.error(data.message || "Failed to save tenant.");
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    setImageUrl(record.profile_picture || null);
    setIsModalVisible(true);
    setIsEditMode(true);

    form.setFieldsValue({
      name: record.name,
      email: record.email,
      phone: record.phone_no,
      status: record.status,
      real_estate: record.real_estate_id || record.real_estate?.id,
      dob: record.dob ? dayjs(record.dob) : null,
      flat_no: record.apartment_id,
      nationality: record.nationality,
      building_name: buildingName,
    });
    setFileList([{ url: record.profile_picture }]);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(
        `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        message.success("Tenant deleted.");
        fetchTenants();
      } else {
        message.error(data.message || "Delete failed.");
      }
    } catch (error) {
      message.error("Error deleting tenant.");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.profile_picture} />
          {text}
        </div>
      ),
    },
    isViewAll && {
      title: "Building",
      dataIndex: "building_name",
      key: "building_name",
    },
    {
      title: "Flat No.",
      dataIndex: "apartment_id",
      key: "apartment_id",
      render: (id) => apartments.find((a) => a.id === id)?.area || "N/A",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_no",
      key: "phone_no",
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
    !isViewAll && {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            type="link"
            style={{ color: "#7b3e82" }}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure to delete this tenant?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger />
          </Popconfirm>
        </div>
      ),
    },
  ].filter(Boolean); // Remove falsy columns

  return (
    <Layout>
      <Content>
        <div className="flex justify-between items-center mb-4">
          <SearchBar
            data={dataSource}
            fieldsToSearch={["name", "email", "role", "real_estate_name"]}
            onFilteredData={setFilteredData}
          />
          {!isViewAll && (
            <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
              Add Tenant
            </Button>
          )}
        </div>

        <Spin spinning={loading}>
          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={{ pageSize: 8 }}
            rowKey="id"
          />
        </Spin>
      </Content>

      <Modal title={editingUser ? "Edit Tenant" : "Add Tenant"} open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form layout="vertical" form={form} onFinish={handleAddUser}>
          {/* ... Modal content remains unchanged from your original code */}
          {/* No need to change anything here unless adding extra fields for edit */}
          
          {/* Keep all your dynamic fields and Switch/status logic as-is */}
          {/* Just add editing logic on submit (already done above) */}

          <Form.Item label="Profile Picture">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUpload}
            beforeUpload={() => false}
          >
            {fileList.length < 1 && (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
          <div className="flex gap-4">
            <div className="w-1/2">
              <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Please enter full name" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: "Please enter phone number" }]}>
                <Input />
              </Form.Item>
            </div>
            <div className="w-1/2">
              <Form.Item label="Email Address" name="email" rules={[{ required: true, type: "email", message: "Please enter valid email" }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={
                  isEditMode
                    ? []
                    : [{ required: true, message: "Please input password" }]
                }
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: "Please enter date of birth" }]}><DatePicker style={{width: "100%"}}/></Form.Item>
              <Form.Item
                label="Building"
                name="building_name"
                rules={[{ required: true, message: "Please select a building" }]}
              >
                <Input disabled="true">
                </Input>
              </Form.Item>
            </div>
            <div className="w-1/2">
              <Form.Item label="Nationality" name="nationality" rules={[{ required: true, message: "Please enter nationality" }]}><Input /></Form.Item>
              <Form.Item label="Flat No" name="flat_no" rules={[{ required: true, message: "Please enter flat no." }]}>
                  <Select placeholder="Select flat">
                {filteredApartments.map((a) => (
                  <Option key={a.id} value={a.id}>{a.area}</Option>
                ))}
              </Select>
            </Form.Item>
            </div>
          </div>
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitLoading} className="w-full mt-4">
              {editingUser ? "Update Tenant" : "Add Tenant"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ViewTenants;
