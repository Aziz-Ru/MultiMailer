"use client";
import useAuth from "@/app/Context/Login/UserLoginContext";
import axios from "axios";
import Cookies from "js-cookie";
// import Input from "@/public/Components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SignUp() {
  const { setisLogin } = useAuth();
  const [Loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [Userdata, setUserdata] = useState({
    email: "",
    password: "",
    password1: "",
    username: "",
  });
  const [error, setError] = useState("");
  const [apierror, setApierror] = useState("");
  const { push } = useRouter();

  const onChangePassword = (e) => {
    const value = e.target.value;
    setUserdata({
      ...Userdata,
      password: value,
    });
    if (Userdata.password1 === value) {
      setError("");
    } else {
      setError("Password & Confirm password do not match");
    }
  };
  const checkConfirmPass = (e) => {
    const value = e.target.value;
    // console.log(Userdata.password + value);
    setUserdata({
      ...Userdata,
      password1: value,
    });
    if (Userdata.password === value) {
      setError("");
    } else {
      setError("Password & Confirm password do not match");
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (error) return;
    setLoading(true);
    const URL = " http://127.0.0.1:8000/api/v1/sign-up/";
    const payload = {
      email: Userdata.email,
      username: Userdata.username,
      password: Userdata.password,
      password1: Userdata.password1,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    // console.log("send Email");
    try {
      const response = await axios.post(URL, payload, { headers });
      // console.log(response.status)
      const token = response.data.token[0].access;
      Cookies.set("authToken", token);
      setisLogin(true);
      push("/");
    } catch (error) {
      // console.log(error);
      if (error.response.data.errors.email) {
        const errormessage = error.response.data.errors.email;
        setApierror(errormessage);
      } else {
        setApierror("Failed to create Account");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mt-6 flex items-center justify-center h-[90vh]">
      <form
        // method="post"
        // action="/auth/signup"
        className={`${
          Loading ? "opacity-20" : ""
        } bg-slate-800 flex-col px-6 py-4 rounded-lg w-[400px]`}
        onSubmit={onSubmitForm}
      >
        <div className="text-center mb-5">
          <h1 className="text-4xl font-extrabold ">AutoPilotHub</h1>
          <p className="mt-2 text-red-600">{error || apierror}</p>
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="Enter Your Email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) =>
              setUserdata({
                ...Userdata,
                email: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            autoComplete="username"
            placeholder="Enter Your Username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) =>
              setUserdata({
                ...Userdata,
                username: e.target.value,
              })
            }
            required
          />
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
              onChange={(e) => onChangePassword(e)}
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
              onChange={(e) => checkConfirmPass(e)}
              className="bg-gray-50 border-gray-300  text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() =>
                setPasswordType(
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
          Sign up
        </button>
        <div className=" mt-3 text-md font-medium mb-5">
          <Link href="/foget-password" className="hover:text-blue-700">
            Forget Password
          </Link>
          <Link href="/sign-in" className="ml-4 hover:text-blue-700">
            Sign in
          </Link>
        </div>
      </form>
      {Loading && (
        <div className="  w-[400px] h-[550px] absolute flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
