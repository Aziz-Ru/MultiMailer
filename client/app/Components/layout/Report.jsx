"use client";
import Link from "next/link";
const Report = ({ reports }) => {
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-2">
      {reports.map((report) => (
        <Link
          key={report.id}
          className="w-full hover:text-blue-400 bg-blue-600 inline m-4 p-2 rounded-md"
          href={`/report/${report.id}`}
        >
          {report.subject}
        </Link>
      ))}
    </ul>
  );
};
export default Report;
