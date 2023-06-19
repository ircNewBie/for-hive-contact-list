import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { message } from "antd";

import { API_URL_LOCAL, API_URL_STAGING } from "../../constants/apiConfig";
import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const BASE_URL = isProduction ? API_URL_STAGING : API_URL_LOCAL;

const RegistrationPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = {
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
        fullName: values.fullName,
        contactNumber: values.contactNumber,
        completeAddress: values.completeAddress,
      };

      // Send a POST request to the registration API
      const response = await axios.post(
        BASE_URL + "/api/user/signup",
        formData
      );

      // Check if the request was successful
      if (response.status === 201) {
        console.log("Registration successful!");
        // Redirect the user to the login page
        message.success(response.data.message);
      } else {
        console.log("Registration failed!");
        console.log(response.data.message);
        // Handle any error that occurred during the registration process
        message.error(response.data.message);
      }
    } catch (error) {
      console.log("An error occurred during registration:", error);
      message.error("An error occurred during registration:");

      // Handle any error that occurred during the registration process
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish} style={{ maxWidth: 300 }}>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "Please enter a valid email",
          },
          {
            required: true,
            message: "Please enter your email",
          },
        ]}>
        <Input placeholder="Email" />
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

      <Form.Item
        name="confirm_password"
        rules={[
          {
            required: true,
            message: "Please re-enter your password",
          },
        ]}>
        <Input.Password placeholder="Confirm password" />
      </Form.Item>

      <Form.Item
        name="fullName"
        rules={[
          {
            required: true,
            message: "Please enter your full name",
          },
        ]}>
        <Input placeholder="Full Name" />
      </Form.Item>

      <Form.Item
        name="contactNumber"
        rules={[
          {
            required: true,
            message: "Please enter your contact number",
          },
        ]}>
        <Input placeholder="Contact Number" />
      </Form.Item>

      <Form.Item
        name="completeAddress"
        rules={[
          {
            required: true,
            message: "Please enter your complete address",
          },
        ]}>
        <Input placeholder="Complete Address" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={loading}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationPage;
