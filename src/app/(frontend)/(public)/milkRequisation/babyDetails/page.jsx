"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import TableBorder from "src/components/TableDesign";

import {
  getBabyDetail,
  getBabyById,
  updateBabyStatus,
  searchBaby,
  updateBabyOutcome,
} from "src/services/apiService/baby/babyServices";
import { getBabyOutCome } from "src/services/apiService/dropdown/dropdownservices";

import Link from "next/link";
import { useForm } from "react-hook-form";
import Loader from "src/components/Loader";
import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };
import Modal from "src/components/Modal";
import toast from "react-hot-toast";
export default function BabyDetail() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({});
  const {
    register: outcomeRegister,
    handleSubmit: outcomeHandleSubmit,
    formState: { outcomeErrors, outcomeIsSubmitting },
    watch: outcomeWatch,
    reset: outcomeReset,
  } = useForm({});
  const [babyDetails, setBabyDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  async function fetchData() {
    setLoading(true);
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
  const [babyOutcome, setBabyOutcome] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getBabyOutCome();
      if (response?.status === 200) {
        setBabyOutcome(response?.data);
      }
    };
    fetchData();
  }, []);
  const babyOutcomeOptions = babyOutcome?.map((item, index) => {
    return (
      <option key={index} value={item.name}>
        {item.name}
      </option>
    );
  });
  const [babyId, setBabyId] = useState("");
  const handleOutcomeModalOpen = (id) => {
    setBabyId(id);
    setOpenModal(true);
  };
  const handleOutcomeModalClose = () => {
    setBabyId("");
    setOpenModal(false);
    outcomeReset();
  };
  const onSubmit = async (data) => {
    try {
      const response = await searchBaby(data?.term);
      if (response?.status == 200) {
        setBabyDetails(response?.data);
      }
    } catch (error) {}
  };

  const onOutcomeSubmit = async (data) => {
    try {
      data = {
        ...data,
        babyId: babyId,
      };
      console.log(data, "data");
      const response = await updateBabyOutcome(data);
      if (response?.status === 200) {
        toast.success("Baby Outcome updated successfully");
        fetchData();
        handleOutcomeModalClose();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const local = (
    <div className="pt-10 px-10">
      {openModal && (
        <Modal>
          <div className="bg-white p-5 w-[50vw] rounded-xl">
            <form
              className="flex flex-col gap-4"
              action=""
              onSubmit={outcomeHandleSubmit((data) => onOutcomeSubmit(data))}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="">
                    {" "}
                    Baby Outcome <span className="text-red-600">*</span>{" "}
                  </label>
                  <select
                    className="inputStyle"
                    {...outcomeRegister("babyOutcome", {
                      required: "Baby Outcome is required",
                      validate: (value) => value !== "",
                    })}
                  >
                    <option value="">--Select Baby Outcome--</option>
                    {babyOutcomeOptions}
                  </select>
                  {outcomeErrors?.babyOutcome && (
                    <p className="text-red-600">
                      {outcomeErrors?.babyOutcome?.message}
                    </p>
                  )}
                </div>
                {(outcomeWatch("babyOutcome") === "Refer" ||
                  outcomeWatch("babyOutcome") === "Mortality") && (
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">
                      Reason <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      className="inputStyle"
                      {...outcomeRegister("reason", {
                        required: "Reason is required",
                      })}
                      placeholder="Enter Reason"
                    ></textarea>
                    {outcomeErrors?.reason && (
                      <p className="text-red-600">
                        {outcomeErrors?.reason?.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => handleOutcomeModalClose()}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={outcomeIsSubmitting}
                >
                  {outcomeIsSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
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
            className="px-6 py-3 rounded-md bg-red-600 hover:bg-blue-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
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
                      <div className="flex justify-evenly gap-3 text-xl">
                        <div>
                          <h1
                            className="cursor-pointer bg-indigo-600 text-sm  rounded-md text-white px-2 py-1.5"
                            onClick={() => handleDetail(items._id)}
                          >
                            Details
                          </h1>
                        </div>
                        <div>
                          <h1
                            className="cursor-pointer bg-indigo-600  text-sm rounded-md text-white px-2 py-1.5"
                            onClick={() => handleOutcomeModalOpen(items._id)}
                          >
                            OutCome
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
