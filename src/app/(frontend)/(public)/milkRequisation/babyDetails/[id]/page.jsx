"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TableBorder from "src/components/TableDesign";
import { urls } from "src/services/apiHelpers";
import {getBabyById} from 'src/services/apiService/baby/babyServices'
import LoadingSpinner from "src/components/Loading";
export default function BabyDetailsById() {
  const [babyDetails, setBabyDetails] = useState({});
  const [loading,setLoading] = useState(true)
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await getBabyById(id);
      if (status === 200) {
        setBabyDetails(data);
        setLoading(false)
      }
    }
    fetchData();
  }, [id]);
  console.log(babyDetails, "babyDetails");
  const exportToExcel = () => {
    // Prepare data for export
    const exportData = [];
    
    // Push donor information as the first row
    exportData.push({
        "Baby Name": babyDetails.babyName,
        "Date of Birth":  babyDetails.dateOfBaby,
        "Gestational Age": babyDetails?.gestationalAge,
        "Baby Weight": babyDetails?.babyWeight,
        
        "Batch No": "", // Empty cell for array data
        "Quantity": "", // Empty cell for array data
        "Bottle Name": "", // Empty cell for array data
        "Feeding Date": "", // Empty cell for array data
       
    });

    // Push array data as separate rows
    babyDetails?.milkComsumedDetail?.forEach(item => {
        exportData.push({
          "Baby Name": '',
          "Date of Birth":  '',
          "Gestational Age": '',
          "Baby Weight": '',
          
          "Batch No":item?.batchNumber?.split('/')[1] + " "+"(" +(`${item?.batchNumber?.split('/')[2]}`)+")", // Empty cell for array data
          "Quantity": item?.quantity, // Empty cell for array data
          "Bottle Name":item?.bottleName?.split('/')[1] , // Empty cell for array data
          "Feeding Date": item?.feedingDate, // Empty cell for array data
        });
    });

    // Convert data to CSV format
    const csvContent = "data:text/csv;charset=utf-8," 
        + Object.keys(exportData[0]).join(',') + '\n'
        + exportData.map(obj => Object.values(obj).join(',')).join('\n');

    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${babyDetails.babyName} Details.csv`);
    document.body.appendChild(link); // Required for FF

    // Simulate click to trigger download
    link.click();
};
const local = <div className=" px-10 pt-10 ">
<div className="flex justify-between  text-lg leading-9">
  <p className="  text-lg">
    Baby Name :{" "}
    <span className="font-bold">{babyDetails?.babyName}</span>
  </p>
  <p className=" text-lg">
    Date of Birth :{" "}
    <span className="font-bold">{babyDetails?.dateOfBaby}</span>
  </p>
  <p className=" text-lg">
    Gestational Age :{" "}
    <span className="font-bold">{babyDetails?.gestationalAge}</span>
  </p>
  <p>
    Baby Weight :{" "}
    <span className="font-bold">{babyDetails?.babyWeight}</span>
  </p>
</div>
<TableBorder title={"Donor Details"}  title2={
<button onClick={()=>exportToExcel()} className="bg-indigo-600 rounded-md shadow-md px-3 py-2 text-white">
Export to Excel
</button>
} >
  <div>
    <table className="w-full">
      <thead>
        <tr className="bg-[#004a89] text-white text-lg text-center">
          <td className="py-3">S.No</td>
          <td className="py-3">Batch No.</td>
          <td className="py-3">Quantity</td>
          <td className="py-3">Bottle Name</td>
          {/* <td className="py-3">Bottle No</td> */}
          <td className="py-3">Feeding Date</td>
        </tr>
      </thead>
      <tbody>
        {babyDetails?.milkComsumedDetail?.map((items, index) => {
          return (
            <tr
              key={index}
              className="border border-x-gray text-center"
            >
              <td className="py-3">{index + 1}</td>
              <td className="py-3">{items?.batchNumber?.split('/')[1]}{" "}{`(${items?.batchNumber?.split('/')[2]})`}</td>
              <td className="py-3">{items?.quantity}</td>
              <td className="py-3">{items?.bottleName?.split('/')[1]}</td>
              {/* <td className="py-3">{items?.uniqueBottleNumber}</td> */}
              <td className="py-3">{items?.feedingDate}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</TableBorder>
</div>
  return (
    <>
      {
        loading?<LoadingSpinner/>:local
      }
    </>
  );
}
