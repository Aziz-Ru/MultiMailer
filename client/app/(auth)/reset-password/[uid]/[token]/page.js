"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
const ResetPassword = () => {
  const { push } = useRouter();
  const [Password, setPassword] = useState("");
  const [Password1, setPassword1] = useState("");
  const [passwordType, setpasswordType] = useState("password");
  const [Error, setError] = useState("");
  const [ApiError, setApiError] = useState("");

  // console.log(URL);

  const changingPassowrd = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (Password1 === value) {
      setError("");
    } else {
      setError("Password & Confirm password do not match");
    }
  };
  const changingPassowrd1 = (e) => {
    const value = e.target.value;
    setPassword1(value);
    if (Password === value) {
      setError("");
    } else {
      setError("Password & Confirm password do not match");
    }
  };

  // console.log(`p${Password} p1${Password1}`);

  const handleApi = async (e) => {
    e.preventDefault();
    if (Error != "") return;
    const fullURL = window.location.href;
    const path = fullURL.split("3000/")[1];
    const URL = ` http://127.0.0.1:8000/api/v1/${path}/`;
    console.log(URL);
    const payload = {
      password: Password,
      password1: Password1,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(URL, payload, { headers });
      if (response.status == 200) {
        // console.log("change");
        push("/sign-in");
      }
    } catch (error) {
      if (error.response) {
        setApiError("You are Invalid User");
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <form
        onSubmit={handleApi}
        className="bg-slate-800 flex-col px-6 py-4 rounded-lg w-[400px]"
      >
        <div className=" text-center mb-5  ">
          <h1 className="text-4xl font-extrabold">AutoPilotHub</h1>
          <p className="mt-2 text-red-600">{Error || ApiError}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>

          <div className="flex bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500  w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <input
              type={passwordType}
              id="password"
              autoComplete="new-password"
              placeholder="Enter Your Password"
              onChange={changingPassowrd}
              className="bg-gray-50 border-gray-300 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              minLength={6}
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="password1"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>

          <div className="flex bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500  w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <input
              type={passwordType}
              id="password1"
              autoComplete="current-password"
              placeholder="Enter Your Confirm Password"
              onChange={changingPassowrd1}
              className="bg-gray-50 border-gray-300  text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() =>
                setpasswordType(
                  passwordType == "password" ? "text" : "password"
                )
              }
            >
              <svg
                className="w-4 h-4 mx-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
              </svg>
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
