"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TableBorder from "src/components/TableDesign";
import { urls } from "src/services/apiHelpers";

export default function BabyDetailsById() {
  const [babyDetails, setBabyDetails] = useState({});
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await axios.get(`${urls.getBaby}/${id}`);
      if (status === 200) {
        setBabyDetails(data);
      }
    }
    fetchData();
  }, [id]);
  console.log(babyDetails, "babyDetails");
  return (
    <>
      <div className=" px-10 pt-10 ">
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
        <TableBorder title={"Donor Details"}>
          <div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#004a89] text-white text-lg text-center">
                  <td className="py-3">S.No</td>
                  <td className="py-3">Batch No.</td>
                  <td className="py-3">Quantity</td>
                  <td className="py-3">Bottle Name</td>
                  <td className="py-3">Bottle No</td>
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
                      <td className="py-3">{items?.batchNumber}</td>
                      <td className="py-3">{items?.quantity}</td>
                      <td className="py-3">{items?.bottleName}</td>
                      <td className="py-3">{items?.uniqueBottleNumber}</td>
                      <td className="py-3">{items?.feedingDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TableBorder>
      </div>
    </>
  );
}
