"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { urls } from "src/services/apiHelpers";
import Link from "next/link";
import Button from "src/components/button";
import axios from "axios";
import { getDonor } from "src/services/apiService/donorRecord/donor";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import {searchDonor} from 'src/services/apiService/search/searchService';
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
const aa = new BikramSambat(new Date()).toBS();
import { useForm } from "react-hook-form";
import TablePagination from '@mui/material/TablePagination';
export default function ViewDonor() {
  const TableBorder = dynamic(() => import("@/components/TableDesign"), {
    ssr: false,
  });
  const [date, setDate] = useState('');
  const engDate = new BikramSambat(date, "BS").toAD();
  const router = useRouter();
  const [page,setPage] = useState(0)
  const [rowPerPage,setRowPerPage] = useState(8)
  const {register,handleSubmit} = useForm()
  const [donorList, setDonorList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await getDonor();
      if (status === 200) {
        setDonorList(data);
      }
    }
    fetchData();
  }, []);
  const handlePageChange = (e,newpage)=>{
    setPage(newpage)
  }
  function handlePerPage(e){
    setRowPerPage(+e.target.value)
    setPage(0)
  }

  const resetFilter = async() =>{
    const { status, data } = await getDonor();
    if (status === 200) {
      setDonorList(data);
    }
  }

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

  const [gestationalAgeList, setGestationalAgeList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await axios.get(`${urls.getGestational}`);
      if (status === 200) {
        setGestationalAgeList(data?.data);
      }
    };
    fetchData();
  }, []);
  const gestationalOptions = gestationalAgeList?.map((item, index) => {
    return (
      <option key={index} value={item.gestationalId}>
        {item.gestationalName}
      </option>
    );
  });
const onSubmit = async(data)=>{
    try {
      console.log('test','response')
      const response = await searchDonor(data.gestationalAge,data.donorName,date)

     if(response?.status === 200){
      
        setDonorList(response?.data);
      
     }
    } catch (error) {
      console.log(error,'response')
    }
}

  return (
    <>
      <div>
        <form className="my-5 mx-10 " onSubmit={handleSubmit((data)=>onSubmit(data))}>
          <p htmlFor="" className="text-red-600 text-2xl font-bold my-5 ">
            Donar Records
          </p>
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              className="border px-4 border-gray-300 rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
              placeholder="Donor Name"
              {...register('donorName')}
            />
            
            <div>
              <select {...register('gestationalAge')} className="inputStyle" >
                <option value={''} >--select gestational age--</option>
                {gestationalOptions}
              </select>
            </div>
           
            <div className="">
           
            {/* <input
              type="date"
              placeholder=""
              className="inputStyle"
              {...register("date", { required: "Date is Required" })}
            /> */}
            <NepaliDatePicker
              inputClassName="form-control  focus:outline-none"
              value={date}
              onChange={(e) => setDate(e)}
              // onChange={() => handleDateChange()}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className="inputStyle"
            />
            {/* {error && <p className="errorMessages">{error}</p>} */}
          </div>
            <div className="flex gap-3">
              <button className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg " type="submit" >
                SEARCH
              </button>
              <button className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg " onClick={()=>resetFilter()} >
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
                <tr className="bg-[#004a89] text-white text-lg text-center">
                  {/* <td className="py-3">
                    <input type="checkbox" name="" id="" />
                  </td> */}
                  <td className="py-3">Reg. No</td>
                  <td className="py-3">Donar Name</td>
                  <td className="py-3">Age</td>
                  <td className="py-3">Address</td>
                  <td className="py-3">Contact</td>
                  {/* <td className="py-3">Action</td> */}
                </tr>
                {donorList?.slice((page * rowPerPage),((page * rowPerPage) + rowPerPage))?.map((item, index) => {
                  return (
                    <tr
                      className=" border border-x-gray text-center"
                      key={index}
                    >
                      {/* <td className="py-3 text-center">
                    <input type="checkbox" name="" id="" />
                  </td> */}
                      <td className="py-3">{item.donorRegNo}</td>
                      <td className="py-3">{item.donorName}</td>
                      <td className="py-3">{item.donorAge}</td>
                      <td className="py-3">{item?.address?.stateId}</td>
                      <td className="py-3">{item.contactNo}</td>
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
              <TablePagination
               rowsPerPageOptions={[7]}
               rowsPerPage={rowPerPage}
               page={page}
               count={donorList.length}
               component={'div'}
               onPageChange={handlePageChange}
               onRowsPerPageChange={handlePerPage}
              ></TablePagination>
            </div>
          </TableBorder>
        </div>
      </div>
    </>
  );
}
