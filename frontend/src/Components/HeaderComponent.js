import LoginModal from "./Modals/login";
import * as reactQuery from "@tanstack/react-query";
import fetchData from "../utils/fetch-be";

import { Layout } from "antd";
const { Header } = Layout;

export const HeaderComponent = () => {
  const { data, isError } = reactQuery.useQuery({
    queryKey: ["app-name"],
    queryFn: () =>
      fetchData("GET", "/").then((res) => {
        console.log("response of react query", res);
        return res;
      }),
  });

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div style={{ flexGrow: 1, color: "white" }}>
        <h3>{data ? data : "My ContactList App"}</h3>
      </div>

      <LoginModal />
    </Header>
  );
};
