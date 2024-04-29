"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { urls } from "src/services/apiHelpers";
import Link from "next/link";
import Button from "src/components/button";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { getFiscalYear } from 'src/services/apiService/officeService/office'
export default function ViewDonor() {
  const TableBorder = dynamic(() => import("@/components/TableDesign"), {
    ssr: false,
  });
  const router = useRouter();
  const [apiData,setApiData] = useState([]);
  useEffect(()=>{
    async function getApiData (){
      try {
        const {data,status} = await getFiscalYear();
        if(status === 200){
          setApiData(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getApiData()
  },[])

  return (
    <>
      <div>
        <div className="mx-10">
          <TableBorder
            title={"Fiscal Year List"}
            title2={
              <div className="flex flex-col   ">
                <div className=" flex justify-end">
                  <Link href={"/office/fiscalYear/createFiscalYear"}>
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
                  <th className="py-3">S No.</th>
                  <th className="py-3">Fiscal Year</th>
                  <th className="py-3">Status</th>

                  {/* <td className="py-3">Email</td>
                  <td className="py-3">Contact</td> */}
                </tr>
                {
                  apiData?.map((item,index)=>{
                    return(
                      <tr key={index}>
                        <th className="border border-black px-2 py-3">{index + 1}</th>
                        <th className="border border-black px-2 py-3">{item.fiscalYear}</th>
                        <th className={`border border-black px-2 py-3 ${item.status ? 'text-green-600':"text-red-600"} `}>{item.status ? "Active":"Deactive"}</th>
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
