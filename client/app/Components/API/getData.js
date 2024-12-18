export default async function GetUserData() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MjcyNTkxLCJpYXQiOjE3MDYyNjY1OTEsImp0aSI6IjA3YWViNWY5MTk5MDRhY2ViMzUyYWJkMjRjMmJhODVjIiwidXNlcl9pZCI6MTZ9.xSDFbkiiltJ9wt2eQLLBIBcVIIITtFIxp7fzAm-em7c";
  try {
    const result = await fetch(" http://127.0.0.1:8000//api/v1/profile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.ok) {
      const userData = await GetUserData();
      return userData;
    }
  } catch (error) {
    console.log(error);
  }
}
