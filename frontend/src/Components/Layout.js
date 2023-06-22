import React from "react";
import { Layout } from "antd";
import { Sidebar } from "./Sidebar";
import { ContentComponent } from "./ContentComponent";
import LoginModal from "./Modals/login";
import { useQuery } from "react-query";
import fetchData from "../utils/fetch-be";

const { Footer, Header } = Layout;

const HeaderComponent = ({ isLoggedIn }) => {
  const { data, isError } = useQuery("testData", () => fetchData("GET", "/"));
  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  let usersFullName = "";
  const showUsersProfile = () => {
    //  do something here
  };

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div style={{ flexGrow: 1, color: "white" }}>
        <h3>{data ? data : "My ContactList App"}</h3>
      </div>
      {isLoggedIn && (
        <div>
          <button onClick={showUsersProfile}>{usersFullName}</button>
        </div>
      )}
      {!isLoggedIn && <LoginModal />}
    </Header>
  );
};

const FooterComponent = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
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
