"use client";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { urls } from "src/services/apiHelpers";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function ListVolume() {
  const TableBorder = dynamic(() => import("@/components/TableDesign"), {
    ssr: false,
  });
  const router = useRouter();
  const { id } = useParams();

  const [requsitionList, setRequsitionList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getRequistion}/${id}`);

      if (status === 200) {
        setRequsitionList([data]);
        toast.success("List generated successfully");
      } else {
        toast.error("List generation failed");
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
    const response = await axios.delete(`${urls.getRequistion}/${id}`);
    if (response.status === 200) {
      const { data, status } = await axios.get(`${urls.getRequistion}`);
      if (status === 200) {
        setRequsitionList(data);
      }
    }
  };
  return (
    <>
      <div>
        <form className="my-5 mx-10 ">
          <div className="grid grid-cols-4 gap-4">
            <input
              type="date"
              placeholder="Search by ID..."
              className="border px-4 border-gray-300 rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
            />
            <div>
              <button className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg ">
                SEARCH
              </button>
            </div>
          </div>
        </form>
        <div className="mx-10">
          <TableBorder title={"Baby Detail"}>
            <div className=" my-5">
              <table className="w-full">
                <tr className="bg-[#004a89] text-white text-lg text-center">
                  <td className="py-3 ">S.N</td>
                  <td className="py-3 ">
                    Baby <br /> Name
                  </td>
                  <td className="py-3 ">
                    Bottle <br /> Name
                  </td>

                  <td className="py-3 ">ML</td>
                  <td className="py-3 ">Action</td>
                </tr>

                {requsitionList?.map((row, index) => {
                  return (
                    <tr
                      className=" border border-x-gray text-center"
                      key={index}
                    >
                      <td className="py-3">{index + 1}</td>
                      <td className="py-3">{row?.babyName}</td>
                      <td className="py-3">{row?.bottleName}</td>

                      <td className="py-3">{row?.quantity} ML</td>

                      {/* <td className="py-3">{row.feedingDetails.quantity}{" "} ml</td> */}

                      <td className="py-3 ">
                        <div className="flex justify-evenly items-center text-xl">
                          <div className="bg-lime-600 px-2 py-1 rounded-md shadow-md cursor-pointer">
                            <PencilSquareIcon
                              className="h-6 w-6 text-white "
                              onClick={() => handleEdit(row._id)}
                            />
                          </div>
                          <div className="bg-red-600 px-2 py-1 rounded-md shadow-md cursor-pointer ">
                            <TrashIcon
                              className="h-6 w-6 text-white"
                              onClick={() => handleDelete(row._id)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </TableBorder>
          <TableBorder title={"Consumed Milk"}>
            <div className=" my-5">
              <table className="w-full">
                <tr className="bg-[#004a89] text-white text-lg text-center">
                  {/* <td className="py-3 px-3">
                    <input type="checkbox" name="" id="" />
                  </td> */}
                  <td className="py-3 ">S.N</td>
                  <td className="py-3 ">Date</td>
                  <td className="py-3">Time</td>
                  <td className="py-3 ">Consumed Milk</td>
                  <td className="py-3 ">Action</td>
                </tr>

                <tr className=" border border-x-gray text-center">
                  <td className="py-3">1</td>
                  <td className="py-3">2/18/2024</td>
                  <td className="py-3">01:00 PM</td>
                  <td className="py-3">100 ML</td>

                  <td className="py-3 ">
                    <div className="flex justify-evenly items-center text-xl">
                      <div className="bg-lime-600 px-2 py-1 rounded-md shadow-md cursor-pointer">
                        <PencilSquareIcon className="h-6 w-6 text-white " />
                      </div>
                      <div className="bg-red-600 px-2 py-1 rounded-md shadow-md cursor-pointer ">
                        <TrashIcon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className=" border border-x-gray text-center">
                  <td className="py-3">2</td>
                  <td className="py-3">2/18/2024</td>
                  <td className="py-3">02:15 PM</td>
                  <td className="py-3">250 ML</td>

                  <td className="py-3 ">
                    <div className="flex justify-evenly items-center text-xl">
                      <div className="bg-lime-600 px-2 py-1 rounded-md shadow-md cursor-pointer">
                        <PencilSquareIcon className="h-6 w-6 text-white " />
                      </div>
                      <div className="bg-red-600 px-2 py-1 rounded-md shadow-md cursor-pointer ">
                        <TrashIcon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </TableBorder>
        </div>
      </div>
    </>
  );
}
