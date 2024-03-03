"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TableBorder from "src/components/TableDesign";
import { urls } from "src/services/apiHelpers";
export default function Details() {
  const [donorDetails, setDonorDetails] = useState([]);
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
      <div className="flex  justify-around">
        <div className="font-bold text-lg leading-9">
          <p className="font-bold text-lg">
            Donor Name : <span></span>
          </p>
          <p className="font-bold text-lg"> 
            Donor Age : <span></span>
          </p>
          <p>
            Address : <span></span>
          </p>
          <p>
            Mode of Delivery : <span></span>
          </p>
        </div>
        <div className="font-bold text-lg leading-9">
          <p>
            Baby Name : <span></span>
          </p>
          <p>
            Date of Birth : <span></span>
          </p>
          <p>
            Gestational Age : <span></span>
          </p>
          <p>
            Baby Weight : <span></span>
          </p>
        </div>
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
              {donorDetails?.map((items, index) => {
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
