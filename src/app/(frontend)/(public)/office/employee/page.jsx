'use client'
import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { urls } from "src/services/apiHelpers";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Employee() {
  const { register , handleSubmit , formState:{isSubmitting} } = useForm()
  const userInfo = (typeof localStorage !== 'undefined')?(JSON.parse(localStorage.getItem('userInfo'))):''
  const router = useRouter()
  const [departmentList,setDepartmentList] = useState([]);
  useEffect(()=>{
   async function fetchData(){
     const {data,status} = await axios.get(`${urls.getDepartment}`);
     if(status === 200){
       setDepartmentList(data)
     }
   }
   fetchData()
  },[])
 const departmentOptions = departmentList?.map((item,index)=>{
   return(
     <option key={index} value={item.departmentId}>
       {item.departmentName}
     </option>
   )
 })
  const [postList,setPostList] = useState([]);
  useEffect(()=>{
   async function fetchData(){
     const {data,status} = await axios.get(`${urls.getPost}`);
     if(status === 200){
      setPostList(data)
     }
   }
   fetchData()
  },[])
 const postOptions = postList?.map((item,index)=>{
   return(
     <option key={index} value={item.postId}>
       {item.postName}
     </option>
   )
 })
 const onSubmit = async(data)=>{
      data={
        ...data,
        userId: userInfo?._id
      }
      console.log(data,'response')
      try {
        const response = await axios.post(`${urls.createEmployee}`,data)
        if(response.status === 200 ){
          router.push('/')
        }
      } catch (error) {
        console.log(error,'response')
      }
 }
  return (
    <>
      <form className="mx-10" onSubmit={handleSubmit((data)=>onSubmit(data))} >
        <FormBorder title={"Employee"}>
          <div className="md:grid-cols-2 grid grid-cols-1 gap-4 text-lg">
            <div className="grid">
              <label htmlFor="">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Employee Name"
                className="inputStyle"
                {...register('employeeName')}
              />
            </div>
            <div className="grid">
              <label htmlFor="">
                Department <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle" {...register('departmentId',{valueAsNumber:true})} >
                <option selected value={''} disabled >--Select Department--</option>
                {departmentOptions}
              </select>
            </div>
            <div className="grid">
              <label htmlFor="">
                Post <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle" {...register('postId',{valueAsNumber:true})}>
                <option selected disabled value={''}>--Select Post--</option>
                {postOptions}
              </select>
            </div>
            <div className="grid">
              <label htmlFor="">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Employee Email"
                className="inputStyle"
                {...register('employeeEmail')}
              />
            </div>
            <div className="grid">
              <label htmlFor="">
                Phone <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Employee Phone"
                className="inputStyle"
                {...register("employeePhone")}
              />
            </div>
          </div>
          <div className="text-lg font-bold my-5">
            <Button>{ isSubmitting ? 'Submitting...' : 'Submit'}</Button>
          </div>
        </FormBorder>
      </form>
    </>
  );
}
