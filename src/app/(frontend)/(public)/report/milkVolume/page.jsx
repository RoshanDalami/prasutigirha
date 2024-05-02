"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { urls } from "src/services/apiHelpers";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import {
  getVolumeOfMilk,
  deleteMilkById,
} from "src/services/apiService/milkVolume/milkVolume";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { searchMilkVolume } from "src/services/apiService/search/searchService";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
const aa = new BikramSambat(new Date()).toBS();
import { CSVLink, CSVDownload } from "react-csv";
import { useForm } from "react-hook-form";
export default function ListVolume() {
  const TableBorder = dynamic(() => import("@/components/TableDesign"), {
    ssr: false,
  });
  const { register, handleSubmit , reset } = useForm();
  const [date, setDate] = useState("");
  const engDate = new BikramSambat(date, "BS").toAD();
  const [volumeList, setVolumeList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await getVolumeOfMilk();
      
      if (status === 200) {
        setVolumeList(data);
        setFilteredVolumeList(data);
      }
    }
    fetchData();
  }, []);
  const resetFilter = async()=>{
    const { status, data } = await getVolumeOfMilk();
    console.log(status,data,'response')
    if (status === 200) {
      
      setFilteredVolumeList(data);
    }
    reset()
  }
  const [gestationalAgeList, setGestationalAge] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getGestational}`);
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
        const { status, data } = await getVolumeOfMilk();
        if (status === 200) {
          setVolumeList(data);
          setFilteredVolumeList(data);
        }
      }
      console.log(response, "deleted");
    } catch (error) {}
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
      const response = await searchMilkVolume(data.gestationalAge,date)
      console.log(response,'response')
      if(response?.status === 200){
        setFilteredVolumeList(response?.data);
      }
    } catch (error) {}
  };
  return (
    <>
      <div>
      <form
          className="my-5 mx-10 "
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <p htmlFor="" className="text-red-600 text-2xl font-bold my-5 ">
            Volume of Milk
          </p>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <select {...register("gestationalAge")} className="inputStyle">
                <option value={""}>--select gestational age--</option>
                {gestationalOptions}
              </select>
            </div>

            <div className=" ">
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
              <button
                className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg "
                type="submit"
              >
                SEARCH
              </button>
              <button
                className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg "
                onClick={()=>resetFilter()}
              >
                RESET
              </button>
            </div>
          </div>
        </form>
        <div className="mx-10">
          <TableBorder
            title={"Milk Volume Report"}
            title2={
              <div className="flex flex-col  ">
                <div className=" flex justify-end gap-3">
                  <button className="bg-indigo-600 rounded-md text-white font-bold px-3 py-2">
                    <CSVLink data={filteredVolumeList} filename="Milk_volume.csv">
                      Export to Excel
                    </CSVLink>
                  </button>
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
                  <td className="py-3">Date</td>
                  {/* <td className="py-3">Time</td> */}
                  <td className="py-3">Total Volume</td>
                  {/* <td className="py-3">Action</td> */}
                </tr>

                {filteredVolumeList?.map((item, index) => {
                  return (
                    <tr
                      className=" border border-x-gray text-center"
                      key={index}
                    >
                      {/* <td className="py-3 text-center">
                    <input type="checkbox" name="" id="" />
                  </td> */}
                      <td className="py-3">{index + 1}</td>
                      <td className="py-3">{item.donorName}</td>
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
                      <td className="py-3">{item.date}</td>
                      {/* <td className="py-3">{item.time}</td> */}
                      <td className="py-3">{item.totalMilkCollected} ml</td>
                      
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
