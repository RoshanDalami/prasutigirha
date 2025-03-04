"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { urls } from "src/services/apiHelpers";
import axios from "axios";
import {
  deletePooling,
  getPooling,
  updateCulture,
} from "src/services/apiService/pasteurization/pasteurization";
import TableBorder from "src/components/TableDesign";
import { useForm } from "react-hook-form";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import Loader from "src/components/Loader";
const aa = new BikramSambat(new Date()).toBS();
import { searchPasteurization } from "src/services/apiService/search/searchService";

export default function ListVolume() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const router = useRouter();
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [resetLoading, setResetLoading] = useState(false);
  const engDate = new BikramSambat(date, "BS").toAD();
  const handleEdit = (id) => {
    router.push(`/pasteurization/addPasteurization/${id}`);
  };
  const handleBottleDetails = (id) => {
    router.push(`/pasteurization/pasteurizationList/${id}`);
  };
  const handleOtherTest = (id) => {
    router.push(`/pasteurization/pasteurizationList/other/${id}`);
  };
  const handleCulture = (id) => {
    router.push(`/pasteurization/pasteurizationList/culture/${id}`);
  };

  const [poolingList, setPoolingList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, status } = await getPooling();

      if (status === 200) {
        setPoolingList(data);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    const response = await deletePooling(id);

    if (response?.status === 200) {
      const { data, status } = await getPooling();
      if (status === 200) {
        setPoolingList(data);
      }
    }
  };
  const [gestationalAge, setGestationalAge] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getGestational}`);
      if (data?.status === 200) {
        setGestationalAge(data?.data);
      }
    }
    fetchData();
  }, []);
  const onSubmit = async (culture, id) => {
    const data = {
      id,
      culture,
    };
    try {
      const { status } = await updateCulture(data);
      if (status === 200) {
        const { data, status } = await getPooling();
        if (status === 200) {
          setPoolingList(data);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  const submit = async (data) => {
    try {
      const response = await searchPasteurization(data.gestationalAge, date);
      console.log(response, "past");
      if (response?.status === 200) {
        setPoolingList(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(poolingList, "past pooling");
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(8);
  const handlePageChange = (e, newpage) => {
    setPage(newpage);
  };
  function handlePerPage(e) {
    setRowPerPage(+e.target.value);
    setPage(0);
  }
  function combineVolumes(array) {
    // Create a map to hold combined items
    const combinedMap = new Map();
    array?.forEach((item) => {
      const key = item.donorId;
      if (combinedMap.has(key)) {
        // If the item exists, sum the volumes
        combinedMap.get(key).volumeOfMilkPooled += item.volumeOfMilkPooled;
      } else {
        // If it doesn't exist, add the item to the map
        combinedMap.set(key, { ...item });
      }
    });
    // Convert the map values back to an array
    return Array.from(combinedMap.values());
  }
  const handleReset = async () => {
    setResetLoading(true);
    try {
      const { data, status } = await getPooling();

      if (status === 200) {
        setPoolingList(data);
        setResetLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const local = (
    <div>
      <form
        className="my-5 mx-10 "
        onSubmit={handleSubmit((data) => submit(data))}
      >
        <p htmlFor="" className="text-red-600 text-2xl font-bold my-5 ">
          Pasteurization
        </p>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <select
              {...register("gestationalAge", { valueAsNumber: true })}
              className="inputStyle"
            >
              <option value={""}>--select gestational age--</option>
              {gestationalOptions}
            </select>
          </div>
          <div className="">
            <NepaliDatePicker
              inputClassName="form-control  focus:outline-none"
              value={date}
              onChange={(e) => setDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className="inputStyle"
            />
          </div>

          <div className="flex gap-4 items-center">
            <button
              className="text-white bg-red-600 hover:bg-[#004a89] px-6 py-2 rounded-lg disabled:bg-gray-200 disabled:cursor-not-allowed "
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "searching ..." : "SEARCH"}
            </button>
            <button
              className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg  disabled:bg-gray-200 disabled:cursor-not-allowed"
              type="button"
              disabled={resetLoading}
              onClick={() => handleReset()}
            >
              {resetLoading ? "resetting ..." : "Reset"}
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
                <td className="py-3 px-2">Number of Donor</td>
                <td className="py-3 px-2">Pooling Date</td>
                <td className="py-3 px-2">Pooling Condition</td>
                <td className="py-3 px-2">Volume Collected</td>
                <td className="py-3 px-2">Batch Name</td>
                {/* <td className="py-3 px-2">Bottle Name</td> */}
                <td className="py-3 px-2">Expiry Date</td>
                <td className="py-3 px-2">Action</td>
              </tr>
              {poolingList
                ?.filter((item) => item.remaining > 0)
                ?.map((row, index) => {
                  console.log(row.other, "response");

                  return (
                    <tr
                      className={`${
                        row.culture
                          ? "bg-rose-400/50"
                          : row.culture === false
                          ? "bg-lime-600/50"
                          : ""
                      } border border-x-gray text-center`}
                      key={index}
                    >
                      <td className="py-3">{index + 1}</td>
                      <td className="py-3">
                        {combineVolumes(row?.donorDetailsForPooling)?.length}
                      </td>
                      <td className="py-3">{row?.date}</td>
                      {row.poolingCondition == 4 ? (
                        <td className="py-3">{"Colostrum"}</td>
                      ) : (
                        gestationalAge?.map((item, index) => {
                          if (item.gestationalId == row.poolingCondition) {
                            return (
                              <td className="py-3" key={index}>
                                {item.gestationalName}
                              </td>
                            );
                          }
                        })
                      )}
                      <td className="py-3">{row.collectedVolume} ml</td>
                      <td className="py-3">
                        {row.batchName}({row?.date})
                      </td>
                      <td className="py-3">{row.expireDate}</td>
                      <td className="py-3 px-2">
                        <div className="flex justify-evenly gap-3  text-xl">
                          <div>
                            <div className="flex gap-1">
                              <button
                                className="bg-indigo-600 rounded-md text-sm text-white px-2 py-1 mr-2"
                                onClick={() => handleBottleDetails(row._id)}
                              >
                                Bottles
                              </button>
                            </div>
                          </div>
                          <div>
                            {row.culture == null && (
                              <button
                                className="bg-purple-600 rounded-md text-sm text-white px-2 py-1 mr-2"
                                onClick={() => handleCulture(row._id)}
                              >
                                Culture
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </TableBorder>
      </div>
    </div>
  );
  return <>{loading ? <Loader /> : local}</>;
}
