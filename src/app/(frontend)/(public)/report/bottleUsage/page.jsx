"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { CSVLink } from "react-csv";
import toast from "react-hot-toast";
import { useBottleUsageReport } from "src/hooks/useMilkRequisition";
import { useGestational } from "src/hooks/useDropdown";
import TableSkeleton from "src/components/TableSkeleton";

const TableBorder = dynamic(() => import("@/components/TableDesign"), { ssr: false });

// poolingCondition 4 is always Colostrum (not part of the Gestational dropdown);
// 1/2/3 are resolved via the DB-backed Gestational list, same as
// report/pasteuriation/page.jsx. Do NOT hardcode a {1,2,3} label map here —
// report/discard/detailed/page.jsx has one and it's wrong (mislabels 1, drops 4).
function resolvePoolingCondition(code, gestationalAge) {
  if (code === null || code === undefined) return "-";
  if (code == 4) return "Colostrum";
  const match = gestationalAge?.find((item) => item.gestationalId == code);
  return match?.gestationalName || "-";
}

export default function BottleUsagePage() {
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [appliedStart, setAppliedStart] = useState("");
  const [appliedEnd, setAppliedEnd] = useState("");

  const { data: bottleUsageList = [], isLoading } = useBottleUsageReport(appliedStart, appliedEnd);
  const { data: gestationalAge = [] } = useGestational();

  const handleSearch = () => {
    if (!startingDate || !endingDate) return;
    if (startingDate > endingDate) {
      toast.error("Starting date must be before or equal to ending date.");
      return;
    }
    setAppliedStart(startingDate);
    setAppliedEnd(endingDate);
  };

  const handleReset = () => {
    setStartingDate("");
    setEndingDate("");
    setAppliedStart("");
    setAppliedEnd("");
  };

  const excelData = bottleUsageList?.map((row, index) => ({
    SN: index + 1,
    Feeding_Date: row.feedingDate,
    Baby_Name: row.babyName,
    IP_Number: row.ipNumber,
    Bottle_Name: row.bottleName,
    Batch_Name: row.batchName,
    Batch_Date: row.batchDate,
    Pooling_Condition: resolvePoolingCondition(row.poolingCondition, gestationalAge),
    Batch_Expire_Date: row.expireDate,
    Quantity_Used_ml: row.quantity,
  }));

  return (
    <>
      <div>
        <div className="my-5 mx-10">
          <p className="text-red-600 text-2xl font-bold my-5">Bottle Usage Report</p>
          <p className="text-gray-500 -mt-3 mb-5">
            Which bottle was used, when, and for which baby.
          </p>
          <div className="grid grid-cols-4 gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Starting Date</label>
              <NepaliDatePicker
                inputClassName="form-control focus:outline-none"
                value={startingDate}
                onChange={(e) => setStartingDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
            <div className="flex flex-col gap-1">
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
              className="text-white bg-red-600 hover:bg-[#004a89] disabled:bg-gray-400 disabled:cursor-not-allowed px-7 py-3 rounded-lg"
              type="button"
              disabled={!startingDate || !endingDate}
              onClick={handleSearch}
            >
              SEARCH
            </button>
            {(appliedStart || appliedEnd) && (
              <button
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-lg"
                onClick={handleReset}
              >
                Reset
              </button>
            )}
          </div>
        </div>
        <div className="mx-10">
          <TableBorder
            title={"Bottle Usage Report"}
            title2={
              <div className="flex flex-col">
                <div className="flex justify-end gap-3">
                  <button
                    className="bg-indigo-600 rounded-md text-white font-bold px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={excelData.length === 0}
                  >
                    <CSVLink data={excelData} filename="Bottle_Usage_Report.csv">
                      Export to Excel
                    </CSVLink>
                  </button>
                </div>
              </div>
            }
          >
            <div className="my-5">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#004a89] text-white text-lg text-center">
                    <td className="py-3">S.N</td>
                    <td className="py-3">Feeding Date</td>
                    <td className="py-3">Baby Name</td>
                    <td className="py-3">IP Number</td>
                    <td className="py-3">Bottle Name</td>
                    <td className="py-3">Batch Name</td>
                    <td className="py-3">Batch Date</td>
                    <td className="py-3">Pooling Condition</td>
                    <td className="py-3">Batch Expire Date</td>
                    <td className="py-3">Quantity Used</td>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <TableSkeleton rows={8} cols={10} />
                  ) : bottleUsageList?.length > 0 ? (
                    bottleUsageList.map((row, index) => (
                      <tr className="border border-x-gray text-center" key={index}>
                        <td className="py-3">{index + 1}</td>
                        <td className="py-3">{row.feedingDate}</td>
                        <td className="py-3">{row.babyName}</td>
                        <td className="py-3">{row.ipNumber}</td>
                        <td className="py-3">{row.bottleName}</td>
                        <td className="py-3">{row.batchName}</td>
                        <td className="py-3">{row.batchDate}</td>
                        <td className="py-3">{resolvePoolingCondition(row.poolingCondition, gestationalAge)}</td>
                        <td className="py-3">{row.expireDate}</td>
                        <td className="py-3">{row.quantity} ml</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-3 text-center text-gray-400" colSpan={10}>
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TableBorder>
        </div>
      </div>
    </>
  );
}
