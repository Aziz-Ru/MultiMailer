"use client";

import Link from "next/link";
const Email = ({ emails }) => {
  // console.log(emails);
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4">
      {emails.map((email) => (
        <Link
          key={email.id}
          className="bg-blue-600 inline m-4 p-2 rounded-md"
          href={`/email/${email.id}`}
        >
          {email.subject}
        </Link>
      ))}
    </ul>
  );
};
export default Email;
