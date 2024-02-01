"use client";
import Image from "next/image";
import { useState } from "react";
import {
  IoPersonCircleSharp,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import { urls } from "src/services/apiHelpers";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [showPw, setShowPw] = useState(false);
  const router = useRouter()
  const onSubmit = async(data)=>{
    try {
      const response = await axios.post(`${urls.login}`,data)
      if(response.status === 200){
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex gap-8 min-h-screen  justify-center items-center ">
      <form className="md:w-[60%] w-full md:shadow-md  flex  items-center justify-center gap-8 " onSubmit={handleSubmit((data)=>onSubmit(data))} >
        <div className="  md:block shadow-xl md:w-2/4 flex justify-center">
          <Image
            height={200}
            width={350}
            src={"/assets/images/amritkosh.jpg"}
            alt="amrit-kosh"
            className="rounded-lg hidden md:block w-full"
          />
        </div>
        <div className="  md:w-2/4 w-full md:mx-0 mx-8 d:my-0 my-10 md:mr-6  ">
          <div className="leading-9">
            <p className="text-2xl text-red-600 font-bold">
              Welcome to AmritKosh !
            </p>
            <p>
              <span className="text-gray-600">Need an account? </span>{" "}
              <span className="text-blue-400">Sign Up</span>
            </p>
          </div>
          <div className="grid gap-6">
            <p className="text-2xl my-4">Sign In</p>
            
            <div className="grid relative ">
              <label>
                Email <span className="text-red-600">*</span>
              </label>
              <input
                className="border-gray-700  rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out p-4"
                type="email"
                {...register("email")}
              />
              <IoPersonCircleSharp className="absolute right-4 text-2xl top-10  " />
            </div>
            <div className="grid relative">
              <label>
                Password <span className="text-red-600">*</span>
              </label>
              <input
                className="border-gray-700  rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out p-4"
                type={showPw ? "text" : "password"}
                {...register("password")}
              />
              {showPw ? (
                <IoEyeOffOutline
                  className="absolute right-4 text-2xl top-10"
                  onClick={() => setShowPw(!showPw)}
                />
              ) : (
                <IoEyeOutline
                  className="absolute right-4 text-2xl top-10"
                  onClick={() => setShowPw(!showPw)}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between my-4">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4  rounded-3xl " />
              <label className="ml-2">Remember me</label>
            </div>
            <div className="text-blue-400 cursor-pointer ">
              Forgot Password?
            </div>
          </div>
          <div>
            <button className="bg-red-600 text-white w-full rounded-md py-2 hover:bg-[#052c65]" type="submit" >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
