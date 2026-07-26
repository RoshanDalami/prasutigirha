"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { CSVLink } from "react-csv";
import toast from "react-hot-toast";
import { useBatchUsageReport } from "src/hooks/useMilkRequisition";
import TableSkeleton from "src/components/TableSkeleton";

const TableBorder = dynamic(() => import("@/components/TableDesign"), { ssr: false });

export default function BatchUsagePage() {
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [appliedStart, setAppliedStart] = useState("");
  const [appliedEnd, setAppliedEnd] = useState("");

  const { data: batchUsageList = [], isLoading } = useBatchUsageReport(appliedStart, appliedEnd);

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

  const excelData = batchUsageList?.map((item) => ({
    Feeding_Date: item.feedingDate,
    Batch_Name: item.batchDate ? `${item.batchName}(${item.batchDate})` : item.batchName,
    Total_Volume_Used_ml: item.totalVolumeUsed,
    No_of_Bottles: item.bottleCount,
  }));

  return (
    <>
      <div>
        <div className="my-5 mx-10">
          <p className="text-red-600 text-2xl font-bold my-5">Batch Usage Report</p>
          <p className="text-gray-500 -mt-3 mb-5">
            Which batch was used on which date, regardless of baby.
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
            title={"Batch Usage Report"}
            title2={
              <div className="flex flex-col">
                <div className="flex justify-end gap-3">
                  <button
                    className="bg-indigo-600 rounded-md text-white font-bold px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={excelData.length === 0}
                  >
                    <CSVLink data={excelData} filename="Batch_Usage_Report.csv">
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
                    <td className="py-3">Batch Name</td>
                    <td className="py-3">Total Volume Used</td>
                    <td className="py-3">No. of Bottles</td>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <TableSkeleton rows={8} cols={5} />
                  ) : batchUsageList?.length > 0 ? (
                    batchUsageList.map((row, index) => (
                      <tr className="border border-x-gray text-center" key={index}>
                        <td className="py-3">{index + 1}</td>
                        <td className="py-3">{row.feedingDate}</td>
                        <td className="py-3">
                          {row.batchDate ? `${row.batchName}(${row.batchDate})` : row.batchName}
                        </td>
                        <td className="py-3">{row.totalVolumeUsed} ml</td>
                        <td className="py-3">{row.bottleCount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-3 text-center text-gray-400" colSpan={5}>
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
