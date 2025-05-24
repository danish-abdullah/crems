import dayjs from "dayjs"
import React, { useState, useEffect } from "react";
import {
  Layout, Table, Button, Input, Dropdown, Menu, Tag, Avatar, Modal, Space, Popconfirm,
  Form, Select, Upload, Switch, DatePicker, Checkbox, message, Spin
} from "antd";
import {
  SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined,
  UploadOutlined, DeleteOutlined
} from "@ant-design/icons";
import AdminSidebar from "../../components/AdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";
import "../../App.css";
import SearchBar from "../../components/SearchBar.js";

const { Content } = Layout;
const { Option } = Select;

// const menu = (
//   <Menu>
//     <Menu.Item key="1">Date</Menu.Item>
//     <Menu.Item key="2">Flat Type</Menu.Item>
//     <Menu.Item key="3">Building</Menu.Item>
//   </Menu>
// );

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [realEstates, setRealEstates] = useState([]);
  const [buildings, setBuildings] = useState([]);
      const [apartments, setApartments] = useState([]);
      const [filteredApartments, setFilteredApartments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isOutsourced, setIsOutsourced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // NEW
  const [fileList, setFileList] = useState([]);
  const [filteredData, setFilteredData] = useState(users);

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

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      const formattedUsers = data?.data?.map((item, index) => ({
        id: item.id,
        key: index + 1,
        name: item.name,
        email: item.email,
        phone: item.phone_no || "-",
        type: item.roles[0]?.name || "-",
        // module: item.assigned_module || "-",
        // realState: item.real_state_company || "-",
        status: item.status === 1 ? "Active" : "Inactive",
        avatar: item.profile_picture,
        real_estate_id: item.real_estate_id,

        dob: item.dob ? dayjs(item.dob) : null,
      flat_no: item.apartment_id,
      // creation_date: item.creation_date ? moment(item.creation_date) : null,
      nationality: item.nationality,
      building: item.building_id,
      // joining_date: item.joining_date ? moment(item.joining_date) : null,
      // maintenance_id: item.maintenance_id,
      designation: item.designation,
      is_outsourced: item.is_outsource,
      company_name: item.company_name,
      company_phone: item.company_phone,
      categories: item.categories,
      })) || [];

    //   const realEstateMap = {};
    // realEstatesList.forEach((estate) => {
    //   realEstateMap[estate.id] = estate.real_estate_name;
    // });
  
      // Enrich users with real_estate_name
      // const enrichedUsers = formattedUsers.map((user) => ({
      //   ...user,
      //   real_estate_name: realEstateMap[user.real_estate_id] || "-", // fallback
      //   key: user.id,
      // }));
  
      setUsers(formattedUsers);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRealEstates = async () => {
    try {
      const response = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/real-estates", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
  
      const data = await response.json();
      
      if (response.ok && data.success) {
        setRealEstates(data.data);
        return data.data;
      } else {
        message.error(data.message || "Failed to fetch real estates.");
      }
    } catch (error) {
      message.error("Error fetching real estates.");
    }
  };
  
  const fetchBuildings = async () => {
    try {
      const response = await fetch("https://website-64a18929.yeo.vug.mybluehost.me/api/admin/buildings", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        setBuildings(data.data);
      } else {
        message.error(data.message || "Failed to fetch buildings.");
      }
    } catch (error) {
      message.error("Error fetching buildings.");
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchBuildings();
      await fetchApartments();
      // const realEstatesList = await fetchRealEstates();
      await fetchUsers();
    };

    fetchInitialData();
  }, []);

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const showModal = () => {
    setIsEditMode(false);
    form.resetFields();
    setEditingUser(null);
    setImageUrl(null);
    setUserType(null);
    setIsOutsourced(false);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingUser(null);
    setImageUrl(null);
    setUserType(null);
    setIsOutsourced(false);
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
      formData.append("role", userType?.toLowerCase() || "user");
      // formData.append("real_estate_id", values.real_estate);
      formData.append("status", values.status ? 1 : 0);

      if (userType === 'Tenant')
      {
        formData.append("dob", values.dob ? values.dob.format('YYYY-MM-DD') : null);
        formData.append("nationality", values.nationality);
        formData.append("building_id", values.building);
        formData.append("apartment_id", parseInt(values.flat_no));
      }
      else if (userType === 'Maintenance')
      {
        formData.append("designation", values.designation);
        formData.append("building_id", values.building);
        formData.append("is_outsource", values.is_outsourced? 1 : 0);
        formData.append("categories", JSON.stringify(values.categories));
        formData.append("company_name", values.company_name);
        formData.append("company_phone", values.company_phone);
      }

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("profile_picture", fileList[0].originFileObj);
      }

      let url = "https://website-64a18929.yeo.vug.mybluehost.me/api/admin/users";
      let method = "POST";

      if (editingUser) {
        url = `https://website-64a18929.yeo.vug.mybluehost.me/api/admin/users/${editingUser.id}`;
        formData.append("_method", "PATCH");
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        message.success(editingUser ? "User updated successfully!" : "User added successfully!");
        handleCancel();
        fetchUsers();
      } else {
        message.error(data.message || "Failed to save user.");
      }

    } catch (err) {
      message.error("Error submitting user data.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    setImageUrl(record.avatar || null);
    setUserType(record.type);
    setIsModalVisible(true);
    setIsEditMode(true);

    form.setFieldsValue({
      name: record.name,
      email: record.email,
      phone: record.phone,
      user_type: record.type,
      status: record.status === "Active",
      // real_estate: record.real_estate_id || record.real_estate?.id,
      // Add these if available:
      dob: record.dob ? dayjs(record.dob) : null,
      flat_no: record.flat_no,
      // creation_date: record.creation_date ? moment(record.creation_date) : null,
      nationality: record.nationality,
      building: record.building,
      // joining_date: record.joining_date ? moment(record.joining_date) : null,
      maintenance_id: record.maintenance_id,
      designation: record.designation,
      is_outsourced: record.is_outsourced,
      company_name: record.company_name === "undefined" ? "" : record.company_name,
      company_phone: record.company_phone === "undefined" ? "" : record.company_phone,
      // categories: record.categories,
    });
    setFileList([
      {
        uid: '-1',
        name: 'Profile Picture',
        status: 'done',
        url: record.avatar,
      },
    ]);
    setIsOutsourced(record.is_outsourced || false);    
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`https://website-64a18929.yeo.vug.mybluehost.me/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        message.success("User deleted successfully.");
        fetchUsers();
      } else {
        message.error(data.message || "Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Error deleting user.");
    }
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.avatar} />
          {text}
        </div>
      ),
    },
    // { title: "Real Estate", dataIndex: "real_estate_name", key: "real_estate_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "User Type", dataIndex: "type", key: "type" },
    // { title: "Assigned Module", dataIndex: "module", key: "module" },
    // { title: "Real State", dataIndex: "realState", key: "realState" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="link" onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger />
          </Popconfirm>
        </Space>
      ),
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar username="Admin" selectedTab="userManagement" />
      <Layout>
        <TitleHeader title="User Management" />
        <Content className="p-6 bg-white">
          <div className="flex justify-between items-center mb-4">
          <SearchBar
            data={users}
            fieldsToSearch={['name', 'email', 'role', 'real_estate_name']}
            onFilteredData={setFilteredData}
          />
            <div className="flex gap-2">
              {/* <Dropdown overlay={menu} placement="bottomLeft">
                <Button icon={<FilterOutlined />}>Filter By</Button>
              </Dropdown> */}
              <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>Add User</Button>
            </div>
          </div>
          {loading ? <Spin /> : <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 10 }} />}
        </Content>
      </Layout>

      {/* Add/Edit Modal */}
      <Modal title={editingUser ? "Edit User" : "Add User"} open={isModalVisible} onCancel={handleCancel} footer={null}>
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
          {/* <div className="flex gap-4">
          <div className="w-1/2"> */}
          <Form.Item label="User Type" name="user_type" rules={[{ required: true }]}>
            <Select placeholder="Select user type" onChange={setUserType}>
              {/* <Option value="Admin">Admin</Option> */}
              <Option value="Sales">Sales</Option>
              <Option value="Tenant">Tenant</Option>
              <Option value="Maintenance">Maintenance</Option>
              {/* <Option value="Visitor">Visitor</Option> */}
              <Option value="Watchmen">Receptionist/Watchman</Option>
            </Select>
          </Form.Item>
          {/* </div>
          <div className="w-1/2">
          <Form.Item
            label="Real Estate"
            name="real_estate"
            rules={[{ required: true, message: "Please select a real estate" }]}
          >
            <Select placeholder="Select Real Estate">
              {realEstates.map((estate, index) => (
                <Option key={estate.id} value={estate.id}>
                  {estate.real_estate_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          </div>
          </div> */}

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

          {/* Dynamic Fields */}
          {userType === "Tenant" && (
            <>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Form.Item label="Date of Birth" name="dob"rules={[{ required: true, message: "Please enter date of birth" }]}><DatePicker style={{width: "100%"}}/></Form.Item>
                  <Form.Item
                    label="Building"
                    name="building"
                    rules={[{ required: true, message: "Please select a building" }]}
                  >
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
                  {/* <Form.Item label="Creation Date" name="creation_date"><DatePicker /></Form.Item> */}
                </div>
                <div className="w-1/2">
                  <Form.Item label="Nationality" name="nationality" rules={[{ required: true, message: "Please enter nationality" }]}><Input /></Form.Item>
                  <Form.Item label="Flat No" name="flat_no" rules={[{ required: true, message: "Please enter flat no." }]}>
                        <Select placeholder="Select flat" disabled={!form.getFieldValue("building")}>
                      {filteredApartments.map((a) => (
                        <Option key={a.id} value={a.id}>{a.area}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  
                  {/* <Form.Item label="Joining Date" name="joining_date"><DatePicker /></Form.Item> */}
                </div>
              </div>
            </>
          )}

          {userType === "Maintenance" && (
            <>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Form.Item label="Designation" name="designation"><Input /></Form.Item>
                  <Form.Item label="Is Outsourced" name="is_outsourced"><Switch onChange={setIsOutsourced} /></Form.Item>
                  {isOutsourced && (
                    <>
                      <Form.Item label="Company Name" name="company_name"><Input /></Form.Item>
                    </>
                  )}
                </div>
                <div className="w-1/2">
                <Form.Item
                    label="Building"
                    name="building"
                    rules={[{ required: true, message: "Please select a building" }]}
                  >
                    <Select placeholder="Select Building">
                      {buildings.map((building, index) => (
                        <Option key={building.id} value={building.id}>
                          {building.building_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {/* <Form.Item label="Categories" name="categories">
                    <Checkbox.Group options={["Plumbing", "Electrical", "Paint", "Lift"]} />
                  </Form.Item> */}
                  {isOutsourced && (
                    <>
                      <Form.Item style={{marginTop: "108px"}}  label="Company Phone" name="company_phone"><Input /></Form.Item>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {/* {userType === "Visitor" && (
            <>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Form.Item label="Assigned Building" name="building"><Input /></Form.Item>
                  <Form.Item label="Flat Type" name="flat_type"><Checkbox.Group options={["Studio", "1BHK", "2BHK", "3BHK"]} /></Form.Item>
                  <Form.Item label="Submission Date" name="submission_date"><DatePicker /></Form.Item>
                </div>
                <div className="w-1/2">
                  <Form.Item label="Notification Preference" name="notification_preference"><Checkbox.Group options={["Email", "SMS", "WhatsApp"]} /></Form.Item>
                  <Form.Item label="Amenities" name="amenities"><Checkbox.Group options={["Pool", "Gym", "Parking"]} /></Form.Item>
                  <Form.Item label="Desired Start Date" name="start_date"><DatePicker /></Form.Item>
                </div>
              </div>
            </>
          )} */}
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitLoading} className="w-full mt-4">
              {editingUser ? "Update User" : "Add User"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default UserManagement;
