"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import TableBorder from "src/components/TableDesign";
import { urls } from "src/services/apiHelpers";
import {
  getBabyDetail,
  getBabyById,
  updateBabyStatus,
  searchBaby,
} from "src/services/apiService/baby/babyServices";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Loader from "src/components/Loader";
import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };
export default function BabyDetail() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({});
  const [babyDetails, setBabyDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  async function fetchData() {
    setLoading(true)
    const { status, data } = await getBabyDetail();
    if (status === 200) {
      setBabyDetails(data);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log(babyDetails, "babydetail");
  const handleDetail = useCallback(
    (id) => {
      router.push(`/milkRequisation/babyDetails/${id}`);
    },
    [router]
  );

  const onSubmit = async (data) => {
    try {
      const response = await searchBaby(data?.term);
      if (response?.status == 200) {
        setBabyDetails(response?.data);
      }
    } catch (error) {}
  };

  const local = (
    <div className="pt-10 px-10">
      <form action="" onSubmit={handleSubmit((data) => onSubmit(data))}>
        <h1 className="text-xl font-bold my-2">Search Baby</h1>
        <div className="flex gap-3">
          <input
            type="text"
            className="inputStyle"
            placeholder="Baby Name / ip number"
            {...register("term", {
              required: "Baby Name or ip number is required",
            })}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-md bg-red-600 hover:bg-blue-600 text-white"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => fetchData()}
            className="px-6 py-3 rounded-md bg-red-600 hover:bg-blue-600 text-white"
          >
            Reset
          </button>
        </div>
        {errors?.term && (
          <p className="text-red-600">{errors?.term?.message}</p>
        )}
      </form>
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
                console.log(items, "response");
                return (
                  <tr
                    key={index}
                    className={` ${
                      !items?.status ? "bg-red-400" : ""
                    } border border-x-gray text-center`}
                  >
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3">
                      {items?.babyName}({items.ipNumber})
                    </td>
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
                          console.log(response, "response");
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
      </TableBorder>
    </div>
  );
  return <>{loading ? <Loader /> : local}</>;
}
