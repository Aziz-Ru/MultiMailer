import Cookies from "js-cookie";
export default async function getReport(URL) {
  const api_key = Cookies.get("authToken");
  const result = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${api_key}`,
    },
  });
  const data = await result.json();
  // console.log(data);
  return data;
}
