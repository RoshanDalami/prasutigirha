"use client";
import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";
import { useForm } from "react-hook-form";
import axios from "axios";
import { urls } from "src/services/apiHelpers";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getDepartment,
  getPost,
  createEmpolyee
} from 'src/services/apiService/officeService/office'
export default function Employee() {
  const [createUser,setCreateUser] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const userInfo =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : "";
  const router = useRouter();
  const [departmentList, setDepartmentList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await getDepartment();
      if (status === 200) {
        setDepartmentList(data);
      }
    }
    fetchData();
  }, []);
  const departmentOptions = departmentList?.map((item, index) => {
    return (
      <option key={index} value={item.departmentId}>
        {item.departmentName}
      </option>
    );
  });
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await getPost();
      if (status === 200) {
        setPostList(data);
      }
    }
    fetchData();
  }, []);
  const postOptions = postList?.map((item, index) => {
    return (
      <option key={index} value={item.postId}>
        {item.postName}
      </option>
    );
  });
  const onSubmit = async (data) => {
    data = {
      ...data,
      userId: userInfo?._id,
      createUser:createUser
    };
    console.log(data, "response");
    try {
      const response = await createEmpolyee(data)
      if (response.status === 200) {
        router.push("/office/employeeList");
      }
    } catch (error) {
      console.log(error, "response");
    }
  };
  return (
    <>
      <form className="mx-10" onSubmit={handleSubmit((data) => onSubmit(data))}>
        <FormBorder title={"Employee"}>
          <div className="flex justify-end">

          <button className={`px-3 py-2 text-white rounded-md shadow-md ${createUser?'bg-red-600':"bg-green-600"}`} onClick={(e)=>{e.preventDefault();
            setCreateUser((prevState)=>!prevState)} }>
            { createUser ? "Don't Create User" : 'Create User'}
          </button>
          </div>
          <div className="md:grid-cols-2 grid grid-cols-1 gap-4 text-lg">
            <div className="flex flex-col">
              <label htmlFor="">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Employee Name"
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
                Department <span className="text-red-600">*</span>
              </label>
              <select
                className="inputStyle"
                {...register(
                  "departmentId",
                  // { valueAsNumber: true },
                  { required: "Department is required" }
                )}
              >
                <option selected value={""} disabled>
                  --Select Department--
                </option>
                {departmentOptions}
              </select>
              {errors?.departmentId && (
                <p className="errorMessages">{errors.departmentId.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="">
                Post <span className="text-red-600">*</span>
              </label>
              <select
                className="inputStyle"
                {...register(
                  "postId",
                  // { valueAsNumber: true },
                  { required: "Post is required" }
                )}
              >
                <option selected disabled value={""}>
                  --Select Post--
                </option>
                {postOptions}
              </select>
              {errors?.postId && (
                <p className="errorMessages">{errors.postId.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Employee Email"
                className="inputStyle"
                {...register("employeeEmail", {
                  required: "Email is required",
                })}
              />
              {errors?.employeeEmail && (
                <p className="errorMessages">{errors.employeeEmail.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="">
                Phone <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                placeholder="Employee Phone"
                className="inputStyle"
                {...register("employeePhone", {
                  required: "Phone number required",
                })}
              />
              {errors?.employeePhone && (
                <p className="errorMessages">{errors.employeePhone.message}</p>
              )}
            </div>
            {
              createUser ? 
            <div className="flex flex-col">
              <label htmlFor="">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="User Password"
                className="inputStyle"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors?.password && (
                <p className="errorMessages">{errors.password.message}</p>
              )}
            </div> : <></>
            }
          </div>
          <div className="text-lg font-bold my-5">
            <Button>{isSubmitting ? "Submitting..." : "Submit"}</Button>
          </div>
        </FormBorder>
      </form>
    </>
  );
}
