"use client";
import React, { useState, useEffect } from "react";
import TableBorder from "src/components/TableDesign";
import {
  getPost,
} from "src/services/apiService/officeService/office";
import Link from "next/link";
import Button from "src/components/button";
import { useRouter } from "next/navigation";
import Loader from "src/components/Loader";
export default function Post() {
  const router = useRouter()
  const [apiData, setApiData] = useState([]);
const [isLoading,setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const {data, status} = await getPost();
        if (status === 200) {
          setApiData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const local = <div className="mx-6">
    <TableBorder
        title={"Post"}
        title2={
          <div className="flex flex-col   ">
            <div className=" flex justify-end">
              <Link href={"/office/postList/createPost"}>
                <Button>+Add </Button>
              </Link>
            </div>
          </div>
        }
    >
      <table className="w-full border-collapse">
        <tr className="bg-[#004a89] text-white text-lg text-center">
          <th className="border border-black px-3 py-4">Post</th>
          <th className="border border-black px-3 py-4">Department</th>
          <th className="border border-black px-3 py-4">Action</th>
        </tr>
        {apiData?.map((item, index) => {
          return (
              <tr key={index}>
                <td className="border border-black px-3 py-2  text-lg">
                  {item.postName}
                </td>

                <td className="border border-black px-3 py-2  text-lg">
                  {item.departmentName}
                </td>
                <td className="border border-black px-3 py-2  text-lg">
                  <button className="text-white px-4 py-2 rounded-md shadow-md bg-indigo-600"
                          onClick={() => router.push(`/office/postList/createPost/${item._id}`)}>Edit
                  </button>
                </td>
              </tr>
          );
        })}
      </table>
    </TableBorder>
  </div>
  return (
<>
  {isLoading ? <Loader/> : local}
</>
  );
}
