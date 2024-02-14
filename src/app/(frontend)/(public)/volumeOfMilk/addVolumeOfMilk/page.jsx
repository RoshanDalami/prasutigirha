"use client";
import React, { useState, useEffect } from "react";
import { urls } from "src/services/apiHelpers";
import FormBorder from "@/components/reusableForm";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
export default function AddVolume({ clickedData }) {
  const [date, setDate] = useState("");
  const engDate = new BikramSambat(date, "BS").toAD();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();
  const router = useRouter();
  const watchFields = watch();
  const [gestational, setGestational] = useState([]);
  const userInfo =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : "";
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getGestational}`);
      if (status === 200) {
        setGestational(data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setValue("_id", clickedData?._id);
    setValue(
      "donorId",
      `${clickedData?.gestationalAge}-${clickedData?.donorId}`
    );
    setValue("gestationalAge", clickedData?.gestationalAge);
    setValue("quantity", clickedData?.quantity);
    
    setValue("storedBy", clickedData?.storedBy);
    setValue("temp", clickedData?.temp);
    setValue("time", clickedData?.time);
    setDate(clickedData?.date)

  }, [clickedData, setValue]);

  useEffect(() => {
    gestational.forEach((item) => {
      if (item.gestationalId == watchFields.donorId?.split("-")[0]) {
        setValue("gestationalAge", item.gestationalName);
      }
    });
  }, [gestational, setValue, watchFields?.donorId]);
  //Donor
  const [donorList, setDonorList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await axios.get(`${urls.getDonor}`);
      if (status === 200) {
        setDonorList(data);
      }
    }
    fetchData();
  }, []);


  const onSubmit = async (data) => {
    data = {
      ...data,
      userId: userInfo?._id,
      donorId: watchFields?.donorId.split("-")[1],
      gestationalAge: parseInt(watchFields?.donorId.split("-")[0]),
      donorName: watchFields?.donorId.split("-")[2],
      date,
      engDate,
    };
    try {
      const response = await axios.post(`${urls.createVolumeOfMilk}`, data);
      if (response.status === 200) {
        router.push("/volumeOfMilk/volumeMilk");
        toast.success("Volume Created Successfully");
      }
    } catch (error) {}
  };

  //Nepali Date

  return (
    <>
      <form
        className="md:mx-10"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <FormBorder title={"Add Volume of Milk"}>
          <div className=" gap-5 px-5 rounded-md ">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-2">
              <div className="flex flex-col">
                <label className="text-lg">
                  Select Donor
                  <span className="text-lg text-red-600">*</span>
                </label>
                <select
                  className="inputStyle"
                  {...register("donorId", { required: "Donor name required" })}
                >
                  <option selected disabled value={""}>
                    --Select Donor--
                  </option>
                  {donorList?.map((item, index) => {
                    const combinedValue = `${item.gestationalAge}-${item._id}`;
                    return (
                      <option
                        key={index}
                        value={item._id}
                        selected={item?._id === clickedData?.donorId}
                      >
                        {item.donorName}
                      </option>
                    );
                  })}
                </select>
                {errors?.donorId && (
                  <p className="errorMessages">{errors?.donorId?.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-lg">
                  Gestational Age (WOG)
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  readOnly
                  {...register("gestationalAge", {
                    required: "Gestational Age required",
                  })}
                />
                {errors?.gestationalAge && (
                  <p className="errorMessages">
                    {errors?.gestationalAge?.message}
                  </p>
                )}
                {/* <select name="" id="" {...register("gestationalAge")}>
                  {gestational?.map((item, index) => {
                    if (
                      item.gestationalId == watchFields.donorId.split("-")[0]
                    ) {
                      return (
                        <option key={index}>{item.gestationalName}</option>
                      );
                    }
                  })}
                </select> */}
              </div>

              <div className="flex flex-col">
                <label className="text-lg">
                  Date
                  <span className="text-lg text-red-600">*</span>
                </label>

                <NepaliDatePicker
                  inputClassName="form-control  focus:outline-none"
                  value={date}
                  onChange={(e) => setDate(e)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                  className="inputStyle"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg">
                  Time
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input
                  className="inputStyle"
                  type="time"
                  placeholder="."
                  {...register("time", { required: "Time is required" })}
                />
                {errors?.time && (
                  <p className="errorMessages">{errors?.time?.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-lg">
                  ML
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input
                  className="inputStyle"
                  type="number"
                  placeholder="."
                  {...register("quantity", { required: "Volume required" })}
                />
                {errors?.quantity && (
                  <p className="errorMessages">{errors?.quantity?.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-lg">
                  Temperature
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input
                  className="inputStyle"
                  type="Number"
                  placeholder=""
                  {...register("temp", { required: "Temperature is required" })}
                />
                {errors?.temp && (
                  <p className="errorMessages">{errors?.temp?.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-lg">
                  Store By
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input
                  className="inputStyle"
                  type="text"
                  placeholder="."
                  {...register("storedBy", {
                    required: "This field is required",
                  })}
                />
                {errors?.storedBy && (
                  <p className="errorMessages">{errors?.storedBy?.message}</p>
                )}
              </div>
            </div>

            <button
              className="bg-red-600 text-white my-4 text-lg rounded-md py-2 px-5 hover:bg-[#052c65]"
              type="submit"
            >
              {isSubmitting ? "Submitting ..." : "Submit"}
            </button>
          </div>
        </FormBorder>
      </form>
    </>
  );
}
