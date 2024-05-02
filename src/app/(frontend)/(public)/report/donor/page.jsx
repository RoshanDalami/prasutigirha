"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { urls } from "src/services/apiHelpers";
import Link from "next/link";
import Button from "src/components/button";
import axios from "axios";
import {
  getDonor,
  getInActiveDonor,
} from "src/services/apiService/donorRecord/donor";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { searchDonor } from "src/services/apiService/search/searchService";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
const aa = new BikramSambat(new Date()).toBS();
import { useForm } from "react-hook-form";
import { CSVLink, CSVDownload } from "react-csv";
export default function ViewDonor() {
  const TableBorder = dynamic(() => import("@/components/TableDesign"), {
    ssr: false,
  });
  const [date, setDate] = useState("");
  const engDate = new BikramSambat(date, "BS").toAD();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [donorList, setDonorList] = useState([]);
  const [active, setActive] = useState(true);
  const [inActive, setInactive] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await getDonor();
      if (status === 200) {
        setDonorList(data);
      }
    }
    fetchData();
  }, []);

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
  
  const onSubmit = async (data) => {
    try {
      console.log("test", "response");
      const response = await searchDonor(
        data.gestationalAge,
        data.donorName,
        date
      );

      if (response?.status === 200) {
        setDonorList(response?.data);
      }
    } catch (error) {
      console.log(error, "response");
    }
  };
  const excelData = donorList?.map((item,index)=>{
    return{
      sn:index + 1,
    hosRegNo:item.hosRegNo,
    DonorRegNo:item.donorRegNo,
    Donor_Name:item.donorName,
    Reg_Date:item.date,
    Donor_Age:item.donorAge,
    Donor_Education:item.education,
   Donor_Ethnicity: item.ethnicity,
    Donor_State:item.address.stateId,
    Donor_District:item.address.districtId,
      Gestational_Age: item.gestationalName,
      Mode_of_Delivery:item.deliveryName,
      Parity:item.parityName,
    Donor_Contact:item.contactNo,
    Donor_Status:item.isDonorActive,
    }
  })
  console.log(donorList,'response')
  return (
    <>
      <div>
        <div className="mx-10">
          <TableBorder
            title={"Donar Report"}
            title2={
              <div className="flex flex-col  ">
                <div className=" flex justify-end gap-3">
                  <button className="bg-indigo-600 rounded-md text-white font-bold px-3 py-2">
                    <CSVLink data={excelData} filename="Donor_list.csv">
                      Export to Excel
                    </CSVLink>
                  </button>
                  <button
                    className={`bg-indigo-600 rounded-md px-3 py-2 shadow-md text-white ${active?'bg-green-500':''}`}
                    onClick={async () => {
                      const response = await getDonor();
                      setInactive(false)
                      setActive(true)
                      if (response?.status === 200) {
                        setDonorList(response?.data);
                      }
                    }}
                  >
                    Active Donor
                  </button>
                  <button
                    className={`bg-indigo-600 rounded-md px-3 py-2 shadow-md text-white ${inActive?'bg-green-500':''}`}
                    onClick={async () => {
                      const response = await getInActiveDonor();
                      if (response?.status === 200) {
                        setActive(false);
                        setInactive(true)
                        setDonorList(response?.data);
                      }
                    }}
                  >
                    Inactive Donor
                  </button>
                </div>
              </div>
            }
          >
            <div className="flex gap-3 mt-5"></div>
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
                  <td className="py-3">Action</td>
                </tr>
                {donorList?.map((item, index) => {
                  return (
                    <tr
                      className={`border border-x-gray text-center ${item.isDonorActive ? '':'bg-red-400/80'}`}
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
                      <td className="py-3">
                        <div className="flex justify-evenly text-xl">
                         
                          <div>
                            <h1
                              className="cursor-pointer rounded-md px-2 py-1.5 bg-indigo-600 text-white font-semibold "
                              onClick={() => handleDetail(item._id)}
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
            </div>
          </TableBorder>
        </div>
      </div>
    </>
  );
}
