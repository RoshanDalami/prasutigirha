"use client";
import dynamic from "next/dynamic";
import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CSVLink } from "react-csv";
import TableSkeleton from "src/components/TableSkeleton";
import Switch from "@mui/material/Switch";
import TablePagination from "@mui/material/TablePagination";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import toast from "react-hot-toast";
import { useDonorList, useInactiveDonors, useDiscardedDonors, useUpdateDonorStatus } from "src/hooks/useDonor";

const label = { inputProps: { "aria-label": "Switch demo" } };
const tabs = [
  { id: "active", label: "Active Donor" },
  { id: "inactive", label: "Inactive Donor" },
  { id: "discarded", label: "Discarded Donor" },
];

const TableBorder = dynamic(() => import("@/components/TableDesign"), {
  ssr: false,
});

export default function ViewDonor() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("active");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [appliedStart, setAppliedStart] = useState("");
  const [appliedEnd, setAppliedEnd] = useState("");

  const isFiltered = !!appliedStart && !!appliedEnd;

  const {
    data: donorRaw = {},
    isLoading: isActiveLoading,
  } = useDonorList(page + 1, rowsPerPage, activeTab === "active", appliedStart, appliedEnd, isFiltered);
  const {
    data: inActiveDonorList = [],
    isLoading: isInactiveLoading,
  } = useInactiveDonors(activeTab === "inactive", appliedStart, appliedEnd);
  const {
    data: discardedDonorList = [],
    isLoading: isDiscardedLoading,
  } = useDiscardedDonors(activeTab === "discarded", appliedStart, appliedEnd);
  const { mutateAsync: toggleStatus } = useUpdateDonorStatus();

  const donorList = useMemo(() => donorRaw?.data ?? [], [donorRaw]);
  const totalCount = useMemo(() => donorRaw?.totalCount ?? 0, [donorRaw]);

  const displayList = useMemo(() => {
    if (activeTab === "inactive") return inActiveDonorList;
    if (activeTab === "discarded") return discardedDonorList;
    return donorList;
  }, [activeTab, donorList, inActiveDonorList, discardedDonorList]);

  const handleTabSwitch = (tabId) => { setActiveTab(tabId); setPage(0); };

  const handleDetail = useCallback(
    (id) => {
      router.push(`/donorRecord/viewDonorRecord/${id}`);
    },
    [router]
  );

  const handleSearch = () => {
    if (!startingDate || !endingDate) return;
    if (startingDate > endingDate) {
      toast.error("Starting date must be before or equal to ending date.");
      return;
    }
    setAppliedStart(startingDate);
    setAppliedEnd(endingDate);
    setPage(0);
  };

  const handleResetDateFilter = () => {
    setStartingDate("");
    setEndingDate("");
    setAppliedStart("");
    setAppliedEnd("");
    setPage(0);
  };

  const excelFilename = isFiltered
    ? `Donor_list_${appliedStart}_to_${appliedEnd}.csv`
    : "Donor_list.csv";

  const excelData = useMemo(
    () =>
      displayList?.map((item, index) => ({
        sn: activeTab === "active" && !isFiltered ? page * rowsPerPage + index + 1 : index + 1,
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
      })),
    [displayList, activeTab, page, rowsPerPage, isFiltered]
  );

  const isLoading =
    activeTab === "active"
      ? isActiveLoading
      : activeTab === "inactive"
      ? isInactiveLoading
      : isDiscardedLoading;

  return (
    <>
      <div>
        <div className="mx-10">
          <div className="flex flex-wrap items-end gap-4 mb-5 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Starting Date</label>
              <NepaliDatePicker
                inputClassName="form-control focus:outline-none"
                value={startingDate}
                onChange={(e) => setStartingDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Ending Date</label>
              <NepaliDatePicker
                inputClassName="form-control focus:outline-none"
                value={endingDate}
                onChange={(e) => setEndingDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-[#004a89] disabled:bg-gray-400 disabled:cursor-not-allowed px-7 py-2.5 rounded-lg text-sm font-semibold"
              onClick={handleSearch}
              disabled={!startingDate || !endingDate}
            >
              SEARCH
            </button>
            <button
              type="button"
              className="text-white bg-gray-500 hover:bg-gray-600 px-7 py-2.5 rounded-lg text-sm font-semibold"
              onClick={handleResetDateFilter}
            >
              RESET
            </button>
          </div>
          <TableBorder
            title={"Donar Report"}
            title2={
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap justify-end gap-3">
                  <button className="bg-indigo-600 rounded-md text-white font-bold px-3 py-2">
                    <CSVLink data={excelData} filename={excelFilename}>
                      Export to Excel
                    </CSVLink>
                  </button>
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`rounded-md px-4 py-2 font-semibold shadow-md text-white transition-colors duration-150 ${
                        activeTab === tab.id
                          ? "bg-green-500"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                      onClick={() => handleTabSwitch(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            }
          >
            <div className="flex gap-3 mt-5"></div>
            <div className=" my-5">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#004a89] text-white text-lg text-center">
                    <td className="py-3">Reg. No</td>
                    <td className="py-3">Donar Name</td>
                    <td className="py-3">Age</td>
                    <td className="py-3">Address</td>
                    <td className="py-3">Contact</td>
                    <td className="py-3">Status</td>
                    <td className="py-3">Action</td>
                  </tr>
                </thead>
                <tbody>
                {isLoading ? (
                  <TableSkeleton rows={8} cols={7} />
                ) : displayList?.map((item, index) => {
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
                            onChange={() => toggleStatus(item._id)}
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
                })}
                </tbody>
              </table>
              {activeTab === "active" && !isFiltered && (
                <TablePagination
                  component="div"
                  count={totalCount}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onPageChange={(_, newPage) => setPage(newPage)}
                  onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setPage(0); }}
                  rowsPerPageOptions={[10, 25, 50]}
                />
              )}
            </div>
          </TableBorder>
        </div>
      </div>
    </>
  );
}
