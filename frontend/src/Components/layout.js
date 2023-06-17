import React from "react";
import { Layout } from "antd";
import { Sidebar } from "./Sidebar";
import { ContentComponent } from "./ContentComponent";

import { useQuery } from "react-query";
import axios from "axios";

const { Footer, Header } = Layout;
const HeaderComponent = () => {
  const { data, isError } = useQuery("testData", fetchData);

  async function fetchData() {
    const response = await axios.get("http://localhost:5000/");
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
      My ContactList App ©2023 Created by Ant UED
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
