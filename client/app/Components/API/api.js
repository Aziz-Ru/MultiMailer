// "use client";

// import { useState } from "react";
import GetUserData from "./getData";

export default async function APIData() {
  // const [data, setData] = useState(null);
  const userData=GetUserData()
//  console.log(userData)
  return (
    <div>
      <button
        className="text-white bg-green-500 rounded-md p-2"
      >
        Click Me Man
      </button>
      
    </div>
  );
}
