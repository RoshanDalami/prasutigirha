"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { urls } from "src/services/apiHelpers";
import Link from "next/link";
import Button from "src/components/button";
import axios from "axios";
import {
  getDonor,
  updateDonorStatus,
} from "src/services/apiService/donorRecord/donor";

import { useRouter } from "next/navigation";
import { searchDonor } from "src/services/apiService/search/searchService";

import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
const aa = new BikramSambat(new Date()).toBS();
import { useForm } from "react-hook-form";
import TablePagination from "@mui/material/TablePagination";
import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };

import Loader from "src/components/Loader";
import TableBorder from "src/components/TableDesign";
export default function ViewDonor() {
  const [date, setDate] = useState("");
  const engDate = new BikramSambat(date, "BS").toAD();
  const [loading, setLoading] = useState(false);
  const [dloader, setDLoader] = useState(false);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(8);
  const { register, handleSubmit } = useForm();
  const [totalCount, setTotalCount] = useState(0);
  const [donorList, setDonorList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // setLoading(true)
      setDLoader(true);
      const { status, data } = await getDonor(page, rowPerPage);
      if (status === 200) {
        setDonorList(data?.data);
        setTotalCount(data?.totalCount);
        // setLoading(false);
        setDLoader(false);
      }
    }
    fetchData();
  }, [page, rowPerPage]);
  const handlePageChange = (e, newpage) => {
    setPage(newpage);
  };
  function handlePerPage(e) {
    setRowPerPage(+e.target.value);
    setPage(0);
  }

  const resetFilter = async () => {
    const { status, data } = await getDonor();
    if (status === 200) {
      setDonorList(data);
    }
  };

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

  const handleOther = (id) => {
    router.push(`/donorRecord/viewDonorRecord/Other/${id}`);
  };
  const handleOtherView = (id) => {
    router.push(`/donorRecord/viewDonorRecord/Other/test/${id}`);
  };

  const onSubmit = async (data) => {
    try {
      console.log(data, "response");
      const response = await searchDonor(
        data.donorName,
        data.number,
        data.regNumber
      );

      if (response?.status === 200) {
        setDonorList(response?.data);
      }
    } catch (error) {
      console.log(error, "response");
    }
  };

  const handleSerologyUpdate = (id) => {
    router.push(`/donorRecord/viewDonorRecord/serologyupdate/${id}`);
  };

  const local = (
    <div>
      <form
        className="my-5 mx-10 "
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <p htmlFor="" className="text-red-600 text-2xl font-bold my-5 ">
          Donar Records
        </p>
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            className="border px-4 border-gray-300 rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
            placeholder="Donor Name"
            {...register("donorName")}
          />
          <input
            type="text"
            className="border px-4 border-gray-300 rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
            placeholder="Contact Number"
            {...register("number")}
          />
          <input
            type="text"
            className="border px-4 border-gray-300 rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
            placeholder="Hospital Regestration Number"
            {...register("regNumber")}
          />
          <div className="flex gap-3">
            <button
              className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg "
              type="submit"
            >
              SEARCH
            </button>
            <button
              className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg "
              onClick={() => resetFilter()}
            >
              RESET
            </button>
          </div>
        </div>
      </form>
      <div className="mx-10">
        <TableBorder
          title={"List of Donar Records"}
          title2={
            <div className="flex flex-col   ">
              <div className=" flex justify-end">
                <Link href={"/donorRecord/addDonorRecord"}>
                  <Button>+Add </Button>
                </Link>
              </div>
            </div>
          }
        >
          <div className=" my-5">
            <table className="w-full">
              {!dloader && (
                <tr className="bg-[#004a89] text-white text-lg text-center">
                  {/* <td className="py-3">
    <input type="checkbox" name="" id="" />
  </td> */}
                  <td className="py-3">Reg. No</td>
                  <td className="py-3">Donar Name</td>
                  <td className="py-3">Age</td>
                  <td className="py-3">Address</td>
                  <td className="py-3">Contact</td>
                  <td className="py-3">Status</td>
                  <td className="py-3">Details</td>
                  <td className="py-3">Test</td>
                  <td></td>
                </tr>
              )}
              {!dloader ? (
                donorList?.map((item, index) => {
                  return (
                    <tr
                      className=" border border-x-gray text-center"
                      key={index}
                    >
                      <td className="py-3">{item.donorRegNo}</td>
                      <td className="py-3">{item.donorName}</td>
                      <td className="py-3">{item.donorAge}</td>
                      <td className="py-3">{item?.address?.stateId}</td>
                      <td className="py-3">{item.contactNo}</td>
                      <td className="py-3">
                        <div className="flex justify-evenly text-xl">
                          <Switch
                            {...label}
                            onChange={async () => {
                              const response = await updateDonorStatus(
                                item._id
                              );
                              if (response.status === 200) {
                                setDLoader(true);
                                const { status, data } = await getDonor(
                                  page,
                                  rowPerPage
                                );
                                if (status === 200) {
                                  setDonorList(data?.data);
                                  setDLoader(false);
                                }
                              }
                            }}
                            checked={item.isDonorActive}
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <h1
                            className="cursor-pointer rounded-md px-2 py-1.5 bg-indigo-600 text-white font-semibold "
                            onClick={() => handleDetail(item._id)}
                          >
                            Details
                          </h1>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex gap-3 items-center justify-center">
                          <button
                            className="bg-indigo-600 rounded-md shadow-md px-3 py-2 text-white"
                            onClick={() => handleOther(item._id)}
                          >
                            Other
                          </button>
                          {item?.other?.length > 0 && (
                            <button
                              className="bg-indigo-600 rounded-md shadow-md px-3 py-2 text-white"
                              onClick={() => handleOtherView(item._id)}
                            >
                              View Test
                            </button>
                          )}

                          {item.isSerologyPending  && (
                            <button
                              className="bg-indigo-600 px-2 py-2 text-white rounded-lg"
                              type="button"
                              onClick={() => handleSerologyUpdate(item._id)}
                            >
                              {" "}
                              Update Serology{" "}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div className=" w-[80vw] h-screen flex items-center justify-center">
                  <Loader />
                </div>
              )}
            </table>
          </div>
        </TableBorder>
      </div>
    </div>
  );

  return <>{loading ? <Loader /> : local}</>;
}
