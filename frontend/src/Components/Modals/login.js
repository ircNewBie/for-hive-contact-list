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

import RegistrationPage from "../Pages/signup";
import useLogin from "../Hooks/useLogin";

const LoginModal = () => {
  const { mutate: login, isLoading } = useLogin();

  const [loginSuccess, setLoginSuccess] = useState(null);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  const [userData, setUserData] = useState(null);

  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleRegisterClick = () => {
    console.log("open registration");

    setRegisterModalVisible(true);
    setLoginModalVisible(false);
  };

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

  const showLoginModal = () => {
    form.resetFields();
    setLoginModalVisible(true);
  };

  const hideModal = () => {
    setLoginModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      {!loginSuccess && (
        <Button type="primary" onClick={showLoginModal}>
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
        open={loginModalVisible}
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100%",
            }}>
            Without Account yet?{" "}
            <a href="#" onClick={handleRegisterClick}>
              <span style={{ paddingLeft: "1rem", fontWeight: "bold" }}>
                Register here{" "}
              </span>
            </a>
          </div>
        </Form>
      </Modal>
      {registerModalVisible && (
        <RegistrationPage
          visible={registerModalVisible}
          onClose={setRegisterModalVisible(false)}
        />
      )}
    </div>
  );
};

export default LoginModal;
