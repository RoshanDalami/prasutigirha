"use client";
import React, { useEffect, useState } from "react";
import { getPoolingById } from "@/services/apiService/pasteurization/pasteurization";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import "nepali-datepicker-reactjs/dist/index.css";
import { useRouter, useParams } from "next/navigation";
import FormBorder from "src/components/reusableForm";
import {useForm} from 'react-hook-form';
import {updateOther} from '../../../../../../../services/apiService/pasteurization/pasteurization'
const aa = new BikramSambat(new Date()).toBS();
export default function OtherReport() {
  const { id } = useParams();
  const router = useRouter()
  const [apiData, setApiData] = useState({});
  const [date, setDate] = useState(aa);
  const {register,handleSubmit,formState:{isSubmitting,errors}} = useForm()
  useEffect(() => {
    async function fetchData() {
      const response = await getPoolingById(id);
      console.log(response);
    }
    fetchData();
  }, [id]);

  const onSubmit = async(data)=>{
    data = {
      ...data,
      id:id,
      otherTestDate:date
    }
   const response = await updateOther(data);
   if(response?.status === 200){
    router.push('/pasteurization/pasteurizationList')
   }
  }

  return (
    <div className="mx-4">
      <FormBorder title={"Other Test Result"}>
        <form action="" onSubmit={handleSubmit((data)=>onSubmit(data))} >
          <div className="grid grid-cols-3 gap-3">
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
              <label htmlFor="">Other Test Result <span className="text-red-600">*</span> </label>
              <select className="inputStyle" {...register('other')} >
                <option value="" selected disabled>--Select Result--</option>
                <option value={true}>Positive</option>
                <option value={false} >Negative</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Already Feeded <span className="text-red-600">*</span> </label>
              <select className="inputStyle" {...register('feededToBaby')} >
                <option value="" selected disabled>--Select Result--</option>
                <option value={true} >Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end my-2">
            <button  className={`text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg disabled:bg-gray-300  disabled:cursor-not-allowed `} disabled={isSubmitting || date > aa ? true : false} type="submit" >
              {isSubmitting?"Submitting...":'Submit'}
            </button>
          </div>
        </form>
      </FormBorder>
    </div>
  );
}
