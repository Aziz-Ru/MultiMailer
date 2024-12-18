"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgetPassword() {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleApi = async (e) => {
    e.preventDefault();
    const BASEURL = " http://127.0.0.1:8000/api/v1/forget-password/";

    const payload = {
      email: email,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(BASEURL, payload, { headers });
      if (response.status == 200) {
        setError(response.data.message);
        setTimeout(() => {
          push("/sign-in");
        }, 5000);
      }
    } catch (error) {
      // console.log(error)
      if (error.response.data.errors.non_field_errors[0]) {
        setError(error.response.data.errors.non_field_errors);
      }
      //  else {
      //   setError("Email Not Found");
      // }
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
          <p className="mt-2 text-red-600">{error}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="Enter Your Email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
