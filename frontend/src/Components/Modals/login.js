import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Space,
  Avatar,
  Badge,
  Tooltip,
} from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

import useLogin from "../Hooks/useLogin";

const LoginModal = () => {
  const { mutate: login, isLoading } = useLogin();

  const [loginSuccess, setLoginSuccess] = useState(null);
  const [userData, setUserData] = useState(null);

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const loginData = await login(values);
      console.log("error value ", loginData);

      if (loginData.accessToken) {
        setLoginSuccess(true);
        setUserData(loginData);
        hideModal();
      }
    } catch (error) {
      setLoginSuccess(null);
      console.error("Login failed:", error);
    }
  };

  const showModal = () => {
    form.resetFields();
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <div>
      {!loginSuccess && (
        <Button type="primary" onClick={showModal}>
          Log In
        </Button>
      )}
      {loginSuccess && (
        <Space size={24} style={{ paddingRight: "20px" }}>
          <span style={{ color: "white", fontWeight: "bold" }}>
            Welcome, {userData.user.fullName}
          </span>
          <Badge count={1}>
            <Avatar shape="square" icon={<UserOutlined />} />
          </Badge>
        </Space>
      )}
      {loginSuccess && (
        <Space size={24}>
          <Tooltip title="Logout">
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={() => {
                setLoginSuccess(null);
                setUserData(null);
              }}
            />
          </Tooltip>
        </Space>
      )}

      <Modal
        title="Login"
        open={visible}
        onCancel={hideModal}
        destroyOnClose={true}
        footer={null}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
            ]}>
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}>
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={isLoading}>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginModal;
