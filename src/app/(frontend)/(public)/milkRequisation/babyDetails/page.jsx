"use client";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import TableBorder from "src/components/TableDesign";
import { urls } from "src/services/apiHelpers";
import {
  getBabyDetail,
  getBabyById,
  updateBabyStatus,
} from "src/services/apiService/baby/babyServices";
import Link from "next/link";
import LoadingSpinner from "src/components/Loading";
import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };
export default function BabyDetail() {
  const [babyDetails, setBabyDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await getBabyDetail();
      if (status === 200) {
        setBabyDetails(data);
        setLoading(false);
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
  const local = (
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
            <td className="py-3">Status</td>
          </tr>
        </thead>
        <tbody>
          {babyDetails?.map((items, index) => {
            return (
              <tr key={index} className={` ${!items?.status ? 'bg-red-400':''} border border-x-gray text-center`}>
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
                <td className="py-3">
                  <Switch
                    {...label}
                    onChange={async () => {
                      const response = await updateBabyStatus(items._id);
                      console.log(response,'response')
                      if (response?.status === 200) {
                        const { status, data } = await getBabyDetail();
                        if (status === 200) {
                          setBabyDetails(data);
                          setLoading(false);
                        }
                      }
                    }}
                    checked={items?.status}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="pt-10 px-10">
      <TableBorder
        title={"Baby Details"}
        title2={
          <div className="flex flex-col   ">
            <div className=" flex justify-end">
              <Link href={"/milkRequisation/addBabyDetails"}>
                <button className="text-white bg-red-600 hover:bg-[#004a89] px-4 py-3 rounded-lg font-bold ">
                  + Add
                </button>
              </Link>
            </div>
          </div>
        }
      >
        {loading ? <LoadingSpinner /> : local}
      </TableBorder>
    </div>
  );
}
