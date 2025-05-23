import React from "react";
import { Layout, Menu, Avatar, message } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  PlusOutlined,
  FileTextOutlined,
  HomeOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import Logo from "../assets/logo.png";
import "../App.css"; // Ensure you have a separate CSS file for styling
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const { Sider } = Layout;
const { SubMenu } = Menu;

const AdminSidebar = ({ username, selectedTab }) => {
    const navigate = useNavigate(); // Initialize navigate
    const [userDetails, setUserDetails] = useState([]);

useEffect(() => {
        fetchUserDetails();
      }, []);

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
          setUserDetails(data.data);
        } else {
          message.error(data.message || "Failed to fetch user details");
        }
      } catch (error) {
        message.error("Failed to fetch user details");
        console.error("Fetch User Details Error:", error);
      }
    };
    
    const handleMenuClick = ({ key }) => {
        if (key === "adminDashboard") {
          navigate("/admin-dashboard");
        }  
        else if (key === "userManagement") {
          navigate("/view-user-management-admin");
        }  
        else if (key === "viewBuildings") {
          navigate("/view-real-estates-admin");
        }  
        else if (key === "addTenant") {
          navigate("/add-tenant");
        }
        else if (key === "addVisitor") {
          navigate("/add-visitor");
        }
        else if (key === "addBuilding") {
          navigate("/add-building");
        }
        else if (key === "addApartment") {
          navigate("/add-apartment");
        }
        else if (key === "addSales") {
          navigate("/add-sales");
        }
        else if (key === "addMaintenance") {
          navigate("/add-maintenance");
        }
        else if (key === "viewApartments") {
          navigate("/view-apartments");
        }
        else if (key === "viewTenants") {
          navigate("/view-tenants");
        }
        else if (key === "viewTenantsList") {
          navigate("/view-tenants-admin");
        }
        // else if (key === "viewBuildings") {
        //   navigate("/view-buildings");
        // }
        else if (key === "viewVisitors") {
          navigate("/view-visitors");
        }
        else if (key === "viewSales") {
          navigate("/view-sales");
        }
        else if (key === "viewMaintenance") {
          navigate("/view-maintenance");
        }
        else if (key === "viewMaintenanceRequests") {
          navigate("/view-maintenance-requests");
        }
        else if (key === "viewComplaints") {
          navigate("/view-complaints-admin");
        }
        else if (key === "addComplaint") {
          navigate("/add-complaint-admin");
        }
        else if (key === "addMaintenanceRequest") {
          navigate("/add-maintenance-request-admin");
        }
      };
  return (
    <Sider className="sidebar">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="avatar-container">
        <Avatar src={userDetails.profile_picture || null} icon={!userDetails.profile_picture && <UserOutlined />} size={64}/>
        <div className="avatar-text">
          <span>{userDetails.name}</span>
          <br />
          <small>Admin</small>
        </div>
      </div>
      <div className="menu-container">
        <Menu
          mode="inline"
          onClick={handleMenuClick}
          selectedKeys={[selectedTab]}
        >
          <Menu.Item className="main-item" key="adminDashboard" icon={<UserOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item className="main-item" key="userManagement" icon={<UserOutlined />}>
            User Management
          </Menu.Item>
          <Menu.Item className="main-item" key="viewBuildings" icon={<UserOutlined />}>
            Buildings
          </Menu.Item>
          <Menu.Item className="main-item" key="viewApartments" icon={<UserOutlined />}>
            Apartments
          </Menu.Item>
          <Menu.Item className="main-item" key="viewTenantsList" icon={<UserOutlined />}>
            Tenants
          </Menu.Item>
          <Menu.Item className="main-item" key="viewComplaints" icon={<UserOutlined />}>
            Complaints
          </Menu.Item>
          {/* <Menu.Item className="main-item" key="">
          </Menu.Item>
          <Menu.Item className="main-item" key="">
          </Menu.Item>
          <SubMenu key="visitor" icon={<UserOutlined />} title="Visitor">
          <Menu.Item key="addVisitor" icon={<PlusOutlined />}>
              Add Visitor
            </Menu.Item>
            <Menu.Item key="viewVisitors" icon={<FileTextOutlined />}>
              View Visitors
            </Menu.Item>
          </SubMenu>
          <SubMenu key="tenant" icon={<TeamOutlined />} title="Tenant">
            <Menu.Item key="addTenant" icon={<PlusOutlined />}>
              Add Tenant
            </Menu.Item>
            <Menu.Item key="viewTenants" icon={<FileTextOutlined />}>
              View Tenants
            </Menu.Item>
          </SubMenu>
          <SubMenu key="apartment" icon={<ApartmentOutlined />} title="Apartment">
          <Menu.Item key="addApartment" icon={<PlusOutlined />}>
              Add Apartment
            </Menu.Item>
            <Menu.Item key="viewApartments" icon={<FileTextOutlined />}>
              View Apartments
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sales" icon={<UserOutlined />} title="Sales">
          <Menu.Item key="addSales" icon={<PlusOutlined />}>
              Add Salesperson
            </Menu.Item>
            <Menu.Item key="viewSales" icon={<FileTextOutlined />}>
              View Salespersons
            </Menu.Item>
          </SubMenu>
          <SubMenu key="maintenance" icon={<UserOutlined />} title="Maintenance">
          <Menu.Item key="addMaintenance" icon={<PlusOutlined />}>
              Add Maintenance
            </Menu.Item>
            <Menu.Item key="viewMaintenance" icon={<FileTextOutlined />}>
              View Maintenance
            </Menu.Item>
            <Menu.Item key="addMaintenanceRequest" icon={<PlusOutlined />}>
              Add Request
            </Menu.Item>
            <Menu.Item key="viewMaintenanceRequests" icon={<FileTextOutlined />}>
              View Requests
            </Menu.Item>
          </SubMenu>
          <SubMenu key="complaints" icon={<UserOutlined />} title="Complaints">
            <Menu.Item key="addComplaint" icon={<PlusOutlined />}>
              Add Complaint
            </Menu.Item>
            <Menu.Item key="viewComplaints" icon={<FileTextOutlined />}>
              View Complaints
            </Menu.Item>
          </SubMenu> */}
        </Menu>
      </div>
    </Sider>
  );
};

AdminSidebar.propTypes = {
  username: PropTypes.string.isRequired,
  selectedTab: PropTypes.string.isRequired,
};

export default AdminSidebar;