import React from "react";
import { Layout } from "antd";
import { Sidebar } from "./Sidebar";
import { ContentComponent } from "./ContentComponent";
import { FooterComponent } from "./FooterComponent";
import { HeaderComponent } from "./HeaderComponent";

const AppLayout = () => {
  const isLoggedIn = false;
  return (
    <Layout className="site-layout" style={{ minHeight: "100vh" }}>
      <HeaderComponent isLoggedIn={isLoggedIn} />
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
