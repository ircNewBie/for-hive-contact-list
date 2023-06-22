import React from "react";

import { Layout } from "antd";
const { Footer } = Layout;

export const FooterComponent = () => {
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
