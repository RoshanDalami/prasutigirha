"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { searchRequsition } from "src/services/apiService/search/searchService";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
const aa = new BikramSambat(new Date()).toBS();
import { useForm } from "react-hook-form";
import { CSVLink } from "react-csv";
import TablePagination from "@mui/material/TablePagination";
import { useMilkRequisitionList } from "src/hooks/useMilkRequisition";

export default function ListVolume() {
  const TableBorder = dynamic(() => import("@/components/TableDesign"), { ssr: false });
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [searchOverride, setSearchOverride] = useState(null);
  const [date, setDate] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: result = {} } = useMilkRequisitionList(page + 1, rowsPerPage);
  const baseList = result.data ?? [];
  const totalCount = result.totalCount ?? 0;
  const requsitionList = searchOverride ?? baseList;

  const handleEdit = useCallback(
    (id) => { router.push(`/milkRequisation/addMilkRequisation/${id}`); },
    [router]
  );

  const onSubmit = async (data) => {
    try {
      const response = await searchRequsition(date);
      if (response?.status === 200) {
        setSearchOverride(response?.data);
        setPage(0);
      }
    } catch (error) {
      console.log(error, 'response');
    }
  };

  const excelData = requsitionList?.map((item) => ({
    Baby_Name: item.babyName,
    Feeding_Date: item.feedingDate,
    Requisited_Milk: item.totalRequisitedMilk,
  }));

  return (
    <>
      <div>
        <form className="my-5 mx-10" onSubmit={handleSubmit((data) => onSubmit(data))}>
          <p className="text-red-600 text-2xl font-bold my-5">Milk Requisition Form</p>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <NepaliDatePicker
                inputClassName="form-control focus:outline-none"
                value={date}
                onChange={(e) => setDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
            <button className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg" type="submit">
              SEARCH
            </button>
            {searchOverride && (
              <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-lg" onClick={() => { setSearchOverride(null); setPage(0); }}>
                Reset
              </button>
            )}
          </div>
        </form>
        <div className="mx-10">
          <TableBorder
            title={"Milk Requisition Report"}
            title2={
              <div className="flex flex-col">
                <div className="flex justify-end gap-3">
                  <button className="bg-indigo-600 rounded-md text-white font-bold px-3 py-2">
                    <CSVLink data={excelData} filename="Milk_requistion.csv">
                      Export to Excel
                    </CSVLink>
                  </button>
                </div>
              </div>
            }
          >
            <div className="my-5">
              <table className="w-full">
                <tr className="bg-[#004a89] text-white text-lg text-center">
                  <td className="py-3">S.N</td>
                  <td className="py-3">Baby Name</td>
                  <td className="py-3">Feeding Date</td>
                  <td className="py-3">Total Milk Feeded</td>
                  <td className="py-3">No. of Bottle</td>
                </tr>
                {requsitionList?.map((row, index) => (
                  <tr className="border border-x-gray text-center" key={index}>
                    <td className="py-3">{searchOverride ? index + 1 : page * rowsPerPage + index + 1}</td>
                    <td className="py-3">{row?.babyName}</td>
                    <td className="py-3">{row?.feedingDate}</td>
                    <td className="py-3">
                      {row.requisitedMilk.map((item) => item.quantity).reduce((acc, amount) => acc + amount, 0)}
                    </td>
                    <td className="py-3">{row.requisitedMilk.length}</td>
                  </tr>
                ))}
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
