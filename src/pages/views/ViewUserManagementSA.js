import React, { useState } from "react";
import { Layout, Table, Button, Input, Dropdown, Menu, Tag, Avatar, Modal, Form, Select, Upload, Switch, DatePicker, Checkbox } from "antd";
import { SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import SuperAdminSidebar from "../../components/SuperAdminSidebar.js";
import TitleHeader from "../../components/TitleHeader.js";
import "../../App.css";

const { Content } = Layout;
const { Option } = Select;

const menu = (
    <Menu>
        <Menu.Item key="1">Date</Menu.Item>
        <Menu.Item key="2">Flat Type</Menu.Item>
        <Menu.Item key="3">Building</Menu.Item>
    </Menu>
);

const users = [
    { key: 1, name: "John Doe", email: "Johndoe12@yopmail.com", phone: "+971-76-8763451", type: "Admin", module: "Visitor", realState: "AR Builders", status: "Active", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
    { key: 2, name: "John Doe", email: "Johndoe12@yopmail.com", phone: "+971-76-8763451", type: "Salesperson", module: "Sales", realState: "Simma Villas", status: "Inactive", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
    { key: 3, name: "John Doe", email: "Johndoe12@yopmail.com", phone: "+971-76-8763451", type: "Maintenance", module: "Tenant", realState: "AR Builders", status: "Active", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
];

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
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "User Type", dataIndex: "type", key: "type" },
    { title: "Assigned Module", dataIndex: "module", key: "module" },
    { title: "Real State", dataIndex: "realState", key: "realState" },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
            <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
        ),
    },
    {
        title: "Action",
        key: "action",
        render: () => <EditOutlined className="text-red-500 cursor-pointer" />,
    },
];

const UserManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [userType, setUserType] = useState(null);
    const [isOutsourced, setIsOutsourced] = useState(false);

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    const handleUpload = ({ file }) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImageUrl(null);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SuperAdminSidebar />
            <Layout>
                <TitleHeader title="User Management" />
                <Content className="p-6 bg-white">
                    <div className="flex justify-between items-center mb-4">
                        <Input placeholder="Search" prefix={<SearchOutlined />} className="w-1/3" />
                        <div className="flex gap-2">
                            <Dropdown overlay={menu} placement="bottomLeft">
                                <Button icon={<FilterOutlined />}>Filter By</Button>
                            </Dropdown>
                            <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>Add User</Button>
                        </div>
                    </div>
                    <Table columns={columns} dataSource={users} pagination={{ pageSize: 10 }} />
                </Content>
            </Layout>

            {/* Add User Modal */}
            <Modal title="Add User" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form layout="vertical" form={form}>
                    <div>
                        <Form.Item label="Profile Picture">
                            <Upload showUploadList={false} beforeUpload={() => false} onChange={handleUpload}>
                                <div className="relative w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden">
                                    {imageUrl ? <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" /> : <UploadOutlined className="text-gray-500 text-xl" />}
                                </div>
                            </Upload>
                            {imageUrl && (
                                <Button onClick={handleRemoveImage} icon={<DeleteOutlined />} className="mt-2"></Button>
                            )}
                        </Form.Item>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Please enter full name" }]}>
                                <Input placeholder="Enter your full name" />
                            </Form.Item>
                            <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: "Please enter phone number" }]}>
                                <Input placeholder="Enter phone number" />
                            </Form.Item>
                        </div>
                        <div className="w-1/2">
                            <Form.Item label="Email Address" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
                                <Input placeholder="Enter email address" />
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter password" }]}>
                                <Input.Password placeholder="Enter password" />
                            </Form.Item>
                        </div>
                    </div>
                    <div>
                        <Form.Item label="User Type" name="userType" rules={[{ required: true, message: "Please select user type" }]}>
                            <Select placeholder="Select user type" onChange={setUserType}>
                                <Option value="Admin">Admin</Option>
                                <Option value="Sales Person">Sales Person</Option>
                                <Option value="Tenant">Tenant</Option>
                                <Option value="Maintenance">Maintenance</Option>
                                <Option value="Visitor">Visitor</Option>
                                <Option value="Receptionist/Watchman">Receptionist/Watchman</Option>
                            </Select>
                        </Form.Item>
                        {userType === "Tenant" && (
                            <>
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <Form.Item label="Date of Birth" name="dob"> <DatePicker /> </Form.Item>
                                        <Form.Item label="Flat No" name="flatNo"> <Input /> </Form.Item>
                                        <Form.Item label="Creation Date" name="creationDate"> <DatePicker /> </Form.Item>
                                    </div>
                                    <div className="w-1/2">
                                        <Form.Item label="Nationality" name="nationality"> <Input /> </Form.Item>
                                        <Form.Item label="Assigned Building" name="building"> <Input /> </Form.Item>
                                        <Form.Item label="Joining Date" name="joiningDate"> <DatePicker /> </Form.Item>
                                    </div>
                                </div>
                            </>
                        )}

                        {userType === "Maintenance" && (
                            <>
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <Form.Item label="Maintenance ID" name="maintenanceId"> <Input /> </Form.Item>
                                        <Form.Item label="Designation" name="designation"> <Input /> </Form.Item>
                                        <Form.Item label="Is Outsourced" name="isOutsourced"> <Switch onChange={setIsOutsourced} /> </Form.Item>
                                    </div>
                                    <div className="w-1/2">
                                        <Form.Item label="Assigned Building" name="building"> <Input /> </Form.Item>
                                        {isOutsourced && (
                                            <>
                                                <Form.Item label="Company Name" name="companyName"> <Input /> </Form.Item>
                                                <Form.Item label="Company Phone" name="companyPhone"> <Input /> </Form.Item>
                                            </>
                                        )}
                                        <Form.Item label="Categories" name="categories">
                                            <Checkbox.Group options={["Plumbing", "Electrical", "Paint", "Lift"]} />
                                        </Form.Item>
                                    </div>
                                </div>
                            </>
                        )}

                        {userType === "Visitor" && (
                            <>
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                <Form.Item label="Assigned Building" name="building"> <Input /> </Form.Item>
                                <Form.Item label="Flat Type" name="flatType">
                                    <Checkbox.Group options={[ "Studio", "1BHK", "2BHK", "3BHK"]} />
                                </Form.Item>
                                <Form.Item label="Submission Date" name="submissionDate"> <DatePicker /> </Form.Item>
                                </div>
                                <div className="w-1/2">
                                <Form.Item label="Notification Preference" name="notificationPreference">
                                    <Checkbox.Group options={["Email", "SMS", "WhatsApp"]} />
                                </Form.Item>
                                <Form.Item label="Amenities" name="amenities">
                                    <Checkbox.Group options={["Pool", "Gym", "Parking"]} />
                                </Form.Item>
                                <Form.Item label="Desired Start Date" name="startDate"> <DatePicker /> </Form.Item>
                                </div>
                                </div>
                            </>
                        )}
                        <Form.Item label="Status" name="status" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button type="primary" block> Add </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default UserManagement;
