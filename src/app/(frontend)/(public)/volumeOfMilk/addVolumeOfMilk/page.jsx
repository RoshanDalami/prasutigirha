"use client";
import React, { useState, useEffect } from "react";
import { urls } from "src/services/apiHelpers";
import FormBorder from "@/components/reusableForm";
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
import { useParams } from "next/navigation";
const aa = new BikramSambat(new Date()).toBS();
export default function AddVolume({ clickedData }) {
  const [date, setDate] = useState(aa);
  const { id } = useParams();
  const engDate = new BikramSambat(date, "BS").toAD();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      collectedMilk: [{ time: "", quantity: 0, temp: "", storedBy: "" }],
    },
  });
  const { fields, append, remove , replace } = useFieldArray({
    control,
    name: "collectedMilk",
  });
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
  // if(clickedData){
  //   fields.length = clickedData?.collectedMilk?.length
  // }
  useEffect(() => {
    
    if (clickedData) {
      setValue("_id", clickedData?._id);
      setValue(
        "donorId",
        `${clickedData?.gestationalAge}-${clickedData?.donorId}-${clickedData?.donorName}`
      );
      // setValue('collectedMilk',clickedData?.collectedMilk);
      setValue("gestationalAge", clickedData?.gestationalAge);
      clickedData?.collectedMilk?.forEach((item,index)=>{
        setValue(`collectedMilk.${index}.quantity`, item?.quantity);
        setValue(`collectedMilk.${index}.storedBy`, item?.storedBy);
        setValue(`collectedMilk.${index}.temp`, item?.temp);
        setValue(`collectedMilk.${index}.time`, item?.time);
      })
      // replace('collectedMilk',clickedData?.collectedMilk)
      setDate(clickedData?.date);
    }
  }, [clickedData, fields, replace, setValue]);
  useEffect(() => {
    gestational.forEach((item) => {
      if (
        item.gestationalId == watchFields.donorId?.split("-")[0] ||
        item?.gestationalId == clickedData?.gestationalAge
      ) {
        setValue("gestationalAge", item.gestationalName);
      }
    });
  }, [gestational, setValue, watchFields?.donorId, clickedData]);
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
  function handleAppend(e) {
    e.preventDefault();
    append({ time: "", quantity: 0, temp: "", storedBy: "" });
  }

  
  return (
    <>
      <form
        className="md:mx-10"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <FormBorder title={"Add Volume of Milk"}>
          <div className=" gap-5 px-5 rounded-md ">
            <div className="font-bold text-lg flex justify-end">
              <button
                className="text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg "
                onClick={(e) => {
                  e.preventDefault();
                  append({ time: "", quantity: 0, temp: "", storedBy: "" });
                }}
              >
                Add More +
              </button>
            </div>
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
                    const combinedValue = `${item.gestationalAge}-${item._id}-${item.donorName}`;
                    return (
                      <option
                        key={index}
                        value={combinedValue}
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
                  options={{ calenderLocale: "en", valueLocale: "en" }}
                  className="inputStyle"
                />
              </div>
            </div>
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-2"
                >
                  <div className="flex flex-col">
                    <label className="text-lg">
                      Time
                      <span className="text-lg text-red-600">*</span>
                    </label>
                    <input
                      className="inputStyle"
                      type="time"
                      placeholder="."
                      {...register(`collectedMilk.${index}.time`, {
                        required: "Time is required",
                      })}
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
                      {...register(`collectedMilk.${index}.quantity`, {
                        required: "Volume required",
                        min: {
                          value: 0,
                          message: "Volume should not be negative",
                        },
                      })}
                    />
                    {errors?.collectedMilk?.[index]?.quantity && (
                      <p className="errorMessages">
                        {errors?.collectedMilk?.[index]?.quantity?.message}
                      </p>
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
                      {...register(`collectedMilk.${index}.temp`, {
                        required: "Temperature is required",
                      })}
                    />
                    {errors?.temp && (
                      <p className="errorMessages">
                        {errors?.collectedMilk?.[index]?.temp?.message}
                      </p>
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
                      {...register(`collectedMilk.${index}.storedBy`, {
                        required: "This field is required",
                      })}
                    />
                    {errors?.storedBy && (
                      <p className="errorMessages">
                        {errors?.storedBy?.message}
                      </p>
                    )}
                  </div>
                  <div></div>
                  {fields.length > 1 && (
                    <div className="font-bold text-lg flex justify-end">
                      <button
                        className="text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg "
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

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
