"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import TableBorder from "src/components/TableDesign";
import TablePagination from "@mui/material/TablePagination";
import { useForm } from "react-hook-form";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import Loader from "src/components/Loader";
import { searchPasteurization } from "src/services/apiService/search/searchService";
import Modal from "src/components/Modal";
import { usePasteurizationList, useDiscardPasteurization } from "src/hooks/usePasteurization";
import { useGestational } from "src/hooks/useDropdown";

const aa = new BikramSambat(new Date()).toBS();

export default function ListVolume() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const { register: DiscardRegister, handleSubmit: DiscardHandleSubmit, formState: { errors: DiscardError, isSubmitting: DiscardIsSubmitting }, reset: DiscardFieldReset } = useForm();
  const router = useRouter();
  const [date, setDate] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedBatchName, setSelectedBatchName] = useState("");
  const [searchOverride, setSearchOverride] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch a large page to enable client-side filtering on remaining > 0
  const { data: result = {}, isLoading, refetch } = usePasteurizationList(1, 500);
  const { data: gestationalAge = [] } = useGestational();
  const { mutateAsync: discardItem } = useDiscardPasteurization();

  const allItems = result.data ?? [];

  const filteredList = useMemo(
    () => (searchOverride ?? allItems).filter((item) => item.remaining > 0),
    [searchOverride, allItems]
  );

  const displayList = filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleEdit = (id) => router.push(`/pasteurization/addPasteurization/${id}`);
  const handleBottleDetails = (id) => router.push(`/pasteurization/pasteurizationList/${id}`);
  const handleCulture = (id) => router.push(`/pasteurization/pasteurizationList/culture/${id}`);

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

  const handleReset = async () => {
    setResetLoading(true);
    setSearchOverride(null);
    setPage(0);
    await refetch();
    setResetLoading(false);
  };

  const gestationalOptions = gestationalAge?.map((item, index) => (
    <option key={index} value={item.gestationalId}>{item.gestationalName}</option>
  ));

  function combineVolumes(array) {
    const combinedMap = new Map();
    array?.forEach((item) => {
      const key = item.donorId;
      if (combinedMap.has(key)) {
        combinedMap.get(key).volumeOfMilkPooled += item.volumeOfMilkPooled;
      } else {
        combinedMap.set(key, { ...item });
      }
    });
    return Array.from(combinedMap.values());
  }

  const openDiscardModal = (id, batchName) => { setSelectedItemId(id); setSelectedBatchName(batchName); setModalOpen(true); };
  const closeDiscardModal = () => { setModalOpen(false); DiscardFieldReset(); setSelectedItemId(""); };

  const onSubmitDiscard = async (data) => {
    try {
      const response = await discardItem({ id: selectedItemId, remarks: data.remarks });
      if (response?.status === 200) {
        setSearchOverride(null);
        setModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {modalOpen && (
        <Modal>
          <div className="bg-white min-w-[50vw] rounded-2xl px-3 py-6">
            <div className="flex justify-end">
              <button type="button" className="bg-red-600 px-3 py-2 text-white rounded-xl" onClick={closeDiscardModal}>
                cancel
              </button>
            </div>
            <div className="my-3">
              <form className="flex flex-col gap-5" onSubmit={DiscardHandleSubmit(onSubmitDiscard)}>
                <div className="flex flex-col gap-3">
                  <div className="text-xl font-bold text-gray-500">
                    <span>Batch Name : </span><span>{selectedBatchName}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Remarks <span className="text-red-600">*</span></label>
                    <textarea
                      {...DiscardRegister("remarks", { required: "Discard reason is required" })}
                      row={8} className="inputStyle" placeholder="Discard reason"
                    />
                    {DiscardError?.remarks && <span className="text-red-600">{DiscardError?.remarks.message}</span>}
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-600 duration-150 ease-in-out py-2 rounded-lg text-white disabled:bg-gray-300 disabled:cursor-not-allowed w-full"
                  disabled={DiscardIsSubmitting}
                >
                  {DiscardIsSubmitting ? "discarding ..." : "Discard"}
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}
      <div>
        <form className="my-5 mx-10" onSubmit={handleSubmit(submit)}>
          <p className="text-red-600 text-2xl font-bold my-5">Pasteurization</p>
          <div className="grid grid-cols-4 gap-4">
            <select {...register("gestationalAge", { valueAsNumber: true })} className="inputStyle">
              <option value="">--select gestational age--</option>
              {gestationalOptions}
            </select>
            <div>
              <NepaliDatePicker
                inputClassName="form-control focus:outline-none"
                value={date}
                onChange={(e) => setDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
            <div className="flex gap-4 items-center">
              <button className="text-white bg-red-600 hover:bg-[#004a89] px-6 py-2 rounded-lg disabled:bg-gray-200 disabled:cursor-not-allowed" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "searching ..." : "SEARCH"}
              </button>
              <button className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg disabled:bg-gray-200 disabled:cursor-not-allowed" type="button" disabled={resetLoading} onClick={handleReset}>
                {resetLoading ? "resetting ..." : "Reset"}
              </button>
            </div>
          </div>
        </form>
        <div className="mx-10">
          <TableBorder
            title={"List of Pasteurized Milk"}
            title2={
              <div className="flex justify-end">
                <Link href={"/pasteurization/addPasteurization"}>
                  <button className="text-white bg-red-600 hover:bg-[#004a89] px-4 py-3 rounded-lg font-bold">+ Add</button>
                </Link>
              </div>
            }
          >
            <div className="my-5">
              <table className="w-full">
                <tr className="bg-[#004a89] text-white text-lg text-center">
                  <td className="py-3 px-2">S.N</td>
                  <td className="py-3 px-2">Number of Donor</td>
                  <td className="py-3 px-2">Pooling Date</td>
                  <td className="py-3 px-2">Pooling Condition</td>
                  <td className="py-3 px-2">Volume Collected</td>
                  <td className="py-3 px-2">Batch Name</td>
                  <td className="py-3 px-2">Expiry Date</td>
                  <td className="py-3 px-2">Action</td>
                </tr>
                {displayList?.map((row, index) => (
                  <tr
                    className={`${(row.culture || row.discard) ? "bg-rose-400/50" : (row.discard === false && row.culture === false) ? "bg-lime-600/50" : ""} border border-x-gray text-center`}
                    key={index}
                  >
                    <td className="py-3">{page * rowsPerPage + index + 1}</td>
                    <td className="py-3">{combineVolumes(row?.donorDetailsForPooling)?.length}</td>
                    <td className="py-3">{row?.date}</td>
                    {row.poolingCondition == 4 ? (
                      <td className="py-3">Colostrum</td>
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
                    <td className="py-3 px-2">
                      <div className="flex justify-evenly gap-3 text-xl">
                        <button className="bg-indigo-600 rounded-md text-sm text-white px-2 py-1 mr-2" onClick={() => handleBottleDetails(row._id)}>
                          Bottles
                        </button>
                        {(row.discard === false && row.culture === null) && (
                          <button className="bg-red-600 rounded-md text-sm text-white px-2 py-1 mr-2" onClick={() => openDiscardModal(row._id, `${row.batchName} (${row.date})`)}>
                            Discard
                          </button>
                        )}
                        {row.culture == null && (
                          <button className="bg-purple-600 rounded-md text-sm text-white px-2 py-1 mr-2" onClick={() => handleCulture(row._id)}>
                            Culture
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
              <TablePagination
                component="div"
                count={filteredList.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setPage(0); }}
                rowsPerPageOptions={[10, 25, 50]}
              />
            </div>
          </TableBorder>
        </div>
      </div>
    </>
  );
}
