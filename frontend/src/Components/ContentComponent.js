import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

export const ContentComponent = ({ component: Component }) => {
  return (
    <Content style={{ padding: "0 50px" }}>
      <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
        {/* <Component /> */}
        <p> content here</p>
      </div>
    </Content>
  );
};
