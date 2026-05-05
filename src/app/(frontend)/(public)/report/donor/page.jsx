"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import {
  getDonor,
  getInActiveDonor,
  updateDonorStatus,
} from "src/services/apiService/donorRecord/donor";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CSVLink } from "react-csv";
import Loader from "src/components/Loader";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };
export default function ViewDonor() {
  const TableBorder = dynamic(() => import("@/components/TableDesign"), {
    ssr: false,
  });

  const [dloader, setDLoader] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [donorList, setDonorList] = useState([]);
  const [inActiveDonorList, setInActiveDonorList] = useState([]);
  const [active, setActive] = useState(true);
  const [inActive, setInactive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const { status, data } = await getDonor();
        if (status === 200) {
          setDonorList(data?.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInActiveDonor();
        if (response?.status === 200) {
          setInActiveDonorList(response?.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDetail = useCallback(
    (id) => {
      router.push(`/donorRecord/viewDonorRecord/${id}`);
    },
    [router]
  );

  const excelData = donorList?.map((item, index) => {
    return {
      sn: index + 1,
      hosRegNo: item.hosRegNo,
      DonorRegNo: item.donorRegNo,
      Donor_Name: item.donorName,
      Reg_Date: item.date,
      Donor_Age: item.donorAge,
      Donor_Education: item.education,
      Donor_Ethnicity: item.ethnicity,
      Donor_State: item.address.stateId,
      Donor_District: item.address.districtId,
      Gestational_Age: item.gestationalName,
      Mode_of_Delivery: item.deliveryName,
      Parity: item.parityName,
      Donor_Contact: item.contactNo,
      Donor_Status: item.isDonorActive,
      HIV_Test: item?.serologyRecords?.hiv,
      HBSAG_Test: item?.serologyRecords?.hbsag,
      VDRL_Test: item?.serologyRecords?.vdrl,
      Acute_Infection: item?.verbalExamination?.acuteInfection,
      Chronic_Infection: item?.verbalExamination?.chronicInfection,
      Cancer_Treatment_In_Three_Years:
        item?.verbalExamination?.cancerTreatmentWithinThreeYears,
      Auto_ImmuneDisease: item?.verbalExamination?.autoImmuneDisease,
      Cough_more_than_two_weeks: item?.verbalExamination?.coughMoreThanTwoWeeks,
      Chicken_Pox: item?.verbalExamination?.chickenpox,
      STD_last_one_year: item?.verbalExamination?.stdLastOneYear,
      Transplant_and_Blood_Taken:
        item?.verbalExamination?.transplantAndBloodTaken,
      Mastitis: item?.donorPhysicalExamination?.mastitis,
      Local_Lesions: item?.donorPhysicalExamination?.localLesions,
      FugalInNippleAreola: item?.donorPhysicalExamination?.fugalInNippleAreola,
      Herpes: item?.donorPhysicalExamination?.herpesZoster,
    };
  });

  if (isLoading) return <Loader />;
  return (
    <>
      <div>
        <div className="mx-10">
          <TableBorder
            title={"Donar Report"}
            title2={
              <div className="flex flex-col  ">
                <div className=" flex justify-end gap-3">
                  <button className="bg-indigo-600 rounded-md text-white font-bold px-3 py-2">
                    <CSVLink data={excelData} filename="Donor_list.csv">
                      Export to Excel
                    </CSVLink>
                  </button>
                  <button
                    className={` ${
                      active
                        ? "bg-green-500 rounded-md px-3 py-2 shadow-md text-white"
                        : "bg-indigo-600 rounded-md px-3 py-2 shadow-md text-white"
                    }`}
                    onClick={() => {
                      setActive(true);
                      setInactive(false);
                    }}
                  >
                    Active Donor
                  </button>
                  <button
                    className={` ${
                      inActive
                        ? "bg-green-500 rounded-md px-3 py-2 shadow-md text-white"
                        : "bg-indigo-600 rounded-md px-3 py-2 shadow-md text-white"
                    }`}
                    onClick={() => {
                      setActive(false);
                      setInactive(true);
                    }}
                  >
                    Inactive Donor
                  </button>
                </div>
              </div>
            }
          >
            <div className="flex gap-3 mt-5"></div>
            <div className=" my-5">
              {dloader ? (
                <Loader />
              ) : (
                <table className="w-full">
                  <tr className="bg-[#004a89] text-white text-lg text-center">
                    {/* <td className="py-3">
                    <input type="checkbox" name="" id="" />
                  </td> */}
                    <td className="py-3">Reg. No</td>
                    <td className="py-3">Donar Name</td>
                    <td className="py-3">Age</td>
                    <td className="py-3">Address</td>
                    <td className="py-3">Contact</td>
                    <td className="py-3">Status</td>
                    <td className="py-3">Action</td>
                  </tr>
                  {(active ? donorList : inActiveDonorList)?.map(
                    (item, index) => {
                      return (
                        <tr
                          className={`border border-x-gray text-center ${
                            item.isDonorActive ? "" : "bg-red-400/80"
                          }`}
                          key={index}
                        >
                          <td className="py-3">{item.donorRegNo}</td>
                          <td className="py-3">{item.donorName}</td>
                          <td className="py-3">{item.donorAge}</td>
                          <td className="py-3">{item?.address?.stateId}</td>
                          <td className="py-3">{item.contactNo}</td>
                          <td className="py-3">
                            <div className="flex justify-evenly text-xl">
                              <Switch
                                {...label}
                                onChange={async () => {
                                  const response = await updateDonorStatus(
                                    item._id
                                  );
                                  if (response.status === 200) {
                                    setDLoader(true);
                                    const { status, data } = await getDonor();
                                    const response = await getInActiveDonor();
                                    if (response?.status === 200) {
                                      setInActiveDonorList(response?.data);
                                    }
                                    if (status === 200) {
                                      setDonorList(data?.data);
                                      setDLoader(false);
                                    }
                                  }
                                }}
                                checked={item.isDonorActive}
                              />
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex justify-evenly text-xl">
                              <div>
                                <h1
                                  className="cursor-pointer rounded-md px-2 py-1.5 bg-indigo-600 text-white font-semibold "
                                  onClick={() => handleDetail(item._id)}
                                >
                                  Details
                                </h1>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </table>
              )}
            </div>
          </TableBorder>
        </div>
      </div>
    </>
  );
}
