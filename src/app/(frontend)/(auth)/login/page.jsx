"use client";
import Image from "next/image";
import { useState } from "react";
import {
  IoPersonCircleSharp,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  return (
    <div className="flex gap-8 md:min-h-screen  justify-center items-center ">
      <div className="md:w-[60%] w-full md:my-0 my-10 flex md:min-h-screen items-center justify-center gap-8 ">
        <div className=" hidden md:block shadow-xl w-[40%] flex justify-center">
          <Image
            height={200}
            width={350}
            src={"/assets/images/amritkosh.jpg"}
            alt="amrit-kosh"
            className="rounded-lg w-full"
          />
        </div>
        <div className="  md:w-[40%] w-full md:mx-0 mx-8 d:my-0 my-10 md:mr-6 shadow-lg ">
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
                className="border-gray-700  rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out p-4"
                type="text"
              />
              <IoPersonCircleSharp className="absolute right-4 text-2xl top-10  " />
            </div>
            <div className="grid relative">
              <label>
                Password <span className="text-red-600">*</span>
              </label>
              <input
                className="border-gray-700  rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out p-4"
                type={showPw ? "text" : "password"}
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
            <button className="bg-red-600 text-white w-full rounded-md py-2 hover:bg-[#052c65]">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
