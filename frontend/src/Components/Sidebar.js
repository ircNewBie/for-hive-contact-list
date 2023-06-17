import React from "react";
import { Menu } from "antd";
import { Layout } from "antd";
import { UserOutlined, LoadingOutlined, MailOutlined } from "@ant-design/icons";

const { Sider } = Layout;

export const Sidebar = () => {
  return (
    <Sider width={200}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          Friends
        </Menu.Item>
        <Menu.Item key="2" icon={<LoadingOutlined />}>
          Friend Requests
        </Menu.Item>
        <Menu.Item key="3" icon={<MailOutlined />}>
          My Contacts
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
