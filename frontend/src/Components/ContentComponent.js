import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

export const ContentComponent = () => {
  return (
    <Content style={{ padding: "0 50px" }}>
      {/* Your content goes here */}
      <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
        Hello World
        {/* Content for each page */}
      </div>
    </Content>
  );
};
