import Cookies from "js-cookie";

export default async function getSingleEmail(id) {
  const api_key = Cookies.get("authToken");
  const URL = ` http://127.0.0.1:8000/api/v1/generated-email/${id}`;

  
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

export async function updateEmail(id, payload) {
  const api_key = Cookies.get("authToken");
  const URL = ` http://127.0.0.1:8000/api/v1/generated-email/${id}/`;
  try {
    const response = await fetch(URL, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
}

export async function sendEmail(payload) {
  const api_key = Cookies.get("authToken");
  const URL = ` http://127.0.0.1:8000/api/v1/send-mail/`;
  try {
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
}
