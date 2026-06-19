"use client";
import dynamic from "next/dynamic";
import { useState, useMemo, Fragment } from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { CSVLink } from "react-csv";
import toast from "react-hot-toast";
import ReportSkeleton from "src/components/ReportSkeleton";
import { useAllDonorsForSelect } from "src/hooks/useDonor";
import { useMotherMilkReport } from "src/hooks/useReport";
import { useGestational } from "src/hooks/useDropdown";
import { getGestationalName } from "src/lib/gestational";

const TableBorder = dynamic(() => import("@/components/TableDesign"), {
  ssr: false,
});

const Select = dynamic(() => import("react-select"), { ssr: false });

const statusTabs = [
  { id: "active", label: "Active Mother" },
  { id: "inactive", label: "Inactive Mother" },
  { id: "all", label: "All Mothers" },
];

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "42px",
    borderColor: state.isFocused ? "#004a89" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #004a89" : "none",
    "&:hover": { borderColor: "#004a89" },
  }),
};

function getRowKey(day, index) {
  return `${day.date}-${index}`;
}

function sanitizeFilename(name) {
  return (name ?? "report")
    .replace(/[/\\?%*:|"<>]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^\w.-]/g, "")
    .slice(0, 50) || "report";
}

function getApiErrorMessage(error) {
  return (
    error?.response?.data?.message ??
    error?.message ??
    "Failed to load report. Please try again."
  );
}

export default function MotherMilkVolumeReport() {
  const [motherStatus, setMotherStatus] = useState("active");
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [appliedDonorId, setAppliedDonorId] = useState("");
  const [appliedStart, setAppliedStart] = useState("");
  const [appliedEnd, setAppliedEnd] = useState("");
  const [appliedMotherStatus, setAppliedMotherStatus] = useState("active");
  const [expandedRowKey, setExpandedRowKey] = useState(null);

  const { data: donorList = [] } = useAllDonorsForSelect(motherStatus);
  const { data: gestationalAgeList = [] } = useGestational();
  const { data: reportData = {}, isLoading, isFetching, isError, error } = useMotherMilkReport({
    donorId: appliedDonorId,
    startDate: appliedStart,
    endDate: appliedEnd,
    motherStatus: appliedMotherStatus,
  });

  const isFiltered = !!appliedDonorId && !!appliedStart && !!appliedEnd;
  const dailyRecords = reportData?.dailyRecords ?? [];
  const errorMessage = getApiErrorMessage(error);
  const exportFilename = `Mother_Milk_Volume_${sanitizeFilename(reportData.donorName)}.csv`;

  const canSearch =
    !!selectedDonor?.value && !!startingDate && !!endingDate;

  const handleStatusChange = (status) => {
    setMotherStatus(status);
    setSelectedDonor(null);
    setAppliedDonorId("");
    setAppliedStart("");
    setAppliedEnd("");
    setAppliedMotherStatus("active");
    setExpandedRowKey(null);
  };

  const handleSearch = () => {
    if (!canSearch) return;

    if (startingDate > endingDate) {
      toast.error("Starting date must be before or equal to ending date.");
      return;
    }

    setAppliedDonorId(selectedDonor.value);
    setAppliedStart(startingDate);
    setAppliedEnd(endingDate);
    setAppliedMotherStatus(motherStatus);
    setExpandedRowKey(null);
  };

  const handleReset = () => {
    setSelectedDonor(null);
    setStartingDate("");
    setEndingDate("");
    setAppliedDonorId("");
    setAppliedStart("");
    setAppliedEnd("");
    setAppliedMotherStatus("active");
    setExpandedRowKey(null);
  };

  const toggleExpand = (rowKey) => {
    setExpandedRowKey((prev) => (prev === rowKey ? null : rowKey));
  };

  const excelData = useMemo(() => {
    if (!isFiltered || isError || dailyRecords.length === 0) return [];

    const rows = [];
    let sn = 1;

    dailyRecords.forEach((day) => {
      if (day.collections?.length > 0) {
        day.collections.forEach((collection) => {
          rows.push({
            SN: sn++,
            Mother_Name: reportData.donorName ?? "",
            Reg_No: reportData.donorRegNo ?? "",
            Hos_Reg_No: reportData.hosRegNo ?? "",
            Date_BS: day.date,
            Time: collection.time ?? "",
            Quantity_ml: collection.quantity ?? 0,
            Stored_By: collection.storedBy ?? "",
            Remaining_ml: collection.remaining ?? 0,
            Discarded: collection.isDiscarded ? "Yes" : "No",
            Daily_Total_ml: day.totalMilkCollected ?? 0,
          });
        });
      } else {
        rows.push({
          SN: sn++,
          Mother_Name: reportData.donorName ?? "",
          Reg_No: reportData.donorRegNo ?? "",
          Hos_Reg_No: reportData.hosRegNo ?? "",
          Date_BS: day.date,
          Time: "",
          Quantity_ml: 0,
          Stored_By: "",
          Remaining_ml: 0,
          Discarded: "",
          Daily_Total_ml: day.totalMilkCollected ?? 0,
        });
      }
    });

    rows.push({
      SN: "",
      Mother_Name: "",
      Reg_No: "",
      Date_BS: "",
      Time: "",
      Quantity_ml: "",
      Stored_By: "",
      Remaining_ml: "",
      Discarded: "",
      Daily_Total_ml: `Total: ${reportData.totalVolumeInRange ?? 0} ml`,
    });

    return rows;
  }, [isFiltered, isError, dailyRecords, reportData]);

  return (
    <div className="px-10 py-5">
      <p className="text-red-600 text-2xl font-bold mb-6">
        Mother Milk Volume Report
      </p>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
        <div className="flex flex-wrap gap-2 mb-5">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`rounded-md px-4 py-2 text-sm font-semibold shadow-sm text-white transition-colors duration-150 ${
                motherStatus === tab.id
                  ? "bg-green-500"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              onClick={() => handleStatusChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Select Mother <span className="text-red-500">*</span>
            </label>
            <Select
              instanceId="mother-milk-donor-select"
              options={donorList}
              value={selectedDonor}
              onChange={setSelectedDonor}
              placeholder="Search mother by name..."
              isClearable
              isSearchable
              styles={selectStyles}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Starting Date (BS) <span className="text-red-500">*</span>
            </label>
            <NepaliDatePicker
              inputClassName="form-control focus:outline-none w-full"
              value={startingDate}
              onChange={(e) => setStartingDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className="inputStyle w-full"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Ending Date (BS) <span className="text-red-500">*</span>
            </label>
            <NepaliDatePicker
              inputClassName="form-control focus:outline-none w-full"
              value={endingDate}
              onChange={(e) => setEndingDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className="inputStyle w-full"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            type="button"
            className="text-white bg-red-600 hover:bg-[#004a89] disabled:bg-gray-400 disabled:cursor-not-allowed px-7 py-2.5 rounded-lg text-sm font-semibold"
            onClick={handleSearch}
            disabled={!canSearch}
          >
            SEARCH
          </button>
          <button
            type="button"
            className="text-white bg-gray-500 hover:bg-gray-600 px-7 py-2.5 rounded-lg text-sm font-semibold"
            onClick={handleReset}
          >
            RESET
          </button>
        </div>
      </div>

      {isFiltered && !isError && (
        <div className="mb-5 p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-gray-700 flex flex-wrap gap-x-6 gap-y-1">
          <span>
            <span className="font-semibold text-gray-800">Mother:</span>{" "}
            {reportData.donorName}
          </span>
          <span>
            <span className="font-semibold text-gray-800">Reg No:</span>{" "}
            {reportData.donorRegNo ?? "—"}
          </span>
          <span>
            <span className="font-semibold text-gray-800">Hos Reg No:</span>{" "}
            {reportData.hosRegNo ?? "—"}
          </span>
          <span>
            <span className="font-semibold text-gray-800">Period:</span>{" "}
            {appliedStart} – {appliedEnd}
          </span>
          <span>
            <span className="font-semibold text-gray-800">Total:</span>{" "}
            <span className="text-[#004a89] font-bold">
              {reportData.totalVolumeInRange ?? 0} ml
            </span>
          </span>
          {isFetching && (
            <span className="text-gray-400 text-xs italic">Refreshing…</span>
          )}
        </div>
      )}

      <TableBorder
        title="Milk Collection Details"
        title2={
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-indigo-600 rounded-md text-white font-bold px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isFiltered || excelData.length === 0}
            >
              <CSVLink
                data={excelData}
                filename={exportFilename}
              >
                Export to Excel
              </CSVLink>
            </button>
          </div>
        }
      >
        <div className="my-5">
          {!isFiltered ? (
            <p className="text-center text-gray-500 py-10">
              Select a mother and date range, then click Search.
            </p>
          ) : isLoading && !reportData?.dailyRecords?.length ? (
            <ReportSkeleton rows={8} />
          ) : isError ? (
            <div className="text-center py-10">
              <p className="text-red-600 font-medium mb-2">{errorMessage}</p>
              <p className="text-gray-500 text-sm">
                Check your selection and try again.
              </p>
            </div>
          ) : dailyRecords.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              No milk collection records found for the selected period.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#004a89] text-white text-sm text-center">
                    <th className="py-3 w-12"></th>
                    <th className="py-3 px-2">Date (BS)</th>
                    <th className="py-3 px-2">Gestational Age</th>
                    <th className="py-3 px-2">Total Volume (ml)</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyRecords.map((day, index) => {
                    const rowKey = getRowKey(day, index);
                    const isExpanded = expandedRowKey === rowKey;

                    return (
                      <Fragment key={rowKey}>
                        <tr
                          className={`text-center cursor-pointer transition-colors border-b border-gray-100 ${
                            isExpanded
                              ? "bg-blue-50 hover:bg-blue-100"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() => toggleExpand(rowKey)}
                        >
                          <td className="py-3 text-gray-500">
                            <span
                              className={`inline-block transition-transform duration-200 ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            >
                              ▶
                            </span>
                          </td>
                          <td className="py-3 px-2 font-medium">{day.date}</td>
                          <td className="py-3 px-2">
                            {getGestationalName(
                              gestationalAgeList,
                              day.gestationalAge,
                            )}
                          </td>
                          <td className="py-3 px-2 font-semibold text-[#004a89]">
                            {day.totalMilkCollected} ml
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="border-b border-gray-200">
                            <td colSpan={4} className="p-0 bg-gray-50">
                              <div className="px-4 py-3 border-t border-blue-100">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                  Collection entries for {day.date}
                                </p>
                                <table className="w-full rounded-md overflow-hidden border border-gray-200">
                                  <thead>
                                    <tr className="bg-gray-200 text-gray-700 text-xs text-center">
                                      <th className="py-2 px-2">Time</th>
                                      <th className="py-2 px-2">Quantity (ml)</th>
                                      <th className="py-2 px-2">Stored By</th>
                                      <th className="py-2 px-2">Remaining (ml)</th>
                                      <th className="py-2 px-2">Discarded</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {day.collections?.length > 0 ? (
                                      day.collections.map((item, idx) => (
                                        <tr
                                          key={item.id ?? `${item.time}-${item.quantity}-${idx}`}
                                          className="border-t border-gray-200 text-center text-sm bg-white"
                                        >
                                          <td className="py-2 px-2">{item.time}</td>
                                          <td className="py-2 px-2">{item.quantity}</td>
                                          <td className="py-2 px-2">{item.storedBy}</td>
                                          <td className="py-2 px-2">{item.remaining}</td>
                                          <td className="py-2 px-2">
                                            <span
                                              className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                                                item.isDiscarded
                                                  ? "bg-red-100 text-red-700"
                                                  : "bg-green-100 text-green-700"
                                              }`}
                                            >
                                              {item.isDiscarded ? "Yes" : "No"}
                                            </span>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan={5}
                                          className="py-4 text-center text-gray-400 text-sm bg-white"
                                        >
                                          No collection entries for this date.
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </TableBorder>
    </div>
  );
}
