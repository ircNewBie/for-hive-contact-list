import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";

import useLogin from "../Hooks/useLogin";

const LoginModal = () => {
  const [loginData, setLoginData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { mutate: login, isLoading, error } = useLogin();

  const onFinish = async (values) => {
    try {
      await login(values);
      hideModal();
      // setLoginData
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <div>
      {!loginData && (
        <Button type="primary" onClick={showModal}>
          Log In
        </Button>
      )}
      <Modal title="Login" open={visible} onCancel={hideModal} footer={null}>
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

          {error && (
            <Form.Item>
              <div style={{ color: "red" }}>{error.message}</div>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default LoginModal;
