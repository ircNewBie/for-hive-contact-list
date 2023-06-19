import { Layout } from "antd";

const { Content } = Layout;

export const ContentComponent = () => {
  return (
    <Content style={{ padding: "0 50px" }}>
      <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
        Hello World
      </div>
    </Content>
  );
};
