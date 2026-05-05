"use client";

import { useState, useEffect, useCallback } from "react";

import Link from "next/link";
import Button from "src/components/button";
import { useRouter } from "next/navigation";
import {
  getDepartment,
  getOffice
} from 'src/services/apiService/officeService/office'
import Loader from "src/components/Loader";
import TableBorder from 'src/components/TableDesign'
export default function ViewDonor() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [departmentList, setDepartmentList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const {status, data} = await getDepartment();
      if (status === 200) {
        setDepartmentList(data);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);
  const local = <div>
    <div className="mx-10">
      <TableBorder
          title={"Department List"}
          title2={
            <div className="flex flex-col   ">
              <div className=" flex justify-end">
                <Link href={"/office/department"}>
                  <Button>+Add </Button>
                </Link>
              </div>
            </div>
          }
      >
        <div className=" my-5">
          <table className="w-full">
            <tr className="bg-[#004a89] text-white text-lg text-center">

              <td className="py-3">S No.</td>
              <td className="py-3">Department Name</td>
              <td className="py-3">Action</td>

            </tr>
            {departmentList?.map((item, index) => {
              return (
                  <tr
                      className=" border border-x-gray text-center"
                      key={index}
                  >
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3">{item.departmentName}</td>
                    <td className="py-3">
                      <button className="bg-indigo-600 px-4 py-2 rounded-md shadow-md text-white" onClick={() => {
                        router.push(`/office/department/${item._id}`)
                      }}>Edit
                      </button>
                    </td>
                  </tr>
              );
            })}
          </table>
        </div>
      </TableBorder>
    </div>
  </div>;
  return (
      <>
        { isLoading ? <Loader /> : local }
      </>
  );
}
