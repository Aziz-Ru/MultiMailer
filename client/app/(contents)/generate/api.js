import axios from "axios";
import Cookies from "js-cookie";

export default async function SaveEmail(payload) {
  const api_key = Cookies.get("authToken");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${api_key}`,
  };
  try {
    const URL = ` http://127.0.0.1:8000/api/v1/generated-email/`;
    const response = await axios.post(URL, payload, { headers });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function SaveReport(payload) {
  const api_key = Cookies.get("authToken");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${api_key}`,
  };
  try {
    const URL = ` http://127.0.0.1:8000/api/v1/generated-report/`;
    const response = await axios.post(URL, payload, { headers });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
