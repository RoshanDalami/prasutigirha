"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { urls } from "src/services/apiHelpers";
import { getAllDonorListForSelect } from "../../../../../services/apiService/donorRecord/donor";
import TablePagination from "@mui/material/TablePagination";
import {
  getDonorWithTotalVolume,
  getCollectedMilkListForDonor,
  discardMilkBeforePasturization,
} from "src/services/apiService/milkVolume/milkVolume";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { searchMilkVolume } from "src/services/apiService/search/searchService";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
const aa = new BikramSambat(new Date()).toBS();
import { useForm } from "react-hook-form";
import Loader from "src/components/Loader";
import TableBorder from "@/components/TableDesign";
import Modal from "src/components/Modal";
import toast from "react-hot-toast";
export default function ListVolume() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const {
    register: discardRegister,
    handleSubmit: discardHandleSubmit,
    formState: { errors: discardErrors, isSubmitting: discardIsSubmitting },
  } = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [donorList, setDonorList] = useState([]);
  const [selectedDonorId, setSelectedDonorId] = useState("");
  const [filteredVolumeList, setFilteredVolumeList] = useState([]);

  const [modelOpen, setModelOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDonorListForSelect();

        if (response?.status === 200) {
          setDonorList(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { status, data } = await getDonorWithTotalVolume();

      if (status === 200) {
        setFilteredVolumeList(data);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);
  const resetFilter = async () => {
    const response = await getDonorWithTotalVolume();
    if (response?.status === 200) {
      setFilteredVolumeList(response?.data);
      setSelectedDonorId("");
    }
  };
  const [gestationalAgeList, setGestationalAge] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getGestational}`);
      if (status === 200) {
        setGestationalAge(data?.data);
      }
    }

    fetchData();
  }, []);

  const [milkList, setMilkList] = useState({});

  useEffect(() => {
    if (modelOpen) {
      const fetchData = async () => {
        try {
          const response = await getCollectedMilkListForDonor(selectedDonorId);
          if (response?.status === 200) {
            setMilkList(response?.data);
          }
        } catch (error) {}
      };
      fetchData();
    }
  }, [selectedDonorId, modelOpen]);

  const handleDetail = useCallback(
    (id) => {
      router.push(`/donorRecord/viewDonorRecord/${id}`);
    },
    [router]
  );

  const onSubmit = async (data) => {
    try {
      const response = await searchMilkVolume(selectedDonorId);

      if (response?.status === 200) {
        setFilteredVolumeList(response?.data);
      }
    } catch (error) {}
  };
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(8);
  const handlePageChange = (e, newpage) => {
    setPage(newpage);
  };

  function handlePerPage(e) {
    setRowPerPage(+e.target.value);
    setPage(0);
  }

  const closeModel = () => {
    setModelOpen(false);
    setSelectedDonorId("");
  };
  const openModel = (id) => {
    setSelectedDonorId(id);
    setModelOpen(true);
  };

  const onSubmitDiscard = async (data) => {
    try {
      const response = await discardMilkBeforePasturization(
        data.collectedId,
        data.remark
      );
      if (response?.status === 200) {
        const { status, data } = await getDonorWithTotalVolume();

        if (status === 200) {
          setFilteredVolumeList(data);
        }
        setModelOpen(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const local = (
    <>
      {modelOpen && (
        <Modal>
          <div className="bg-white rounded-2xl">
            <div className="flex items-end justify-end p-4">
              <button
                type="button"
                className="bg-red-600 px-4 py-2 text-white rounded-xl"
                onClick={() => closeModel()}
              >
                Cancel
              </button>
            </div>
            <div className="  min-w-[50vw] px-4 py-5 ">
              {milkList?.remainingVolume === 0 ? (
                <div className="text-center   flex justify-center">
                  <h1 className="text-red-600 bg-red-200 rounded-xl py-1 px-4">
                    Remaining volume of milk for selected donor is 0
                  </h1>
                </div>
              ) : (
                <div>
                  <form
                    action=""
                    className="flex flex-col gap-3"
                    onSubmit={discardHandleSubmit(onSubmitDiscard)}
                  >
                    <div className="w-full flex flex-col gap-2">
                      <div>
                        <section className="text-xl">
                          <span className="font-bold text-gray-500">
                            Donor Name:{" "}
                          </span>
                          <span className="font-bold text-gray-500">
                            {milkList?.donorName}
                          </span>
                        </section>
                      </div>
                      <div className="flex flex-col gap-3">
                        <label htmlFor="">Collected Milk</label>
                        <select
                          name=""
                          id=""
                          className="inputStyle"
                          {...discardRegister("collectedId", {
                            required: "Please select collected milk",
                          })}
                        >
                          <option value="">-- select milk --</option>
                          {milkList?.volumeList?.map((item, index) => {
                            if (item.collectedMilk.remaining > 0) {
                              return (
                                <option
                                  key={index}
                                  value={item.collectedMilk._id}
                                >
                                  {` (Date : ${item.date} )    (time: ${item.time}) (ml : ${item.remaining}) `}
                                </option>
                              );
                            }
                          })}
                        </select>
                        {discardErrors.collectedId && (
                          <span className="text-red-600">
                            {discardErrors.collectedId.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-3">
                        <label htmlFor="">
                          Remark <span className="text-red-600">*</span>
                        </label>
                        <textarea
                          rows="4"
                          className="inputStyle"
                          {...discardRegister("remark", {
                            required: "Please add remark for discard",
                          })}
                          placeholder="Discard Remark"
                        ></textarea>
                        {discardErrors.remark && (
                          <span className="text-red-600">
                            {discardErrors.remark.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-800 duration-150 ease-in-out text-white py-2 rounded-xl w-full disabled:bg-gray-300 disabled:cursor-not-allowed "
                        disabled={discardIsSubmitting}
                      >
                        {discardIsSubmitting ? "discarding..." : "Discard"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
      <div>
        <p htmlFor="" className="text-red-600 text-2xl font-bold my-5 mx-10 ">
          Volume of Milk
        </p>
        <form
          className="my-5 mx-10 "
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div className="flex  flex-col gap-4">
            <div className=" ">
              <div className=" flex flex-col gap-2">
                <Select
                  options={donorList}
                  onChange={(e) => setSelectedDonorId(e.value)}
                  placeholder={"Select Donor Name"}
                />
              </div>
            </div>
            <div className=" flex  gap-3">
              <button
                className="text-white bg-red-600 hover:bg-[#004a89] disabled:bg-gray-400 disabled:cursor-not-allowed  px-3 py-3 rounded-lg text-sm "
                type="submit"
                disabled={!selectedDonorId}
              >
                SEARCH
              </button>
              <button
                className="text-white bg-red-600 hover:bg-[#004a89]  rounded-lg text-sm px-3 py-3 "
                onClick={() => resetFilter()}
                type="button"
              >
                RESET
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
                  <td className="py-3">Id</td>
                  <td className="py-3">Donor Name</td>
                  <td className="py-3">Gestational Age</td>

                  <td className="py-3">Total Volume</td>
                  <td className="py-3">Remaining Volume</td>
                  <td className="py-3">Action</td>
                </tr>

                {filteredVolumeList
                  ?.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                  ?.map((item, index) => {
                    return (
                      <tr
                        className=" border border-x-gray text-center"
                        key={index}
                      >
                        <td className="py-3">{index + 1}</td>
                        <td className="py-3">
                          {item.donorName}({item.donorRegNo})
                        </td>
                        {gestationalAgeList?.map((age, index) => {
                          if (age.gestationalId === item.gestationalAge) {
                            return (
                              <td className="py-3" key={index}>
                                {age.gestationalName}
                              </td>
                            );
                          }
                        })}

                        <td className="py-3">{item.totalMilkCollected} ml</td>
                        <td className="py-3">{item.remaining} ml</td>
                        <td className="py-3 flex items-center justify-center">
                          <div className="flex items-center gap-3 text-xl">
                            <div>
                              <h1
                                className="cursor-pointer rounded-md px-2 py-1.5 bg-indigo-600 text-white text-sm "
                                onClick={() => handleDetail(item.donorId)}
                              >
                                Details
                              </h1>
                            </div>
                            <div>
                              <h1
                                className="cursor-pointer rounded-md px-2 py-1.5 bg-red-600 text-white text-sm "
                                onClick={() => openModel(item.donorId)}
                              >
                                Discard
                              </h1>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </table>
              <TablePagination
                rowsPerPageOptions={[7]}
                rowsPerPage={rowPerPage}
                page={page}
                count={filteredVolumeList?.length}
                component={"div"}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handlePerPage}
              ></TablePagination>
            </div>
          </TableBorder>
        </div>
      </div>
    </>
  );

  return <>{isLoading ? <Loader /> : local}</>;
}
