"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { urls } from "src/services/apiHelpers";
import Link from "next/link";
import Button from "src/components/button";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { getOffice } from "src/services/apiService/officeService/office";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function ViewDonor() {
  const TableBorder = dynamic(() => import("@/components/TableDesign"), {
    ssr: false,
  });
  const router = useRouter();

  const [officeList, setOfficeList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await getOffice();
      if (status === 200) {
        setOfficeList(data);
      }
    }
    fetchData();
  }, []);

  const handleEdit = useCallback(
    (id) => {
      router.push(`/donorRecord/addDonorRecord/${id}`);
    },
    [router]
  );
  const handleDetail = useCallback(
    (id) => {
      router.push(`/donorRecord/viewDonorRecord/${id}`);
    },
    [router]
  );
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${urls.getDonor}/${id}`);
      console.log(response, "deleted");
      if (response.status === 200) {
        const { status, data } = await axios.get(`${urls.getDonor}`);
        if (status === 200) {
          setDonorList(data);
        }
      }
    } catch (error) {
      console.error("Error deleteing:", error);
    }
  };

  return (
    <>
      <div>
        <div className="mx-10">
          <TableBorder
            title={"Office List"}
            title2={
              <div className="flex flex-col   ">
                <div className=" flex justify-end">
                  <Link href={"/office/officeSetup"}>
                    <Button>+Add </Button>
                  </Link>
                </div>
              </div>
            }
          >
            <div className=" my-5">
              <table className="w-full">
                <tr className="bg-[#004a89] text-white text-lg text-center">
                  {/* <td className="py-3">
                    <input type="checkbox" name="" id="" />
                  </td> */}
                  <td className="py-3">S No.</td>
                  <td className="py-3">Office Name</td>
                  <td className="py-3">Address</td>
                  <td className="py-3">Email</td>
                  <td className="py-3">Contact</td>
                </tr>
                {officeList?.map((item, index) => {
                  return (
                    <tr
                      className=" border border-x-gray text-center"
                      key={index}
                    >
                      {/* <td className="py-3 text-center">
                    <input type="checkbox" name="" id="" />
                  </td> */}
                      <td className="py-3">{index + 1}</td>
                      <td className="py-3">{item.office_name}</td>
                      <td className="py-3">{item.office_address}</td>
                      <td className="py-3">{item.office_email}</td>
                      <td className="py-3">{item.office_phone}</td>
                      {/* <td className="py-3">
                        <div className="flex justify-evenly text-xl">
                          <div className="px-2 cursor-pointer py-1 rounded-md shadow-md bg-lime-600">
                            <PencilSquareIcon
                              className="h-6 w-6 text-white"
                              onClick={() => handleEdit(item._id)}
                            />
                          </div>
                          <div className="px-2 cursor-pointer py-1 rounded-md shadow-md bg-red-600">
                            <TrashIcon
                              className="h-6 w-6 text-white"
                              onClick={() => handleDelete(item._id)}
                            />
                          </div>
                          <div>
                            <h1
                              className="cursor-pointer rounded-md px-2 py-1.5 bg-indigo-600 text-white font-semibold "
                              onClick={() => handleDetail(item._id)}
                            >
                              Details
                            </h1>
                          </div>
                        </div>
                      </td> */}
                    </tr>
                  );
                })}
              </table>
            </div>
          </TableBorder>
        </div>
      </div>
    </>
  );
}
