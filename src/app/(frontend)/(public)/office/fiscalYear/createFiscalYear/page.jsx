"use client";
import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";
import { useForm } from "react-hook-form";
import axios from "axios";
import { urls } from "src/services/apiHelpers";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";

export default function Fiscal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  //   const userInfo =
  //     typeof localStorage !== "undefined"
  //       ? JSON.parse(localStorage.getItem("userInfo"))
  //       : "";
  const router = useRouter();
  const aa = new BikramSambat(new Date()).toBS();
  const [startDate, setStartDate] = useState(aa);
  const [endDate, setEndDate] = useState(aa);
  //   const onSubmit = async (data) => {
  //     data = {
  //       ...data,
  //       userId: userInfo?._id,
  //     };
  //     console.log(data, "response");
  //     try {
  //       const response = await axios.post(`${urls.createEmployee}`, data);
  //       if (response.status === 200) {
  //         router.push("/");
  //       }
  //     } catch (error) {
  //       console.log(error, "response");
  //     }
  //   };
  return (
    <>
      <form className="mx-10">
        <FormBorder title={"Fiscal Year"}>
          <div className="md:grid-cols-3 grid grid-cols-1 gap-4 text-lg">
            <div className="flex flex-col">
              <label htmlFor="">
                Fiscal Year <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Fiscal Year"
                className="inputStyle"
                {...register("employeeName", {
                  required: "Employee name required",
                })}
              />
              {errors?.employeeName && (
                <p className="errorMessages">{errors.employeeName.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="">
                Start Year <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                placeholder="Start Year"
                className="inputStyle"
                {...register("employeeName", {
                  required: "Employee name required",
                })}
              />
              {errors?.employeeName && (
                <p className="errorMessages">{errors.employeeName.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="">
                End Year <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                placeholder="End Year"
                className="inputStyle"
                {...register("employeeName", {
                  required: "Employee name required",
                })}
              />
              {errors?.employeeName && (
                <p className="errorMessages">{errors.employeeName.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-lg">
                Start Date
                <span className="text-lg text-red-600">*</span>
              </label>

              <NepaliDatePicker
                inputClassName="form-control  focus:outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg">
                End Date
                <span className="text-lg text-red-600">*</span>
              </label>

              <NepaliDatePicker
                inputClassName="form-control  focus:outline-none"
                value={endDate}
                onChange={(e) => setEndDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
            <div className="pt-10 flex  gap-2 mx-5">
              <label htmlFor="" className="">
                Status?
              </label>
              <input type="checkbox" className="h-6 w-6 pt-2" />
            </div>
          </div>

          <div className="text-lg font-bold my-5">
            <Button>{isSubmitting ? "Submitting..." : "Submit"}</Button>
          </div>
        </FormBorder>
      </form>
    </>
  );
}