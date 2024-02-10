"use client";
import Image from "next/image";
import { HiOutlineBars3 } from "react-icons/hi2";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { urls } from "src/services/apiHelpers";
import Cookies from "js-cookie";
export default function Navbar() {
  const userInfo =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : { username: "Softech" };
  const router = useRouter();
  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${urls.logout}`);
      if (data.success === true) {
        console.log("logout", "response");
        router.push("/login");
      }
      // router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const [showButton, setIsShowButton] = useState(false);
  const handleClick = () => {
    setIsShowButton(!showButton);
  };
  return (
    <div className="  shadow-xl sticky  inset-0 z-50 flex  items-center justify-between bg-white ">
      {/* <div className="">
        <HiOutlineBars3 />
      </div> */}
      <div className="pl-10 flex gap-4 items-center">
        <Image
          height={200}
          width={200}
          alt="logo"
          src={"/assets/images/logopng.png"}
          className="w-[75px] py-3"
        />
        <h1 className=" text-4xl text-[#00427b] font-semibold">
          अमृत <span className="text-red-600">कोश</span>
        </h1>
      </div>

      <div className="flex items-center gap-5 relative  ">
        <p className="text-lg">
          Welcome!!{" "}
          <span className="text-red-600 font-bold ">{userInfo?.username}</span>{" "}
        </p>
        <div className="">
          <div className=" cursor-pointer " onClick={handleClick}>
            <Image
              height={100}
              width={100}
              alt="logo-img"
              src={"/assets/images/heart.png"}
              className="rounded-full h-11 w-11 shadow-md mr-8"
            />
          </div>
          {showButton && (
            <div className="absolute right-0 mt-1 ">
              <button
                className="bg-red-600 py-1.5 px-3 rounded-md shadow-md hover:bg-[#004a89] ease-in-out duration-300 text-white font-bold mx-10"
                onClick={(e) => logoutHandler(e)}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
