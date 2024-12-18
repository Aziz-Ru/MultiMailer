"use client";
import { Sidebar } from "@/app/Components/navigation/Sidebar";
import { useEffect, useState } from "react";
import getSingleReport, { sendReport, updateReport } from "./api";

const SingleReport = ({ params }) => {
  const { id } = params;
  const [Emails, setEmails] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Savedata, setSavedata] = useState({
    id: id,
    subject: "",
    report_text: "",
  });
  const [Flags, setFlags] = useState({
    error_message: "",
    message: "",
  });

  useEffect(() => {
    const getReport = async () => {
      setLoading(true)
      const response = await getSingleReport(id);
      if (response.id) {
        setSavedata({
          ...Savedata,
          subject: response.subject,
          report_text: response.report,
        });
        setFlags({
          ...Flags,
          message: "Fetched From Server",
        });
      } else {
        setFlags({
          ...Flags,
          error_message: response.message,
        });
      }
      setLoading(false)
    };
    getReport();
  }, []);

  const updateData = async () => {
    if (!Savedata.subject) {
      setFlags({
        ...Flags,
        error_message: "Subject must be required",
      });
      return;
    }
    if (!Savedata.report_text) {
      setFlags({
        ...Flags,
        error_message: "Email text field must be required",
      });
      return;
    }
    setLoading(true)
    const payload = {
      report: Savedata.report_text,
      subject: Savedata.subject,
    };
    const response = await updateReport(id, payload);
    console.log(response);

    if (response.id) {
      setFlags({
        ...Flags,
        message: "Update Successfully",
        error_message: "",
      });
    } else {
      setFlags({
        ...Flags,
        message: "Failed to update",
      });
    }
    setLoading(false)
  };

  const sendData = async () => {
    if (!Savedata.subject) {
      setFlags({
        ...Flags,
        error_message: "Subject must be required",
      });
      return;
    } else if (!Savedata.report_text) {
      setFlags({
        ...Flags,
        error_message: "Email field must be required",
      });
      return;
    } else if (!Emails) {
      setFlags({
        ...Flags,
        error_message: "Receiver Emails must be required",
      });
      return;
    }

    setLoading(true);

    const payload = {
      body: Savedata.report_text,
      subject: Savedata.subject,
      emails: Emails,
    };
    const response = await sendReport(payload);
    // console.log(response);

    setFlags({
      ...Flags,
      error_message: response.message,
    });
    setLoading(false);
  };

  const onChangeEmails = (e) => {
    const inputEmail = e.target.value;
    const emails = inputEmail.split(",");
    // const COMEMAILS = inputEmail.split(".com");

    const allowedDomains = [
      "@gmail.com",
      "@outlook.com",
      "@yahoo.com",
      "@ru.ac.bd",
    ];
    for (const email of emails) {
      const trimmedEmail = email.trim();
      if (!allowedDomains.some((domain) => trimmedEmail.includes(domain))) {
        setFlags({
          ...Flags,
          error_message: `${trimmedEmail} is not a valid email`,
        });
        return;
      }
      // sendingEmail += trimmedEmail + ",";
      // console.log(email.split(".com")[1][0]);
      setFlags({
        ...Flags,
        error_message: "",
      });
    }
    setEmails(inputEmail);
  };

  return (
    <>
      <Sidebar />
      <div className="md:ml-52 mt-20 ">
        <div className="text-center ">{Flags.message}</div>
        <div className="">
          <form action="" className={`${Loading ? "opacity-30" : ""}`}>
            <div className="mb-2 mx-10 ">
              <label
                htmlFor="subject"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Subject
              </label>
              <input
                name="subject"
                onChange={(e) =>
                  setSavedata({
                    ...Savedata,
                    subject: e.target.value,
                  })
                }
                value={Savedata.subject}
                type="text"
                id="subject"
                autoComplete="subject"
                placeholder="Write Your Subject to Generate Report"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2 mx-10">
              <textarea
                name="report"
                id=""
                cols="30"
                rows="10"
                value={Savedata.report_text}
                onChange={(e) => {
                  setSavedata({
                    ...Savedata,
                    report_text: e.target.value,
                  });
                }}
                className={`${
                  Loading ? "cursor-not-allowed" : ""
                } bg-gray-50 border-gray-300 text-gray-900 text-lg  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full h-[63vh] py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              ></textarea>
            </div>
            <div className="text-center">{Flags.error_message}</div>
            <div className="my-2 mx-10 text-center">
              <input
                type="text"
                id="emails"
                autoComplete="emails"
                placeholder="Reciever emails such that example1@gmail.com,exampl2@gmail.com...,"
                className={`${
                  Loading ? "cursor-not-allowed" : ""
                } bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                onChange={(e) => onChangeEmails(e)}
                required
              />
            </div>
            <div className="flex mx-10 gap-4 justify-center mb-2">
              <button
                type="button"
                onClick={updateData}
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-96 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                  Loading ? "cursor-not-allowed" : ""
                }`}
              >
                Update
              </button>
              <button
                type="button"
                onClick={sendData}
                className={`text-white w-96 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-4 py-2.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                  Loading ? "cursor-not-allowed" : "cursor-not-allowed"
                }`}
              >
                Send
              </button>
            </div>
          </form>

          {Loading && (
            <div
              role="status"
              className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            >
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
      </div>
    </>
  );
};

export default SingleReport;
