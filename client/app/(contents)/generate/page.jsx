"use client";
import { Sidebar } from "@/app/Components/navigation/Sidebar";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import SaveEmail, { SaveReport } from "./api";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const SendEmailPage = () => {
  const [EmailLoading,setEmailLoading]=useState(false)
  const [ReportLoading,setReportLoading]=useState(false)
  const [Select, setSelect] = useState("");
  const router = useRouter();
  const API_KEY = "AIzaSyBiYT3JcwnBHqQ7avpET7iMTTvWjJPLdMI";
  const genAI = new GoogleGenerativeAI(API_KEY);

  const [Flags, setFlags] = useState({
    message: "",
    error_message: "",
    loading: false,
  });
  const [GeneratedData, setGeneratedData] = useState({
    recipient: "",
    sender: "",
    subject: "",
  });
  const [ReportSubject, setReportSubject] = useState("");

  // console.log(GeneratedData.subject);

  const GenerateEmailBYGemini = async (e) => {
    e.preventDefault();
    setFlags({
      ...Flags,
      loading: true,
    });
    setEmailLoading(true)
    const message = `write an email about ${GeneratedData.subject} where sender name is ${GeneratedData.sender}, recipient name is ${GeneratedData.recipient}.`;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(message);
      const text = await result.response.text();
      const payload = {
        subject: GeneratedData.subject,
        email: text,
      };
      const response = await SaveEmail(payload);
      // console.log(response);
      if (response.errors) {
        setFlags({
          ...Flags,
          error_message: "Failed to save Email",
        });
      } else {
        router.push(`email/${response.id}`);
      }
    } catch (error) {
      setFlags({
        ...Flags,
        message: "",
        error_message: "Failed to fetch data",
      });
    } finally {
      setFlags({
        ...Flags,
        message: "Successfully Generated Your Email",
        error_message: "",
        loading: false,
      });
      setEmailLoading(false)
    }

  };

  const GenerateReportBYGemini = async (e) => {
    e.preventDefault();
    setFlags({
      ...Flags,
      loading: true,
    });
    setReportLoading(true)
    const message = `write a report about ${ReportSubject}.`;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(message);
      const text = await result.response.text();
      const payload = {
        subject: ReportSubject,
        report: text,
      };
      const response = await SaveReport(payload);
      // console.log(response);
      if (response.errors) {
        setFlags({
          ...Flags,
          error_message: "Failed to save Report",
        });
      } else {
        router.push(`report/${response.id}`);
      }
    } catch (error) {
      setFlags({
        ...Flags,
        message: "",
        error_message: "Failed to fetch data",
      });
    } finally {
      setFlags({
        ...Flags,
        message: "Successfully Generated Your Email",
        error_message: "",
        loading: false,
      });
      setReportLoading(false)
    }
  };
  // console.log(Select);

  return (
    <>
      <Sidebar />
      <div className="md:pl-60 h-screen flex flex-col justify-center items-center">
        <div>
          {Flags.error_message && (
            <h1 className="text-center">{Flags.error_message}</h1>
          )}
        </div>

        <select
          name=""
          id=""
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-1/2 py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setSelect(e.target.value)}
        >
          <option value="Report">Report</option>
          <option value="Email">Email</option>
        </select>

        {Select == "Email" ? (
          <>
          <form onSubmit={GenerateEmailBYGemini} className={`${EmailLoading? 'opacity-20':''} w-4/5 lg:w-1/2`}>
            <div className="mb-3 text-center my-4">
              <h1 className="font-bold text-3xl tracking-wide">
                Genrate Your Email
              </h1>
            </div>
            <div className="mb-3">
              <label
                htmlFor="Recipient"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white tracking-wide"
              >
                Recipient name
              </label>
              <input
                type="text"
                id="Recipient"
                autoComplete="Recipient"
                placeholder="Enter Recipient's name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 tracking-wide"
                onChange={(e) =>
                  setGeneratedData({
                    ...GeneratedData,
                    recipient: e.target.value,
                  })
                }
                required
                maxLength={15}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="sender"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white tracking-wide"
              >
                {`Sender Name`}
              </label>
              <input
                type="text"
                id="sender"
                autoComplete="sender"
                placeholder="Enter Sender Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setGeneratedData({
                    ...GeneratedData,
                    sender: e.target.value,
                  })
                }
                required
                maxLength={10}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="subject"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white tracking-wide"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                autoComplete="subject"
                placeholder="Enter Your Subject"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setGeneratedData({
                    ...GeneratedData,
                    subject: e.target.value,
                  });
                }}
                required
                maxLength={100}
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2"
            >
              Generate Email
            </button>
          </form>
          
          {EmailLoading && (<div className=" w-4/5 lg:w-1/2 h-[430px] absolute flex justify-center items-center">
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
          </div>)}
          </>
        ) : (
          <>
          <form onSubmit={GenerateReportBYGemini} className={`${ReportLoading? 'opacity-20':''} w-4/5 lg:w-1/2`}>
            <div className="mb-3 text-center my-4">
              <h1 className="font-bold text-3xl tracking-wide">
                Genrate Your Report
              </h1>
            </div>
            <div className="mb-3">
              <label
                htmlFor="subject"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Subject
              </label>
              <input
                name="subject"
                onChange={(e) => setReportSubject(e.target.value)}
                type="text"
                id="subject"
                autoComplete="subject"
                placeholder="Write Your Subject to Generate Report"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-5">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2"
              >
                Generate Report
              </button>
            </div>

          </form>
          {ReportLoading && (<div className="  w-4/5 lg:w-1/2 h-[400px] absolute flex justify-center items-center">
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
          </div>)}
          </>

        )
        }

        <Suspense fallback="Generating...">
          <div className="lg:min-w-1/2 box-border">
            {Flags.loading && <h1 className="text-gray-500">Generating...</h1>}
          </div>
        </Suspense>
      </div>
    </>
  );
};
export default SendEmailPage;
