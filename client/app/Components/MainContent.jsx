"use client";
import { Suspense, useEffect, useState } from "react";
import getEmail from "./API/getEmail";
import getReport from "./API/getReport";
import Email from "./layout/Email";
import Report from "./layout/Report";
import { Sidebar } from "./navigation/Sidebar";

export default function MainContent() {
  const [Loading, setLoading] = useState(true);
  const [Emails, setEmails] = useState([]);
  const [Reports, setReports] = useState([]);
  const [Links, setLinks] = useState({
    email_prev: "",
    email_next: "",
    report_prev: "",
    report_next: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const EURL = " http://127.0.0.1:8000/api/v1/generated-email/?page=1";
      const RURL = " http://127.0.0.1:8000/api/v1/generated-report/?page=1";
      setLoading(true);
      const getEmails = await getEmail(EURL);
      const getReports = await getReport(RURL);
      // console.log(getReports);
      setLoading(false);
      setEmails(getEmails.results);
      setReports(getReports.results);
      setLinks({
        ...Links,
        email_prev: getEmails.previous,
        email_next: getEmails.next,
        report_prev: getReports.previous,
        report_next: getReports.next,
      });
    };
    fetchData();
  }, []);
  const EmailPrev = async () => {
    setLoading(true);
    const getEmails = await getEmail(Links.email_prev);
    setLoading(false);
    setEmails(getEmails.results);
    setLinks({
      ...Links,
      email_prev: getEmails.previous,
      email_next: getEmails.next,
    });
  };
  const EmailNext = async () => {
    setLoading(true);
    const getEmails = await getEmail(Links.email_next);
    setLoading(false);
    setEmails(getEmails.results);
    setLinks({
      ...Links,
      email_prev: getEmails.previous,
      email_next: getEmails.next,
    });
  };
  const ReportNext = async () => {
    setLoading(true);
    const getReports = await getReport(Links.report_next);
    setReports(getReports.results);
    setLoading(false);
    setLinks({
      ...Links,
      report_prev: getReports.previous,
      report_next: getReports.next,
    });
  };
  const ReportPrev = async () => {
    setLoading(true);
    const getReports = await getReport(Links.report_prev);
    setLoading(false);
    setReports(getReports.results);
    setLinks({
      ...Links,
      report_prev: getReports.previous,
      report_next: getReports.next,
    });
  };

  return (
    <>
      <div className="w-screen h-screen">
        <Sidebar />
        <div className="md:ml-52 mt-16 relative">
          <div className=" bg-slate-900 lg:h-[92vh] w-full p-4 flex flex-col">
            <div>
              <div className="text-center tracking-wider ">
                <h1 className="text-2xl font-bold">Recent Saved Email</h1>
              </div>
              <div className="lg:h-[30vh]">
                <Suspense fallback="Loading Email...">
                  <Email emails={Emails} />
                </Suspense>
              </div>

              <div className="flex justify-center gap-2 my-4 bottom-0">
                <div>
                  {Links.email_prev && (
                    <button
                      className="border border-white px-3 py-1 rounded-md hover:bg-slate-700"
                      onClick={EmailPrev}
                    >
                      Prev
                    </button>
                  )}
                </div>
                <div>
                  {Links.email_next && (
                    <button
                      className=" border border-white px-3 py-1 rounded-md hover:bg-slate-700"
                      onClick={EmailNext}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
            {Loading && (
              <div className=" absolute w-full flex justify-center items-center top-1/2 ">
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
            <div className="bg-slate-900">
              <div className="text-center tracking-wider ">
                <h1 className="text-2xl font-bold">Recent Saved Report</h1>
              </div>
              <div className="mt-6">
                <Suspense fallback="Loading Report...">
                  <Report reports={Reports} />
                </Suspense>
              </div>
              <div className="flex justify-center gap-2 my-4 bottom-0 ">
                <div>
                  {Links.report_prev && (
                    <button
                      className="border border-white px-3 py-1 rounded-md hover:bg-slate-700"
                      onClick={ReportPrev}
                    >
                      Prev
                    </button>
                  )}
                </div>
                <div>
                  {Links.report_next && (
                    <button
                      className=" border border-white px-3 py-1 rounded-md hover:bg-slate-700"
                      onClick={ReportNext}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
