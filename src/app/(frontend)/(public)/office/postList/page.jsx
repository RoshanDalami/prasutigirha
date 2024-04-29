"use client";
import React, { useState, useEffect } from "react";
import TableBorder from "src/components/TableDesign";
import {
  getPost,
  getDepartment,
} from "src/services/apiService/officeService/office";
import Link from "next/link";
import Button from "src/components/button";
export default function Post() {
  const [apiData, setApiData] = useState([]);
  const [department, setDepartment] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data, status } = await getPost();
        if (status === 200) {
          setApiData(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, status } = await getDepartment();
        if (status === 200) {
          setDepartment(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="mx-6">
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
          </tr>
          {apiData?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="border border-black px-3 py-2  text-lg">
                  {item.postName}
                </td>
                {department?.map((row, index0) => {
                  if (row.departmentId === item.departmentId) {
                    return (
                      <td
                        className="border border-black px-3 py-2  text-lg"
                        key={index0}
                      >
                        {row.departmentName}
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </table>
      </TableBorder>
    </div>
  );
}
