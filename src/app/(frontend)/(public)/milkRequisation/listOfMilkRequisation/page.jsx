"use client";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Button from "src/components/button";
import { urls } from "src/services/apiHelpers";
import axios from "axios";
import toast from "react-hot-toast";
import { getMilkRequsition } from "src/services/apiService/milkRequistion/requistionService";
import { searchRequsition } from "src/services/apiService/search/searchService";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
const aa = new BikramSambat(new Date()).toBS();
import LoadingSpinner from "src/components/Loading";
import { useForm } from "react-hook-form";
import Loader from "src/components/Loader";
export default function ListVolume() {
  const TableBorder = dynamic(() => import("@/components/TableDesign"), {
    ssr: false,
  });
  const {register, handleSubmit} = useForm();
  const router = useRouter();
  const [requsitionList, setRequsitionList] = useState([]);
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState("");
  const engDate = new BikramSambat(date, "BS").toAD();
  useEffect(() => {
    async function fetchData() {
      const {data, status} = await getMilkRequsition()
      if (status === 200) {
        setRequsitionList(data);
        setLoading(false)
        toast.success("List generated successfully");
      } else {
        toast.error("List generation failed");
      }
    }

    fetchData();
  }, []);
  const [gestationalAgeList, setGestationalAgeList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const {data, status} = await axios.get(`${urls.getGestational}`);
      if (data?.status === 200) {
        setGestationalAgeList(data?.data);
      }
    }

    fetchData();
  }, []);
  const handleEdit = useCallback(
      (id) => {
        router.push(`/milkRequisation/addMilkRequisation/${id}`);
      },
      [router]
  );
  const handleDelete = async (id) => {
    const response = await axios.delete(`${urls.deleteRequistion}/${id}`);
    if (response?.data?.status === 200) {
      const {data, status} = await axios.get(`${urls.getRequistion}`);
      if (data?.status === 200) {
        setRequsitionList(data?.data);
      }
    }
  };

  function combineQuantities(array) {
    // Create a map to hold combined items
    const combinedMap = new Map();

    array?.forEach(item => {
      const key = `${item.batchNumber}-${item.bottleName}`;
      if (combinedMap.has(key)) {
        // If the item exists, sum the quantities
        combinedMap.get(key).quantity += item.quantity;
      } else {
        // If it doesn't exist, add the item to the map
        combinedMap.set(key, {...item});
      }
    });

    // Convert the map values back to an array
    return Array.from(combinedMap.values());
  }

  const onSubmit = async (data) => {

    try {
      const response = await searchRequsition(date);

      if (response?.status === 200) {
        setRequsitionList(response?.data);
      }
    } catch (error) {
      console.log(error, 'response');
    }
  };
  const local = <div>
    <form
        className="my-5 mx-10 "
        onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <p htmlFor="" className="text-red-600 text-2xl font-bold my-5 ">
        Milk Requisition Form
      </p>
      <div className="grid grid-cols-4 gap-4">
        <div className="">
          <NepaliDatePicker
              inputClassName="form-control  focus:outline-none"
              value={date}
              onChange={(e) => setDate(e)}
              // onChange={() => handleDateChange()}
              options={{calenderLocale: "en", valueLocale: "en"}}
              className="inputStyle"
          />
        </div>

        <button
            className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg "
            type="submit"
        >
          SEARCH
        </button>
      </div>
    </form>
    <div className="mx-10">
      <TableBorder
          title={"List of Milk Requisition Form"}
          title2={
            <div className="flex flex-col   ">
              <div className=" flex justify-end">
                <Link href={"/milkRequisation/addMilkRequisation"}>
                  <Button>+Add </Button>
                </Link>
              </div>
            </div>
          }
      >
        <div className=" my-5">
          <table className="w-full">
            <tr className="bg-[#004a89] text-white text-lg text-center">
              {/* <td className="py-3 px-3">
      <input type="checkbox" name="" id="" />
    </td> */}
              <td className="py-3 ">S.N</td>
              <td className="py-3 ">Baby Name</td>
              <td className="py-3">Feeding Date</td>
              <td className="py-3">Total Milk Feeded</td>
              <td className="py-3">No. of Bottle</td>
              {/* <td className="py-3 ">Action</td> */}
            </tr>
            {requsitionList?.map((row, index) => {
              return (
                  <tr
                      className=" border border-x-gray text-center"
                      key={index}
                  >
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3">{row?.babyName}</td>
                    <td className="py-3">{row?.feedingDate}</td>

                    <td className="py-3">
                      {row.requisitedMilk
                          .map((item) => {
                            return item.quantity;
                          })
                          .reduce((acc, amount) => acc + amount, 0)}
                    </td>
                    <td className="py-3">{combineQuantities(row?.requisitedMilk).length}</td>
                  </tr>
              );
            })}
          </table>
        </div>
      </TableBorder>
    </div>
  </div>

  return (
      <>
        { loading ? <Loader /> : local }
      </>
  );
}
