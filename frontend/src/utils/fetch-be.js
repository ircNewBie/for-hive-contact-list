import { API_URL_LOCAL, API_URL_STAGING } from "../constants/apiConfig";
import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const BASE_URL = isProduction ? API_URL_STAGING : API_URL_LOCAL;

const fetchData = async function (method = "GET", apiRoute, payload) {
  const url = `${BASE_URL}${apiRoute}`;

  const config = {
    method,
    url,
    ...(method === "GET" ? { params: payload } : { data: payload }),
  };
  const response = await axios(config);

  return response.data;
};

export default fetchData;
