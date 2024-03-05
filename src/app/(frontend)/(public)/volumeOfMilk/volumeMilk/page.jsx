"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { urls } from "src/services/apiHelpers";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
export default function ListVolume() {
  const TableBorder = dynamic(() => import("@/components/TableDesign"), {
    ssr: false,
  });
  const [volumeList, setVolumeList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await axios.get(`${urls.getVolumeOfMilk}`);
      if (status === 200) {
        setVolumeList(data);
        setFilteredVolumeList(data);
      }
    }
    fetchData();
  }, []);
  const [gestationalAgeList, setGestationalAge] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getGestational}`);
      if (status === 200) {
        setGestationalAge(data);
      }
    }
    fetchData();
  }, []);
  const router = useRouter();
  const handleEdit = useCallback(
    (id) => {
      router.push(`/volumeOfMilk/addVolumeOfMilk/${id}`);
    },
    [router]
  );

  // Search donar
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVolumeList, setFilteredVolumeList] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredList = volumeList.filter(
      (item) =>
        item.donorId.contactNo
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.donorId.hosRegNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVolumeList(filteredList);
  };

  async function handleDelete(id) {
    try {
      const response = await axios.delete(`${urls.getVolumeOfMilk}/${id}`);
      console.log(response, "deleted");
    } catch (error) {}
  }
  return (
    <>
      <div>
        <form className="my-5 mx-10 ">
          <p htmlFor="" className="text-red-600 text-2xl font-bold my-5 ">
            Volume of Milk
          </p>
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              className="border px-4 border-gray-300 rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
              placeholder="Search by Phone No/ Hospital Reg No..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <input
              type="date"
              placeholder="Search by ID..."
              className="border px-4 border-gray-300 rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
            />
            <div>
              <button
                onClick={handleSearch}
                className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg "
              >
                SEARCH
              </button>
            </div>
          </div>
        </form>
        <div className="mx-10">
          <TableBorder
            title={"List of Volume of Milk"}
            title2={
              <div className="flex flex-col   ">
                <div className=" flex justify-end">
                  <Link href={"/volumeOfMilk/addVolumeOfMilk"}>
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
                  {/* <td className="py-3">
                    <input type="checkbox" name="" id="" />
                  </td> */}
                  <td className="py-3">Id</td>
                  <td className="py-3">Donor Name</td>
                  <td className="py-3">Gestational Age</td>
                  {/* <td className="py-3">Contact</td> */}
                  <td className="py-3">Date</td>
                  {/* <td className="py-3">Time</td> */}
                  <td className="py-3">Total Volume</td>
                  <td className="py-3">Action</td>
                </tr>

                {filteredVolumeList?.map((item, index) => {
                  return (
                    <tr
                      className=" border border-x-gray text-center"
                      key={index}
                    >
                      {/* <td className="py-3 text-center">
                    <input type="checkbox" name="" id="" />
                  </td> */}
                      <td className="py-3">{index + 1}</td>
                      <td className="py-3">{item.donorName}</td>
                      {gestationalAgeList?.map((age, index) => {
                        if (age.gestationalId === item.gestationalAge) {
                          return (
                            <td className="py-3" key={index}>
                              {age.gestationalName}
                            </td>
                          );
                        }
                      })}
                      {/* <td className="py-3">{item.donorId.contactNo}</td> */}
                      <td className="py-3">{item.date}</td>
                      {/* <td className="py-3">{item.time}</td> */}
                      <td className="py-3">{item.totalMilkCollected} ml</td>
                      <td className="py-3">
                        <div className="flex justify-evenly text-xl">
                          {/* <div className=" cursor-pointer px-2 py-1 rounded-md shadow-md bg-lime-600">
                            <PencilSquareIcon
                              className="h-6 w-6 text-white"
                              onClick={() => handleEdit(item._id)}
                            />
                          </div> */}
                          <div className=" cursor-pointer px-2 py-1 rounded-md shadow-md bg-red-600">
                            <TrashIcon
                              className="h-6 w-6 text-white"
                              onClick={() => handleDelete(item._id)}
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
        </div>
      </div>
    </>
  );
}
