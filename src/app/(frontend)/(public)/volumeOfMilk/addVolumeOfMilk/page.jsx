"use client";
import React, { useState, useEffect } from "react";
import { urls } from "src/services/apiHelpers";
import FormBorder from "@/components/reusableForm";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast'
export default function AddVolume() {
  const { register, handleSubmit, watch,setValue } = useForm();
  const router = useRouter();
  const watchFields = watch();
  const [gestational, setGestational] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getGestational}`);
      if (status === 200) {
        setGestational(data);
      }
    }
    fetchData();
  }, []);
  
  const data = [
    { gestationalId: 1, name: "Aakash", id: 1 },
    { gestationalId: 2, name: "Roshan", id: 2 },
    { gestationalId: 3, name: "Madhav", id: 3 },
  ];
  
  useEffect(() => {
    gestational.forEach((item) => {
      if (item.gestationalId == watchFields.donorId.split('-')[0]) {
        setValue('gestationalAge',item.gestationalName)
      }
    });
  }, [gestational, setValue, watchFields?.donorId]);
  //Donor
  const [donorList,setDonorList]=useState([]);
  useEffect(()=>{
    async function fetchData(){
      const {status,data} = await axios.get(`${urls.getDonor}`)
      if(status === 200){
        setDonorList(data)
      }
    }
    fetchData()
  },[])

  const onSubmit = async(data)=>{
    data={
      ...data,
      userId:'65b74d30f2c002b81675e4fd',
      donorId:'65b757b1031779ed57fac9c6',
      gestationalAge:parseInt(watchFields?.donorId.split('-')[0]),

    }
    
    try {
      const response = await axios.post(`${urls.createVolumeOfMilk}`,data)
      if(response.status === 200){
        router.push('/volumeOfMilk/volumeMilk')
        toast.success('Volume Created Successfully')
      }
    } catch (error) {
      
    }

  }

  return (
    <>
      <form className="md:mx-10" onSubmit={handleSubmit((data)=>onSubmit(data))} >
        <FormBorder title={"Add Volume of Milk"}>
          <div className=" gap-5 px-5 rounded-md ">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-2">
              <div className="grid">
                <label className="text-lg">
                  Select Donor
                  <span className="text-lg text-red-600">*</span>
                </label>
                <select className="inputStyle" {...register("donorId")}>
                  <option selected disabled value={''} >
                    --Select Donor--
                  </option>
                  {donorList?.map((item, index) => {
                    const combinedValue = `${item.gestationalId}-${item._id}-${item.donor_FullName}`;
                    return (
                      <option key={index} value={combinedValue}>
                        {item.donor_FullName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="grid">
                <label className="text-lg">
                  Gestational Age (WOG)
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  readOnly
                  {...register('gestationalAge')}
                />
              </div>

              <div className="grid">
                <label className="text-lg">
                  Date
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input className="inputStyle" type="date" placeholder="." {...register('date')} />
              </div>
              <div className="grid">
                <label className="text-lg">
                  Time
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input className="inputStyle" type="time" placeholder="." {...register('time')} />
              </div>
              <div className="grid">
                <label className="text-lg">
                  ML
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input className="inputStyle" type="text" placeholder="." {...register('quantity')} />
              </div>
              <div className="grid">
                <label className="text-lg">
                  Temperature
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input className="inputStyle" type="Number" placeholder="" {...register('temp')}  />
              </div>
              <div className="grid">
                <label className="text-lg">
                  Store By
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input className="inputStyle" type="text" placeholder="." {...register('storedBy')} />
              </div>
            </div>
            <button className="bg-red-600 text-white my-4 text-lg rounded-md py-2 px-5 hover:bg-[#052c65]">
              Submit
            </button>
          </div>
        </FormBorder>
      </form>
    </>
  );
}
