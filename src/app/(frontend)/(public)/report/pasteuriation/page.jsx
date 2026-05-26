"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TableBorder from "src/components/TableDesign";
import TablePagination from "@mui/material/TablePagination";
import { useForm } from "react-hook-form";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { CSVLink } from "react-csv";
const aa = new BikramSambat(new Date()).toBS();
import { searchPasteurization } from "src/services/apiService/search/searchService";
import { usePasteurizationList, useDeletePooling, useUpdateCulture } from "src/hooks/usePasteurization";
import TableSkeleton from "src/components/TableSkeleton";
import { useGestational } from "src/hooks/useDropdown";

export default function ListVolume() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const router = useRouter();
  const [date, setDate] = useState("");
  const [searchOverride, setSearchOverride] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: result = {}, isLoading } = usePasteurizationList(page + 1, rowsPerPage);
  const { data: gestationalAge = [] } = useGestational();
  const { mutateAsync: deletePooling } = useDeletePooling();
  const { mutateAsync: updateCulture } = useUpdateCulture();

  const basePoolingList = result.data ?? [];
  const totalCount = result.totalCount ?? 0;
  const poolingList = searchOverride ?? basePoolingList;

  const handleEdit = (id) => { router.push(`/pasteurization/addPasteurization/${id}`); };
  const handleBottleDetails = (id) => { router.push(`/pasteurization/pasteurizationList/${id}`); };
  const handleDelete = async (id) => { await deletePooling(id); };

  const onSubmit = async (culture, id) => {
    try {
      await updateCulture({ id, culture });
    } catch (error) {
      console.log(error);
    }
  };

  const gestationalOptions = gestationalAge?.map((item, index) => (
    <option key={index} value={item.gestationalId}>{item.gestationalName}</option>
  ));

  const submit = async (data) => {
    try {
      const response = await searchPasteurization(data.gestationalAge, date);
      if (response?.status === 200) {
        setSearchOverride(response?.data);
        setPage(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const excelData = poolingList?.map((items) => ({
    Pooling_Condition: gestationalAge?.map((item) => {
      if (item.gestationalId == items.poolingCondition) return item.gestationalName;
    }),
    Pooling_Date: items.date,
    Pooling_Date_English: items.engDate,
    Expire_Date: items.expireDate,
    Total_Milk_Pooled: items.collectedVolume,
    BatchName: items.batchName,
    Culture_Result: items.culture ? "Positive (Discard) " : "Negative (Despense) ",
  }));

  return (
    <>
      <div>
        <form className="my-5 mx-10" onSubmit={handleSubmit((data) => submit(data))}>
          <p className="text-red-600 text-2xl font-bold my-5">Pasteurization</p>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <select {...register("gestationalAge")} className="inputStyle">
                <option value={""}>--select gestational age--</option>
                {gestationalOptions}
              </select>
            </div>
            <div>
              <NepaliDatePicker
                inputClassName="form-control focus:outline-none"
                value={date}
                onChange={(e) => setDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
            <div className="flex gap-3">
              <button className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg">
                SEARCH
              </button>
              {searchOverride && (
                <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-lg" onClick={() => { setSearchOverride(null); setPage(0); }}>
                  Reset
                </button>
              )}
            </div>
          </div>
        </form>
        <div className="mx-10">
          <TableBorder
            title={"Pasteurization Report"}
            title2={
              <div className="flex flex-col">
                <div className="flex justify-end gap-3">
                  <button className="bg-indigo-600 rounded-md text-white font-bold px-3 py-2">
                    <CSVLink data={excelData} filename="Pooling_Details.csv">
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
                    <td className="py-3 px-2">S.N</td>
                    <td className="py-3 px-2">Number of Donor</td>
                    <td className="py-3 px-2">Pooling Date</td>
                    <td className="py-3 px-2">Pooling Condition</td>
                    <td className="py-3 px-2">Volume Collected</td>
                    <td className="py-3 px-2">Batch Name</td>
                    <td className="py-3 px-2">Expiry Date</td>
                  </tr>
                </thead>
                <tbody>
                {isLoading ? (
                  <TableSkeleton rows={8} cols={7} />
                ) : poolingList?.map((row, index) => (
                  <tr
                    className={`${row.culture ? "bg-rose-400/50" : row.culture === false ? "bg-lime-600/50" : ""} border border-x-gray text-center`}
                    key={index}
                  >
                    <td className="py-3">{searchOverride ? index + 1 : page * rowsPerPage + index + 1}</td>
                    <td className="py-3">{row?.donorDetailsForPooling?.length}</td>
                    <td className="py-3">{row?.date}</td>
                    {row.poolingCondition == 4 ? (
                      <td className="py-3">{"Colostrum"}</td>
                    ) : (
                      gestationalAge?.map((item, index) => {
                        if (item.gestationalId == row.poolingCondition) {
                          return <td className="py-3" key={index}>{item.gestationalName}</td>;
                        }
                      })
                    )}
                    <td className="py-3">{row.collectedVolume} ml</td>
                    <td className="py-3">{row.batchName}({row?.date})</td>
                    <td className="py-3">{row.expireDate}</td>
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
