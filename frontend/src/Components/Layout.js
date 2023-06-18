import React from "react";
import { Layout } from "antd";
import { Sidebar } from "./Sidebar";
import { ContentComponent } from "./ContentComponent";

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
  return (
    <Layout className="site-layout" style={{ minHeight: "100vh" }}>
      <HeaderComponent />
      <Layout style={{ minHeight: "100%" }}>
        <Sidebar />
        <Layout style={{ minHeight: "100%" }}>
          <ContentComponent />
          <FooterComponent />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
