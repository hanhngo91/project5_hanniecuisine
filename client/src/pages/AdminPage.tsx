import React, { useState } from "react";
import {
  CloseCircleOutlined,
  CopyOutlined,
  FormOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, notification } from "antd";
import AdminReservations from "../components/AdminReservations";
import AdminMenu from "../components/AdminMenu";
import AdminCancellations from "../components/AdminCancellations";
import AdminCustomers from "../components/AdminCustomers";
import AdminContact from "../components/AdminContact";
import LogOutIcon from "../components/LogOutIcon";
import { removeCookie } from "typescript-cookie";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showContent, setShowContent] = useState(1);

  const navigate = useNavigate();

  const colorBgContainer = "#fff";

  //Log out:
  const handleLogOut = () => {
    removeCookie("adminToken");
    notification.success({
      message: "Log out successfully!",
    });
    navigate("/");
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <FormOutlined />,
              label: "Reservations",
              onClick: () => setShowContent(1),
            },
            {
              key: "2",
              icon: <CopyOutlined />,
              label: "Menu",
              onClick: () => setShowContent(2),
            },
            {
              key: "3",
              icon: <CloseCircleOutlined />,
              label: "Cancelations",
              onClick: () => setShowContent(3),
            },
            {
              key: "4",
              icon: <UsergroupDeleteOutlined />,
              label: "Customers",
              onClick: () => setShowContent(4),
            },
            {
              key: "5",
              icon: <MessageOutlined />,
              label: "Messages",
              onClick: () => setShowContent(5),
            },
            {
              key: "6",
              icon: <LogOutIcon />,
              label: "Log Out",
              onClick: handleLogOut,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="flex justify-left"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <img className="ml-[25%]" src="/logos/logoblack.png" alt="logo" />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            width: "100%",
            height: "81vh",
            background: colorBgContainer,
          }}
        >
          {showContent === 1 ? <AdminReservations /> : null}
          {showContent === 2 ? <AdminMenu /> : null}
          {showContent === 3 ? <AdminCancellations /> : null}
          {showContent === 4 ? <AdminCustomers /> : null}
          {showContent === 5 ? <AdminContact /> : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
