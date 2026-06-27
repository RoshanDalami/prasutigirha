"use client";
import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { searchMilkVolume } from "src/services/apiService/search/searchService";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
const aa = new BikramSambat(new Date()).toBS();
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import TablePagination from "@mui/material/TablePagination";
import { useMilkVolumeList, useDonorWithTotalVolume } from "src/hooks/useMilkVolume";
import TableSkeleton from "src/components/TableSkeleton";
import { useGestational } from "src/hooks/useDropdown";
import { getGestationalName } from "src/lib/gestational";
import toast from "react-hot-toast";

const TableBorder = dynamic(() => import("@/components/TableDesign"), { ssr: false });

export default function ListVolume() {
  const { register, handleSubmit, reset } = useForm();
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [searchOverride, setSearchOverride] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: result = {}, isLoading } = useMilkVolumeList(page + 1, rowsPerPage);
  const { data: excelVolumeList = [] } = useDonorWithTotalVolume();
  const { data: gestationalAgeList = [] } = useGestational();

  const volumeList = result.data ?? [];
  const totalCount = result.totalCount ?? 0;
  const displayList = searchOverride ?? volumeList;
  const exportData = searchOverride ?? excelVolumeList;
  const exportFilename = searchOverride
    ? `Milk_volume_${startingDate}_to_${endingDate}.csv`
    : "Milk_volume.csv";

  const router = useRouter();
  const handleEdit = useCallback(
    (id) => { router.push(`/volumeOfMilk/addVolumeOfMilk/${id}`); },
    [router]
  );

  const resetFilter = () => {
    setSearchOverride(null);
    setPage(0);
    setStartingDate("");
    setEndingDate("");
    reset();
  };

  const gestationalOptions = gestationalAgeList?.map((item, index) => (
    <option key={index} value={item.gestationalId}>{item.gestationalName}</option>
  ));

  const onSubmit = async (data) => {
    if (!startingDate || !endingDate) return;
    if (startingDate > endingDate) {
      toast.error("Starting date must be before or equal to ending date.");
      return;
    }
    try {
      const response = await searchMilkVolume(
        null,
        data.gestationalAge,
        null,
        startingDate,
        endingDate,
      );
      if (response?.status === 200) {
        setSearchOverride(response?.data);
        setPage(0);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Search failed");
    }
  };

  return (
    <>
      <div>
        <form className="my-5 mx-10" onSubmit={handleSubmit((data) => onSubmit(data))}>
          <p className="text-red-600 text-2xl font-bold my-5">Volume of Milk</p>
          <div className="grid grid-cols-5 gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Gestational Age</label>
              <select {...register("gestationalAge")} className="inputStyle">
                <option value={""}>--select gestational age--</option>
                {gestationalOptions}
              </select>
            </div>
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
            <div className="flex gap-3">
              <button
                className="text-white bg-red-600 hover:bg-[#004a89] disabled:bg-gray-400 disabled:cursor-not-allowed px-7 py-3 rounded-lg"
                type="submit"
                disabled={!startingDate || !endingDate}
              >
                SEARCH
              </button>
              <button className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg" type="button" onClick={resetFilter}>
                RESET
              </button>
            </div>
          </div>
        </form>
        <div className="mx-10">
          <TableBorder
            title={"Milk Volume Report"}
            title2={
              <div className="flex flex-col">
                <div className="flex justify-end gap-3">
                  <button className="bg-indigo-600 rounded-md text-white font-bold px-3 py-2">
                    <CSVLink data={exportData} filename={exportFilename}>
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
                    <td className="py-3">Id</td>
                    <td className="py-3">Donor Name</td>
                    <td className="py-3">Gestational Age</td>
                    <td className="py-3">Date</td>
                    <td className="py-3">Total Volume</td>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <TableSkeleton rows={8} cols={5} />
                  ) : displayList?.map((item, index) => (
                    <tr className="border border-x-gray text-center" key={index}>
                      <td className="py-3">{searchOverride ? index + 1 : page * rowsPerPage + index + 1}</td>
                      <td className="py-3">{item.donorName}</td>
                      <td className="py-3">
                        {getGestationalName(gestationalAgeList, item.gestationalAge)}
                      </td>
                      <td className="py-3">{item.date}</td>
                      <td className="py-3">{item.totalMilkCollected} ml</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!searchOverride && (
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
