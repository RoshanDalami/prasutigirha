"use client";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import TableBorder from "src/components/TableDesign";
import { urls } from "src/services/apiHelpers";
import {
  getBabyDetail,
  getBabyById
} from "src/services/apiService/baby/babyServices"
import { CSVLink } from "react-csv";
import Link from "next/link";
export default function BabyDetail() {
  const [babyDetails, setBabyDetails] = useState([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await getBabyDetail();
      if (status === 200) {
        setBabyDetails(data);
      }
    }
    fetchData();
  }, []);
  console.log(babyDetails, "babydetail");
  const handleDetail = useCallback(
    (id) => {
      router.push(`/milkRequisation/babyDetails/${id}`);
    },
    [router]
  );
   //gestationalAge
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
const excelData = babyDetails?.map((item)=>{
    return({
        Baby_Name:item.babyName,
        Date_of_Birth:item.dateOfBaby,
        Gestational_Age: gestationalAgeList?.map((items)=>{
            if(item.gestationalAge === items.gestationalId){
                return items.gestationalName
            }
        }),
        IP_Number : item.ipNumber,
        Baby_Weight:item.babyWeight,
        Diagnosis:`${item.diagnosis[0]}`,
        Indication:item.indications[0],
        Baby_Status : item.babyStatus,
        Total_Milk_Consumed:item.milkConsumed
    })
})
 
  return (
    <div className="pt-10 px-10">
      <TableBorder title={"Baby Details Report"} title2={
    <button  className="bg-indigo-600 rounded-md shadow-md px-3 py-2 text-white">
        <CSVLink data={excelData} filename="Recipient.csv">

      Export to Excel
        </CSVLink>
    </button>
  } >
        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#004a89] text-white text-lg text-center">
                <td className="py-3">S.No</td>
                <td className="py-3">Baby Name</td>
                <td className="py-3">Date of Birth</td>
                <td className="py-3">Weight</td>
                <td className="py-3">Indication</td>
                <td className="py-3">Baby Status</td>
                <td className="py-3">Milk Consumed</td>
                <td className="py-3">Action</td>
              </tr>
            </thead>
            <tbody>
              {babyDetails?.map((items, index) => {
                return (
                  <tr key={index} className="border border-x-gray text-center">
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3">{items?.babyName}</td>
                    <td className="py-3">{items?.dateOfBaby}</td>
                    <td className="py-3">{items?.babyWeight}</td>
                    <td className="py-3">{items?.indications}</td>
                    <td className="py-3">{items?.babyStatus}</td>
                    <td className="py-3">{items?.milkConsumed}</td>
                    <td className="py-3">
                      <div className="flex justify-evenly text-xl">
                        {/* <div className="px-2 cursor-pointer py-1 rounded-md shadow-md bg-lime-600">
                          <PencilSquareIcon
                            className="h-6 w-6 text-white"
                            onClick={() => handleEdit(items._id)}
                          />
                        </div>
                        <div className="px-2 cursor-pointer py-1 rounded-md shadow-md bg-red-600">
                          <TrashIcon
                            className="h-6 w-6 text-white"
                            onClick={() => handleDelete(items._id)}
                          />
                        </div> */}
                        <div>
                          <h1
                            className="cursor-pointer bg-indigo-600 font-semibold rounded-md text-white px-2 py-1.5"
                            onClick={() => handleDetail(items._id)}
                          >
                            Details
                          </h1>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TableBorder>
    </div>
  );
}
