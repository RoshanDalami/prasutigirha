"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { urls } from "src/services/apiHelpers";
export default function ListVolume() {
  const FormBorder = dynamic(() => import("@/components/reusableForm"), {
    ssr: false,
  });
  const [volumeList, setVolumeList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await axios.get(`${urls.getVolumeOfMilk}`);
      if (status === 200) {
        setVolumeList(data);
      }
    }
    fetchData();
  }, []);
  const [gestationalAgeList, setGestationalAge] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getGestational}`);
      if (status === 200) {
        setGestationalAge(data);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div>
        <form className="my-5 mx-10 ">
          <p htmlFor="" className="text-red-600 text-2xl font-bold my-5 ">
            Volume of Milk
          </p>
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              className="border px-4 border-gray-300 rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
              placeholder="Search by ID..."
            />
            <input
              type="text"
              placeholder="Search by Donor Name..."
              className="border px-4 border-gray-300 rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
            />
            <input
              type="date"
              placeholder="Search by ID..."
              className="border px-4 border-gray-300 rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
            />
            <div>
              <button className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg ">
                SEARCH
              </button>
            </div>
          </div>
        </form>
        <div className="mx-10">
          <FormBorder title={"List of Volume of Milk"}>
            <div className="flex flex-col   ">
              <div className=" flex justify-end">
                <Link href={"/volumeOfMilk/addVolumeOfMilk"}>
                  <button className="text-white bg-red-600 hover:bg-[#004a89] px-4 py-3 rounded-lg font-bold ">
                    + Add
                  </button>
                </Link>
              </div>
            </div>
            <div className=" my-5">
              <table className="w-full">
                <tr className="bg-[#004a89] text-white text-lg text-center">
                  {/* <td className="py-3">
                    <input type="checkbox" name="" id="" />
                  </td> */}
                  <td className="py-3">Id</td>
                  <td className="py-3">Donor Name</td>
                  <td className="py-3">Gestational Age</td>
                  <td className="py-3">Date</td>
                  <td className="py-3">Time</td>
                  <td className="py-3">ML</td>
                  <td className="py-3">Action</td>
                </tr>
                {volumeList?.map((item, index) => {
                  return (
                    <tr
                      className=" border border-x-gray text-center"
                      key={index}
                    >
                      {/* <td className="py-3 text-center">
                    <input type="checkbox" name="" id="" />
                  </td> */}
                      <td className="py-3">{index+1}</td>
                      <td className="py-3">{item.donorName}</td>
                      {
                        gestationalAgeList?.map((age,index)=>{
                          if(age.gestationalId === item.gestationalAge){

                            return(
                              
                              <td className="py-3" key={index}>{age.gestationalName}</td>
                            )
                          }
                        })
                      }
                      <td className="py-3">{item.date}</td>
                      <td className="py-3">{item.time}</td>
                      <td className="py-3">{item.quantity}{" "}ml</td>
                      <td className="py-3">test</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </FormBorder>
        </div>
      </div>
    </>
  );
}
