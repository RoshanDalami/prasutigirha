"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TableBorder from "src/components/TableDesign";
import { urls } from "src/services/apiHelpers";
export default function Details() {
  const [donorDetails, setDonorDetails] = useState({});
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await axios.get(
        `${urls.getMilkByDonorId}/${id}`
      );
      if (status === 200) {
        setDonorDetails(data);
      }
    }
    fetchData();
  }, [id]);
  console.log(donorDetails, "donordetails");
  return (
    <div className=" px-10 pt-10 ">
      <div className="grid grid-cols-4  text-lg leading-9">
        <p className="  text-lg">
          Donor Name :{" "}
          <span className="font-bold">{donorDetails?.donorName}</span>
        </p>
        <p className=" text-lg">
          Reg No : <span className="font-bold">{donorDetails?.donorRegNo}</span>
        </p>
        <p className=" text-lg">
          Donor Age :{" "}
          <span className="font-bold">{donorDetails?.donorAge}</span>
        </p>
        <p>
          Address : <span className="font-bold">{donorDetails?.address}</span>
        </p>
        <p>
          Mode of Delivery :{" "}
          <span className="font-bold">{donorDetails?.modeOfDelivery}</span>
        </p>
      </div>
      <TableBorder title={"Donor Details"}>
        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#004a89] text-white text-lg text-center">
                <td className="py-3">S.No</td>
                <td className="py-3">Stored By</td>
                <td className="py-3">Quantity</td>
                <td className="py-3">Temperature</td>
                <td className="py-3">Time</td>
                <td className="py-3">Date</td>
              </tr>
            </thead>
            <tbody>
              {donorDetails?.donotedMilkList?.map((items, index) => {
                return (
                  <tr key={index} className="border border-x-gray text-center">
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3">{items?.storedBy}</td>
                    <td className="py-3">{items?.quantity}</td>
                    <td className="py-3">{items?.temp}</td>
                    <td className="py-3">{items?.time}</td>
                    <td className="py-3">{items?.date}</td>
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
