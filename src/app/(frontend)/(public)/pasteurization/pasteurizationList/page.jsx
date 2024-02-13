"use client";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useEffect, useState } from "react";
import { urls } from "src/services/apiHelpers";
import axios from 'axios'

export default function ListVolume() {
  const TableBorder = dynamic(() => import("@/components/TableDesign"), {
    ssr: false,
  });
  const router = useRouter();
  const handleEdit = (id) => {
    router.push(`/pasteurization/addPasteurization/${id}`);
  }
  const handleBottleDetails = (id) => {
    router.push(`/pasteurization/pasteurizationList/${id}`);
  }

  const [poolingList,setPoolingList] = useState([]);
  useEffect(()=>{
    async function fetchData(){
      const {data,status} = await axios.get(`${urls.getPooling}`);
      if(status === 200){
        setPoolingList(data)
      }
    }
    fetchData()
  },[])
  const handleDelete =async(id)=>{
    const response = await axios.delete(`${urls.getPooling}/${id}`)
    if(response.status === 200){
      const {data,status} = await axios.get(`${urls.getPooling}`);
      if(status === 200){
        setPoolingList(data)
      }
    }
  }
  const [gestationalAge,setGestationalAge] = useState([]);
  useEffect(()=>{
    async function fetchData(){
      const {data,status} = await axios.get(`${urls.getGestational}`);
      if(status === 200){
        setGestationalAge(data)
      }
    }
    fetchData()
  },[])
 
  return (
    <>
      <div>
        <form className="my-5 mx-10 ">
          <p htmlFor="" className="text-red-600 text-2xl font-bold my-5 ">
            Pasteurization
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
          <TableBorder
            title={"List of Pasteurized Milk"}
            title2={
              <div className="flex flex-col   ">
                <div className=" flex justify-end">
                  <Link href={"/pasteurization/addPasteurization"}>
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
                  <td className="py-3 px-2">S.N</td>
                  <td className="py-3 px-2">Number of Donor </td>
                  <td className="py-3 px-2">Pooling Date</td>
                  <td className="py-3 px-2">Pooling Condition</td>
                  <td className="py-3 px-2">Volume Collected</td>
                  <td className="py-3 px-2">Batch Name</td>
                  {/* <td className="py-3 px-2">Bottle Name</td> */}
                  <td className="py-3 px-2">Expiry Date</td>
                  <td className="py-3 px-2">Action</td>
                </tr>
                {
                  poolingList?.map((row,index)=>{
                    return(

                <tr className=" border border-x-gray text-center" key={index} >
                  
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3">{row?.donorDetailsForPooling?.length}</td>
                  <td className="py-3">{row?.date}</td>
                  {
                    row.poolingCondition == 4 ? 
                    <td className="py-3">{'Colostrum'}</td> : gestationalAge?.map((item,index)=>{
                      if(item.gestationalId == row.poolingCondition){
                        return(
                          <td className="py-3" key={index}>{item.gestationalName}</td>
                        )
                      }
                    })
                  }
                  <td className="py-3">{row.collectedVolume}{" "}ml</td>
                  <td className="py-3">{row.batchName}</td>
                  <td className="py-3">{row.expireDate}</td>
                  <td className="py-3 ">
                    <div className="flex justify-evenly gap-3  text-xl">
                      {/* <div className="cursor-pointer bg-lime-600 rounded-md shadow-md px-2 py-1">
                        
                      <PencilSquareIcon
                        className="h-6 w-6 text-white "
                        onClick={() => handleEdit(row._id)}
                      />
                      </div> */}
                      <div className="cursor-pointer bg-red-600 rounded-md shadow-md px-2 py-1">

                      <TrashIcon className="h-6 w-6 text-white"  onClick={()=>handleDelete(row._id)} />
                      </div>
                      <button className="bg-indigo-600 rounded-md text-white px-2 py-1 mr-2" onClick={()=>handleBottleDetails(row._id)}  >
                              Bottles
                          </button>
                        
                    </div>
                  </td>
                </tr>
                    )
                  })
                }
              </table>
            </div>
          </TableBorder>
        </div>
      </div>
    </>
  );
}
