"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import Button from "src/components/button";
import {
  createPost,
  getDepartment,
} from "src/services/apiService/officeService/office";
import FormBorder from "src/components/reusableForm";
import { useRouter } from "next/navigation";
export default function CreatePost({clickedDataId}) {
    const {register,handleSubmit,formState:{isSubmitting},setValue} = useForm()
  const [department, setDepartment] = useState([]);
  const router = useRouter()
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await getDepartment();
      if (status === 200) {
        setDepartment(data);
      }
    }
    fetchData();
  }, []);
  useEffect(()=>{
    if(clickedDataId){
      setValue('id',clickedDataId?._id)
      setValue('postName',clickedDataId?.postName)
      setValue('departmentId',clickedDataId?.departmentId)
    }
  },[clickedDataId, setValue])
  const departmentOptions = department?.map((item, index) => {
    return (
      <option key={index} value={item.departmentId}>
        {item.departmentName}
      </option>
    );
  });
  const onSubmit = async (data) =>{
    try {
        console.log(data,'response')
        const {status} = await createPost(data);
        if(status === 200){
            router.push('/office/postList')
        }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className="mx-6">
        <FormBorder title={'Create Post'}>

      <div className=" bg-white rounded-md  ">
        <form
          className="flex items-center justify-center" 
          onSubmit={handleSubmit((data)=>onSubmit(data))}
        >
          <div className="grid w-full mx-5 my-4 gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <label className="text-lg font-bold"> Post Name</label>
                <input
                  type="text"
                  placeholder="Enter Post Names"
                  className="inputStyle"
                  {...register("postName")}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-lg font-bold"> Select Department </label>
                <select className="inputStyle" {...register("departmentId")}>
                  <option selected value={""} disabled>
                    --Select Department--
                  </option>
                  {departmentOptions}
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button isSubmitting={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Add"}
              </Button>
            </div>
          </div>
        </form>
      </div>
        </FormBorder>
    </div>
  );
}
