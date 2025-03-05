"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { urls } from "src/services/apiHelpers";

import TablePagination from "@mui/material/TablePagination";
import {
  getVolumeOfMilk,
  deleteMilkById,
  getDonorWithTotalVolume,
} from "src/services/apiService/milkVolume/milkVolume";

import { useRouter } from "next/navigation";
import { searchMilkVolume } from "src/services/apiService/search/searchService";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
const aa = new BikramSambat(new Date()).toBS();
import { useForm } from "react-hook-form";
import Loader from "src/components/Loader";
import TableBorder from '@/components/TableDesign'
export default function ListVolume() {
  // const TableBorder = dynamic(() => import("@/components/TableDesign"), {
  //   ssr: false,
  // });
  const {register, handleSubmit, reset} = useForm();
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const engDate = new BikramSambat(date, "BS").toAD();
  const [volumeList, setVolumeList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const {status, data} = await getDonorWithTotalVolume();

      if (status === 200) {
        setVolumeList(data);
        setFilteredVolumeList(data);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);
  const resetFilter = async () => {
    const {status, data} = await getDonorWithTotalVolume();

    if (status === 200) {
      setVolumeList(data);
      setFilteredVolumeList(data);
    }
    reset();
  };
  const [gestationalAgeList, setGestationalAge] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const {data, status} = await axios.get(`${urls.getGestational}`);
      if (status === 200) {
        setGestationalAge(data?.data);
      }
    }

    fetchData();
  }, []);
  const router = useRouter();
  const handleEdit = useCallback(
      (id) => {
        router.push(`/volumeOfMilk/addVolumeOfMilk/${id}`);
      },
      [router]
  );

  // Search donar
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVolumeList, setFilteredVolumeList] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredList = volumeList.filter(
        (item) =>
            item.donorId.contactNo
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            item.donorId.hosRegNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVolumeList(filteredList);
  };

  async function handleDelete(id) {
    try {
      const response = await deleteMilkById(id);
      console.log(response, "response");
      if (response?.status === 200) {
        const {status, data} = await getVolumeOfMilk();
        if (status === 200) {
          setVolumeList(data);
          setFilteredVolumeList(data);
        }
      }
      console.log(response, "deleted");
    } catch (error) {
    }
  }

  const handleDetail = useCallback(
      (id) => {
        router.push(`/donorRecord/viewDonorRecord/${id}`);
      },
      [router]
  );
  const gestationalOptions = gestationalAgeList?.map((item, index) => {
    return (
        <option key={index} value={item.gestationalId}>
          {item.gestationalName}
        </option>
    );
  });
  const onSubmit = async (data) => {
    try {
      const response = await searchMilkVolume(data.donorName);
      console.log(response, "response");
      if (response?.status === 200) {
        setFilteredVolumeList(response?.data);
      }
    } catch (error) {
    }
  };
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(8);
  const handlePageChange = (e, newpage) => {
    setPage(newpage);
  };

  function handlePerPage(e) {
    setRowPerPage(+e.target.value);
    setPage(0);
  }

  const local = <div>
    <form
        className="my-5 mx-10 "
        onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <p htmlFor="" className="text-red-600 text-2xl font-bold my-5 ">
        Volume of Milk
      </p>
      <div className="grid grid-cols-4 gap-4">
        <div className="">
          <input
              type="text"
              className="inputStyle w-full"
              placeholder="Donor Name"
              {...register("donorName")}
          />
        </div>

        <div className="flex gap-3">
          <button
              className="text-white bg-red-600 hover:bg-[#004a89]  px-3 py-1 rounded-lg text-sm "
              type="submit"
          >
            SEARCH
          </button>
          <button
                    className="text-white bg-red-600 hover:bg-[#004a89]  rounded-lg text-sm px-3 py-1 "
              onClick={() => resetFilter()}
          >
            RESET
          </button>
        </div>
      </div>
    </form>
    <div className="mx-10">
      <TableBorder
          title={"List of Volume of Milk"}
          title2={
            <div className="flex flex-col   ">
              <div className=" flex justify-end">
                <Link href={"/volumeOfMilk/addVolumeOfMilk"}>
                  <button className="text-white bg-red-600 hover:bg-[#004a89] px-4 py-3 rounded-lg font-bold ">
                    + Add
                  </button>
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
              <td className="py-3">Id</td>
              <td className="py-3">Donor Name</td>
              <td className="py-3">Gestational Age</td>
              {/* <td className="py-3">Contact</td> */}
              {/* <td className="py-3">Date</td> */}
              {/* <td className="py-3">Time</td> */}
              <td className="py-3">Total Volume</td>
              <td className="py-3">Action</td>
            </tr>

            {filteredVolumeList
                ?.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                ?.map((item, index) => {
                  console.log(item)
                  return (
                      <tr
                          className=" border border-x-gray text-center"
                          key={index}
                      >
                        {/* <td className="py-3 text-center">
                    <input type="checkbox" name="" id="" />
                  </td> */}
                        <td className="py-3">{index + 1}</td>
                        <td className="py-3">{item.donorName}({item.donorRegNo})</td>
                        {gestationalAgeList?.map((age, index) => {
                          if (age.gestationalId === item.gestationalAge) {
                            return (
                                <td className="py-3" key={index}>
                                  {age.gestationalName}
                                </td>
                            );
                          }
                        })}
                        {/* <td className="py-3">{item.donorId.contactNo}</td> */}
                        {/* <td className="py-3">{item.date}</td> */}
                        {/* <td className="py-3">{item.time}</td> */}
                        <td className="py-3">{item.totalMilkCollected} ml</td>
                        <td className="py-3">
                          <div className="flex justify-evenly text-xl">
                         
                            <div>
                              <h1
                                  className="cursor-pointer rounded-md px-2 py-1.5 bg-indigo-600 text-white text-sm "
                                  onClick={() => handleDetail(item.donorId)}
                              >
                                Details
                              </h1>
                            </div>
                          </div>
                        </td>
                      </tr>
                  );
                })}
          </table>
          <TablePagination
              rowsPerPageOptions={[7]}
              rowsPerPage={rowPerPage}
              page={page}
              count={filteredVolumeList?.length}
              component={"div"}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handlePerPage}
          ></TablePagination>
        </div>
      </TableBorder>
    </div>
  </div>

  return (
      <>
        {isLoading ? <Loader /> : local}
      </>
  );
}
