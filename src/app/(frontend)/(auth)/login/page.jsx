"use client";
import Image from "next/image";
import { useState } from "react";
import {
  IoPersonCircleSharp,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import { loginApi } from "src/services/apiHelpers";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();
  const onSubmit = async (data) => {
    data = {
      ...data,
      email: data?.email?.trim(),
    };
    try {
      const response = await loginApi("POST", "/user/login", data);
      if (response?.status === 200 && response?.data?.token) {
        Cookies.set("token", response.data.token, {
          expires: 1,
          sameSite: "Lax",
        });
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              userDetail: response.data.user,
              token: response.data.token,
              data: response.data,
            }),
          );
        }
        router.push("/");
        toast.success("Login successfull");
        window.location.reload();
      } else {
        toast.error(response?.message ?? "Invalid Credentials");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Invalid Credentials",
      );
    }
  };

  return (
    <div className="flex gap-8 min-h-screen  justify-center items-center ">
      <form
        className="md:w-[60%] w-full md:shadow-md  flex  items-center justify-center gap-8 bg-gray-50 "
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="  md:block shadow-xl md:w-2/4 flex justify-center">
          <Image
            height={200}
            width={350}
            src="/assets/images/amritkoshlogo.jpg"
            alt="amrit-kosh"
            className="rounded-lg hidden md:block w-full"
          />
        </div>
        <div className="  md:w-2/4 w-full md:mx-0 mx-8 d:my-0 my-10 md:mr-6  ">
          <div className="leading-9">
            <p className="text-2xl text-red-600 font-bold">
              Welcome to AmritKosh PMWH !
            </p>
            <p>
              <span className="text-gray-600">Need an account? </span>{" "}
              <span className="text-blue-400">Sign Up</span>
            </p>
          </div>
          <div className="grid gap-6">
            <p className="text-2xl my-4">Sign In</p>

            <div className="grid gap-1 relative ">
              <label>
                Email <span className="text-red-600">*</span>
              </label>
              <div>
                <input
                  className="border-2 border-gray-200  rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out p-4 w-full"
                  type="email"
                  placeholder="email@example.com"
                  {...register("email", { required: "Email is required" })}
                />
                <IoPersonCircleSharp className="absolute right-4 text-2xl top-10  " />
              </div>
              {errors.email &&  <span className="text-red-600">{errors.email.message}</span>}
            </div>
            <div className="grid relative">
              <label>
                Password <span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 border-gray-300  rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out p-4"
                type={showPw ? "text" : "password"}
                placeholder="password"
                {...register("password",{required:"Password is required"})}
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
              {
                errors.password && <span className="text-red-600">{errors.password.message}</span>
              }
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
            <button
              className="bg-red-600 text-white w-full rounded-md py-2 hover:bg-[#052c65] disabled:cursor-not-allowed disabled:bg-gray-300 "
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting ..." : "Login"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
