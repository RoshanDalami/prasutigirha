"use client";
import React, {useState} from "react";
import Link from "next/link";
import {IoIosArrowUp} from "react-icons/io";
import {FaTachometerAlt, FaUserAlt, FaRegListAlt} from "react-icons/fa";
import {Divider} from "@mui/material";

import {GiBabyBottle} from "react-icons/gi";

import {IoMdStarOutline} from "react-icons/io";
import {HiMiniBuildingOffice} from "react-icons/hi2";
import {FaPrescriptionBottle} from "react-icons/fa6";
import {SiProcessingfoundation} from "react-icons/si";
import {usePathname} from "next/navigation";

export default function SideBar() {
    const [show, setShow] = useState(false);

    const [show0, setShow0] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);
    const pathname = usePathname();
    const userInfo =
        typeof localStorage !== "undefined"
            ? JSON.parse(localStorage.getItem("user"))
            : {username: "Softech"};

    const handleOfficeOpen = () => {
        setShow0((prevState) => !prevState);
        setShow(false);
        setShow1(false);
        setShow3(false);
        setShow4(false);
        setShow5(false);
    };
    const handleDonorOpen = () => {
        setShow((prevState) => !prevState);
        setShow0(false);
        setShow1(false);
        setShow3(false);
        setShow4(false);
        setShow5(false);
    };
    const handleVolumeOpen = () => {
        setShow1((prevState) => !prevState);
        setShow0(false);
        setShow(false);
        setShow3(false);
        setShow4(false);
        setShow5(false);
    };
    const handlePoolingOpen = () => {
        setShow3((prevState) => !prevState);
        setShow0(false);
        setShow1(false);
        setShow(false);
        setShow4(false);
        setShow5(false);
    };
    const handleRequisitionOpen = () => {
        setShow4((prevState) => !prevState);
        setShow0(false);
        setShow1(false);
        setShow3(false);
        setShow(false);
        setShow5(false);
    };
    const handleDashboard = () => {
        setShow4(false);
        setShow0(false);
        setShow1(false);
        setShow3(false);
        setShow(false);
        setShow5(false);
    };
    const handleReport = () => {
        setShow5((prevState) => !prevState);
        setShow4(false);
        setShow0(false);
        setShow1(false);
        setShow3(false);
        setShow(false);
    };
    const DonorList = [
        // {
        //   link: "/donorRecord/addDonorRecord",
        //   name: "Donor Record",
        // },
        {
            link: "/donorRecord/viewDonorRecord",
            name: "View Donor Record",
        },
    ];
    const volumeOfMilk = [
        // {
        //   link: "/volumeOfMilk/addVolumeOfMilk",
        //   name: "Volume of Milk",
        // },

        {
            link: "/volumeOfMilk/volumeMilk",
            name: "List of Volume Milk",
        },
    ];
    const pasteuriationList = [
        // {
        //   link: "/pasteurization/addPasteurization",
        //   name: "Pasteurization Process",
        // },
        {
            link: "/pasteurization/pasteurizationList",
            name: "Pasteurization",
        },
        {
            link: "/pasteurization/culture/createCulture",
            name: "Culture",
        },
    ];
    const milkRequistionList = [
        // {
        //   link: "/milkRequisation/addBabyDetails",
        //   name: "Baby Details",
        // },
        {
            link: "/milkRequisation/babyDetails",
            name: "Baby List",
        },
        // {
        //   link: "/milkRequisation/addMilkRequisation",
        //   name: "Milk Requisition",
        // },
        {
            link: "/milkRequisation/listOfMilkRequisation",
            name: "Milk Requisition",
        },
    ];
    const officeSetupList = [
        {link: "/user", name: "User"},
        {link: "/office/fiscalYear", name: "Fiscal Year "},

        {link: "/office/departmentList", name: "Department List"},
        {link: "/office/postList", name: "Post"},
        // { link: "/office/employee", name: "Employee Setup " },
        {link: "/office/employeeList", name: "Employee List "},
        {link: "/office/donation", name: "Donation "}
    ];
    const report = [
        {link:"/report/donor",name:"Donor"},
        {link:"/report/milkVolume",name:"Milk Volume"},
        {link:"/report/pasteuriation",name:"Pasteurization"},
        {link:"/report/milkRequistion",name:"Requisition"},
        {link:"/report/baby",name:"Baby"},
        {link: "/report/report", name: "All Report"},
        {link: "/report/discard", name: "Discard Report"},

    ];

    const moduleAccess = userInfo?.userDetail?.assignedModule;


    return (
        <div className="fixed min-h-screen w-60  bg-gray-100   ">
            <div className="mb-4 h-[90vh] overflow-auto">
                <Link href={"/"} onClick={handleDashboard}>
                    <div
                        className={`flex h-20  w-full items-center justify-center gap-8  ${
                            pathname.split("/")[1] === ""
                                ? "bg-blue-600 font-bold text-white"
                                : "bg-gray-100"
                        }`}
                    >
                        <FaTachometerAlt className="text-2xl"/>
                        <h1 className="text-xl font-normal ">Dashboard</h1>
                    </div>
                </Link>
                <Divider/>
                <div>
                    {
                        userInfo?.userDetail?.role === 'superadmin' ?
                            <div>
                                <div
                                    className={`flex h-20 w-full   items-center justify-around  ${
                                        pathname.split("/")[1] === "office"
                                            ? "bg-blue-600 font-bold text-white"
                                            : "bg-gray-100"
                                    } `}
                                    onClick={handleOfficeOpen}
                                >
                                    <div className="flex w-full  items-center justify-between">
                                        <HiMiniBuildingOffice className="ml-3 text-xl"/>
                                        <h1 className={`text-xl `}>Office</h1>
                                        <IoIosArrowUp
                                            className={` font-bold ${show0 ? "" : "rotate-180"} mr-3`}
                                        />
                                    </div>
                                </div>
                                <div className={`${show0 ? "block" : "hidden"}`}>
                                    {officeSetupList?.map((item, index) => {
                                        return (
                                            <Link href={item.link} key={index} className="">
                                                <div
                                                    className={`flex h-16 items-center gap-2 bg-gray-200 ${
                                                        pathname === item.link
                                                            ? "bg-red-600 font-bold text-white"
                                                            : ""
                                                    } `}
                                                >
                                                    <IoMdStarOutline className="ml-8 text-2xl"/>
                                                    <h1>{item.name}</h1>
                                                </div>
                                                <Divider/>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div> : <></>
                    }
                </div>

                <Divider/>
                <div>
                    {moduleAccess?.map((item, index) => {
                        if (item.title === "donor") {
                            return (
                                <div key={index}>
                                    <div
                                        className={`flex h-20 w-full   items-center justify-around  ${
                                            pathname.split("/")[1] === "donorRecord"
                                                ? "bg-blue-600 font-bold text-white"
                                                : "bg-gray-100"
                                        } `}
                                        onClick={handleDonorOpen}
                                    >
                                        <FaUserAlt className="text-xl"/>
                                        <h1 className="text-xl">Donor Record</h1>
                                        <IoIosArrowUp
                                            className={` font-bold ${show ? "" : "rotate-180"}`}
                                        />
                                    </div>

                                    <div className={`${show ? "block" : "hidden"}`}>
                                        {DonorList?.map((item, index) => {
                                            return (
                                                <Link href={item.link} key={index} className="">
                                                    <div
                                                        className={`flex h-16 items-center gap-2 bg-gray-200 ${
                                                            pathname === item.link
                                                                ? "bg-red-600 font-bold text-white"
                                                                : ""
                                                        } `}
                                                    >
                                                        <IoMdStarOutline className="ml-8 text-2xl"/>
                                                        <h1 className="text-md">{item.name}</h1>
                                                    </div>
                                                    <Divider/>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
                <Divider/>
                <div>
                    {moduleAccess?.map((item, index) => {
                        if (item.title === "volume") {
                            return (
                                <div key={index}>
                                    <div
                                        className={`flex h-20 w-full   items-center justify-around  ${
                                            pathname.split("/")[1] === "volumeOfMilk"
                                                ? "bg-blue-600 font-bold text-white"
                                                : "bg-gray-100"
                                        } `}
                                        onClick={handleVolumeOpen}
                                    >
                                        <FaPrescriptionBottle className="text-xl"/>
                                        <h1 className="text-xl">Volume of Milk</h1>
                                        <IoIosArrowUp
                                            className={` font-bold ${show1 ? "" : "rotate-180"}`}
                                        />
                                    </div>

                                    <div className={`${show1 ? "block" : "hidden"}`}>
                                        {volumeOfMilk?.map((item, index) => {
                                            return (
                                                <Link href={item.link} key={index} className="">
                                                    <div
                                                        className={`flex h-16 items-center gap-2 bg-gray-200 ${
                                                            pathname === item.link
                                                                ? "bg-red-600 font-bold text-white"
                                                                : ""
                                                        } `}
                                                    >
                                                        <IoMdStarOutline className="ml-8 text-2xl"/>
                                                        <h1>{item.name}</h1>
                                                    </div>
                                                    <Divider/>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
                <Divider/>
                <div>
                    {moduleAccess?.map((item, index) => {
                        if (item.title === "pasteurization") {
                            return (
                                <div key={index}>
                                    <div
                                        className={`flex h-20 w-full   items-center justify-around  ${
                                            pathname.split("/")[1] === "pasteurization"
                                                ? "bg-blue-600  font-bold text-white"
                                                : "bg-gray-100"
                                        } `}
                                        onClick={handlePoolingOpen}
                                    >
                                        <SiProcessingfoundation className="text-xl"/>

                                        <h1 className="text-xl">Pasteurization</h1>
                                        <IoIosArrowUp
                                            className={` font-bold ${show3 ? "" : "rotate-180"}`}
                                        />
                                    </div>

                                    <div className={`${show3 ? "block" : "hidden"}`}>
                                        {pasteuriationList?.map((item, index) => {
                                            return (
                                                <Link href={item.link} key={index} className="">
                                                    <div
                                                        className={`flex h-16 items-center gap-2 bg-gray-200 ${
                                                            pathname === item.link
                                                                ? "bg-red-600 font-bold text-white"
                                                                : ""
                                                        } `}
                                                    >
                                                        <IoMdStarOutline className="ml-6 text-2xl"/>
                                                        <h1>{item.name}</h1>
                                                    </div>
                                                    <Divider/>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
                <Divider/>
                <div>
                    {moduleAccess?.map((item, index) => {
                        if (item.title === "requisition") {
                            return (
                                <div key={index}>
                                    <div
                                        className={`flex h-20 w-full   items-center justify-around  ${
                                            pathname.split("/")[1] === "milkRequisation"
                                                ? "bg-blue-600 font-bold text-white"
                                                : "bg-gray-100"
                                        } `}
                                        onClick={handleRequisitionOpen}
                                    >
                                        <GiBabyBottle className="text-2xl"/>
                                        <h1 className="text-xl">Milk Requistion </h1>
                                        <IoIosArrowUp
                                            className={` font-bold ${show4 ? "" : "rotate-180"}`}
                                        />
                                    </div>

                                    <div className={`${show4 ? "block" : "hidden"}`}>
                                        {milkRequistionList?.map((item, index) => {
                                            return (
                                                <Link href={item.link} key={index} className="">
                                                    <div
                                                        className={`flex h-16 items-center gap-2 bg-gray-200 ${
                                                            pathname === item.link
                                                                ? "bg-red-600 font-bold text-white"
                                                                : ""
                                                        } `}
                                                    >
                                                        <IoMdStarOutline className="ml-6 text-2xl"/>
                                                        <h1>{item.name}</h1>
                                                    </div>
                                                    <Divider/>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
                <Divider/>
                <div>
                    {moduleAccess?.map((item, index) => {
                        if (item.title === "report") {
                            return (
                                <div key={index}>
                                    <div
                                        className={`flex h-20 w-full   items-center justify-around  ${
                                            pathname.split("/")[1] === "report"
                                                ? "bg-blue-600 font-bold text-white"
                                                : "bg-gray-100"
                                        } `}
                                        onClick={handleReport}
                                    >
                                        <FaRegListAlt className="text-2xl"/>
                                        <h1 className="text-xl">Report </h1>
                                        <IoIosArrowUp
                                            className={` font-bold ${show5 ? "" : "rotate-180"}`}
                                        />
                                    </div>

                                    <div className={`${show5 ? "block" : "hidden"} mb-20`}>
                                        {report?.map((item, index) => {
                                            return (
                                                <Link href={item.link} key={index} className="">
                                                    <div
                                                        className={`flex h-16 items-center gap-2 bg-gray-200 ${
                                                            pathname === item.link
                                                                ? "bg-red-600 font-bold text-white"
                                                                : ""
                                                        } `}
                                                    >
                                                        <IoMdStarOutline className="ml-6 text-2xl"/>
                                                        <h1>{item.name}</h1>
                                                    </div>
                                                    <Divider/>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                    <Divider/>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}
