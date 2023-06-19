import React from "react";
import { Form, Input, Button } from "antd";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
      }}>
      <Form onFinish={onFinish} style={{ maxWidth: 300 }}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter your username",
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
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
