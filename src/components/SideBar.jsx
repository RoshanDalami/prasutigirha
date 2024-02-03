"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoIosArrowUp } from "react-icons/io";
import { FaTachometerAlt, FaUserAlt } from "react-icons/fa";
import { Divider } from "@mui/material";
import { LuMilk } from "react-icons/lu";
import { GiBabyBottle } from "react-icons/gi";
import { Transition } from "@headlessui/react";
import { IoMdStarOutline } from "react-icons/io";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { FaPrescriptionBottle } from "react-icons/fa6";
import { SiProcessingfoundation } from "react-icons/si";

export default function SideBar({ isOpen }) {
  const [show, setShow] = useState(false);
  const [show0, setShow0] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const DonorList = [
    {
      link: "/donorRecord/addDonorRecord",
      name: "Add Donor Record",
    },
    {
      link: "/donorRecord/viewDonorRecord",
      name: "View Donor Record",
    },
  ];
  const volumeOfMilk = [
    {
      link: "/volumeOfMilk/addVolumeOfMilk",
      name: "Add Volume of Milk",
    },
   
    {
      link: "/volumeOfMilk/volumeMilk",
      name: "List of Volume Milk",
    },
  ];
  const pasteuriationList = [
    {
      link: "/pasteurization/addPasteurization",
      name: "Add Pasteurization Process",
    },
    {
      link: "/pasteurization/pasteurizationList",
      name: "List of Pasteurization Process",
    },
  ];
  const milkRequistionList = [
    {
      link: "/milkRequisation/addMilkRequisation",
      name: "Add Milk Requisition",
    },
    {
      link: "/milkRequisation/listOfMilkRequisation",
      name: "List of Milk Requisition",
    },
  ];
  const officeSetupList = [
    { link: "/office/officeSetup", name: "Office" },
    { link: "/office/department", name: "Department" },
    { link: "/office/employee", name: "Employee" },
  ];
  return (
    <div className="w-60 bg-gray-100 min-h-screen  fixed  ">
      <div className="h-[90vh] overflow-auto mb-4">
        <Link href={"/"}>
          <div className="bg-gray-100 h-20  w-full flex items-center justify-center gap-8">
            <FaTachometerAlt className="text-2xl" />
            <h1 className="text-xl font-normal ">Dashboard</h1>
          </div>
        </Link>
        <Divider />
        <div>
          <div
            className="bg-gray-100 h-20 w-full   flex items-center justify-around"
            onClick={() => setShow0((prevState) => !prevState)}
          >
            <div className="flex justify-between  w-full items-center">
              <HiMiniBuildingOffice className="text-xl ml-3" />
              <h1 className="text-xl">Office</h1>
              <IoIosArrowUp
                className={` font-bold ${show0 ? "" : "rotate-180"} mr-3`}
              />
            </div>
          </div>

          <div className={`${show0 ? "block" : "hidden"}`}>
            {officeSetupList?.map((item, index) => {
              return (
                <Link href={item.link} key={index} className="">
                  <div className="bg-gray-200 h-16 flex gap-2 items-center ">
                    <IoMdStarOutline className="text-2xl ml-8" />
                    <h1>{item.name}</h1>
                  </div>
                  <Divider />
                </Link>
              );
            })}
          </div>
        </div>
        <Divider />
        <div>
          <div
            className="bg-gray-100 h-20 w-full   flex items-center justify-around"
            onClick={() => setShow((prevState) => !prevState)}
          >
            <FaUserAlt className="text-xl" />
            <h1 className="text-xl">Donor Record</h1>
            <IoIosArrowUp
              className={` font-bold ${show ? "" : "rotate-180"}`}
            />
          </div>

          <div className={`${show ? "block" : "hidden"}`}>
            {DonorList?.map((item, index) => {
              return (
                <Link href={item.link} key={index} className="">
                  <div className="bg-gray-200 h-16  flex items-center gap-2 ">
                    <IoMdStarOutline className="text-2xl ml-8" />
                    <h1 className="text-md">{item.name}</h1>
                  </div>
                  <Divider />
                </Link>
              );
            })}
          </div>
        </div>
        <Divider />
        <div>
          <div
            className="bg-gray-100 h-20 w-full   flex items-center justify-around"
            onClick={() => setShow1((prevState) => !prevState)}
          >
            <FaPrescriptionBottle className="text-xl" />
            <h1 className="text-xl">Volume of Milk</h1>
            <IoIosArrowUp
              className={` font-bold ${show1 ? "" : "rotate-180"}`}
            />
          </div>

          <div className={`${show1 ? "block" : "hidden"}`}>
            {volumeOfMilk?.map((item, index) => {
              return (
                <Link href={item.link} key={index} className="">
                  <div className="bg-gray-200 h-16 flex gap-2 items-center  ">
                    <IoMdStarOutline className="text-2xl ml-8" />
                    <h1>{item.name}</h1>
                  </div>
                  <Divider />
                </Link>
              );
            })}
          </div>
        </div>
        <Divider />
        <div>
          <div
            className="bg-gray-100 h-20 w-full   flex items-center justify-around"
            onClick={() => setShow3((prevState) => !prevState)}
          >
            <SiProcessingfoundation className="text-xl" />

            <h1 className="text-xl">pasteurization</h1>
            <IoIosArrowUp
              className={` font-bold ${show3 ? "" : "rotate-180"}`}
            />
          </div>

          <div className={`${show3 ? "block" : "hidden"}`}>
            {pasteuriationList?.map((item, index) => {
              return (
                <Link href={item.link} key={index} className="">
                  <div className="bg-gray-200 h-16 flex items-center gap-2 ">
                    <IoMdStarOutline className="text-2xl ml-6" />
                    <h1>{item.name}</h1>
                  </div>
                  <Divider />
                </Link>
              );
            })}
          </div>
        </div>
        <Divider />
        <div>
          <div
            className="bg-gray-100 h-20 w-full   flex items-center justify-around"
            onClick={() => setShow4((prevState) => !prevState)}
          >
            <GiBabyBottle className="text-2xl" />
            <h1 className="text-xl">Milk Requistion </h1>
            <IoIosArrowUp
              className={` font-bold ${show4 ? "" : "rotate-180"}`}
            />
          </div>

          <div className={`${show4 ? "block" : "hidden"}`}>
            {milkRequistionList?.map((item, index) => {
              return (
                <Link href={item.link} key={index} className="">
                  <div className="bg-gray-200 h-16 flex items-center gap-2 ">
                    <IoMdStarOutline className="text-2xl ml-6" />
                    <h1>{item.name}</h1>
                  </div>
                  <Divider />
                </Link>
              );
            })}
          </div>
        </div>
        <Divider />
      </div>
    </div>
  );
}
