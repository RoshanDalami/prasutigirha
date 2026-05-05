"use client";
import React, { useState, useEffect } from "react";
import FormBorder from "src/components/reusableForm";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import "nepali-datepicker-reactjs/dist/index.css";
import {updateCulture} from '../../../../../../../services/apiService/pasteurization/pasteurization'
const aa = new BikramSambat(new Date()).toBS();
export default function SingleCulture() {
    const {id} = useParams()
    const router = useRouter()
  const [date, setDate] = useState(aa);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const onSubmit = async (data) => {
    data ={
        ...data,
        cultureDate:date,
        id:id
    };
    const response = await updateCulture(data)
    if(response.status === 200){
        router.push('/pasteurization/pasteurizationList')
    }
  };
  return (
    <div className="mx-5">
      <FormBorder title={"Culture"}>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label htmlFor="">
                Pooling Date<span className="text-red-600">*</span>
              </label>

              <NepaliDatePicker
                inputClassName="form-control  focus:outline-none"
                value={date}
                onChange={(e) => setDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Culture Result<span className="text-red-600">*</span></label>
              <select className="inputStyle" {...register("culture",{required:"Result is required"})}>
                <option value="" selected disabled>
                  --Select Result--
                </option>
                <option value={true}>Positive</option>
                <option value={false}>Negative</option>
              </select>
              {
                errors?.culture && <p className="text-red-600">{errors?.culture?.message}</p>
              }
            </div>
          </div>
          <div className="flex justify-end my-2">
            <button
              className={`text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg disabled:bg-gray-300  disabled:cursor-not-allowed `}
              disabled={isSubmitting || date > aa ? true : false}
              type="submit"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </FormBorder>
    </div>
  );
}
