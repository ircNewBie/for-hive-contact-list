import React, { useState } from "react";

import { Layout, Button } from "antd";
import { Sidebar } from "./Sidebar";
import { ContentComponent } from "./ContentComponent";
import Login from "./Pages/login";
import RegistrationPage from "./Pages/signup";

import { useQuery } from "react-query";
import axios from "axios";

import { API_URL_LOCAL, API_URL_STAGING } from "../constants/apiConfig";

const { Footer, Header } = Layout;
const isProduction = process.env.NODE_ENV === "production";
const BASE_URL = isProduction ? API_URL_STAGING : API_URL_LOCAL;

const HeaderComponent = () => {
  const { data, isError } = useQuery("testData", fetchData);

  async function fetchData() {
    const response = await axios.get(BASE_URL + "/");
    return response.data;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
      }}>
      <div style={{ flexGrow: 1, color: "white" }}>
        <h3> {data ? data : "My ContactList App"}</h3>
      </div>
    </Header>
  );
};

const FooterComponent = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
      }}>
      <p>
        My ContactList App ©2023 Created with AntDesign by{" "}
        <a
          href="https://github.com/ircNewBie"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: "bold", color: "blue" }}>
          working0nL1ne
        </a>
      </p>
    </Footer>
  );
};

const AppLayout = () => {
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLogin = () => {
    // Simulated login logic
    // Replace this with your actual login logic
    // For demonstration purposes, set the loggedIn state to true
    setLoggedIn(true);
  };

  function showLoginPage() {
    const handleRegisterClick = () => {
      setShowRegistration(true);
    };

    return (
      <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
        {!showRegistration ? (
          <>
            <Login onLogin={handleLogin} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <p>Don't have an account?</p>
              <Button type="primary" onClick={handleRegisterClick}>
                Register
              </Button>
            </div>
          </>
        ) : (
          <RegistrationPage />
        )}
      </div>
    );
  }

  return (
    <Layout className="site-layout" style={{ minHeight: "100vh" }}>
      <HeaderComponent />
      <Layout style={{ minHeight: "100%" }}>
        {!loggedIn ? (
          showLoginPage()
        ) : (
          <>
            <Sidebar />
            <Layout style={{ minHeight: "100%" }}>
              <ContentComponent />
              <FooterComponent />
            </Layout>
          </>
        )}
      </Layout>
    </Layout>
  );
};

export default AppLayout;
