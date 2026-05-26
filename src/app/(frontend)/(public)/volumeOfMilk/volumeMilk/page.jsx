"use client";
import Link from "next/link";
import { useState, useCallback } from "react";
import { getAllDonorListForSelect } from "../../../../../services/apiService/donorRecord/donor";
import TablePagination from "@mui/material/TablePagination";
import { useQuery } from "@tanstack/react-query";
import { searchMilkVolume } from "src/services/apiService/search/searchService";
import "nepali-datepicker-reactjs/dist/index.css";
import { useForm } from "react-hook-form";
import Loader from "src/components/Loader";
import TableBorder from "@/components/TableDesign";
import Modal from "src/components/Modal";
import toast from "react-hot-toast";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { useDonorWithTotalVolume, useCollectedMilkForDonor, useDiscardMilkBeforePasteurization } from "src/hooks/useMilkVolume";
import { useGestational } from "src/hooks/useDropdown";

export default function ListVolume() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { register: discardRegister, handleSubmit: discardHandleSubmit, formState: { errors: discardErrors, isSubmitting: discardIsSubmitting } } = useForm();

  const [selectedDonorId, setSelectedDonorId] = useState("");
  const [filteredOverride, setFilteredOverride] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(8);

  const { data: filteredVolumeList = [], isLoading, refetch } = useDonorWithTotalVolume();
  const { data: gestationalAgeList = [] } = useGestational();
  const { data: collectedMilkData } = useCollectedMilkForDonor(selectedDonorId, modelOpen);

  const { data: donorList = [] } = useQuery({
    queryKey: ["donor", "selectList"],
    queryFn: async () => {
      const response = await getAllDonorListForSelect();
      return response?.data ?? [];
    },
  });

  const { mutateAsync: discardMilk } = useDiscardMilkBeforePasteurization();

  const displayList = filteredOverride ?? filteredVolumeList;

  const resetFilter = () => {
    setFilteredOverride(null);
    setSelectedDonorId("");
    refetch();
  };

  const handleDetail = useCallback((id) => router.push(`/donorRecord/viewDonorRecord/${id}`), [router]);

  const onSubmit = async () => {
    try {
      const response = await searchMilkVolume(selectedDonorId);
      if (response?.status === 200) {
        setFilteredOverride(response?.data);
      }
    } catch (error) {}
  };

  const handlePageChange = (e, newpage) => setPage(newpage);
  function handlePerPage(e) { setRowPerPage(+e.target.value); setPage(0); }

  const closeModel = () => { setModelOpen(false); setSelectedDonorId(""); };
  const openModel = (id) => { setSelectedDonorId(id); setModelOpen(true); };

  const onSubmitDiscard = async (data) => {
    try {
      const response = await discardMilk({ collectionId: data.collectedId, remark: data.remark });
      if (response?.status === 200) {
        refetch();
        setModelOpen(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {modelOpen && (
        <Modal>
          <div className="bg-white rounded-2xl">
            <div className="flex items-end justify-end p-4">
              <button type="button" className="bg-red-600 px-4 py-2 text-white rounded-xl" onClick={closeModel}>
                Cancel
              </button>
            </div>
            <div className="min-w-[50vw] px-4 py-5">
              {collectedMilkData?.remainingVolume === 0 ? (
                <div className="text-center flex justify-center">
                  <h1 className="text-red-600 bg-red-200 rounded-xl py-1 px-4">
                    Remaining volume of milk for selected donor is 0
                  </h1>
                </div>
              ) : (
                <form className="flex flex-col gap-3" onSubmit={discardHandleSubmit(onSubmitDiscard)}>
                  <div className="w-full flex flex-col gap-2">
                    <section className="text-xl">
                      <span className="font-bold text-gray-500">Donor Name: </span>
                      <span className="font-bold text-gray-500">{collectedMilkData?.donorName}</span>
                    </section>
                    <div className="flex flex-col gap-3">
                      <label>Collected Milk</label>
                      <select className="inputStyle" {...discardRegister("collectedId", { required: "Please select collected milk" })}>
                        <option value="">-- select milk --</option>
                        {collectedMilkData?.volumeList?.map((item, index) => {
                          if (item.collectedMilk.remaining > 0) {
                            return (
                              <option key={index} value={item.collectedMilk._id}>
                                {` (Date : ${item.date} )    (time: ${item.time}) (ml : ${item.remaining}) `}
                              </option>
                            );
                          }
                        })}
                      </select>
                      {discardErrors.collectedId && <span className="text-red-600">{discardErrors.collectedId.message}</span>}
                    </div>
                    <div className="flex flex-col gap-3">
                      <label>Remark <span className="text-red-600">*</span></label>
                      <textarea
                        rows="4" className="inputStyle"
                        {...discardRegister("remark", { required: "Please add remark for discard" })}
                        placeholder="Discard Remark"
                      />
                      {discardErrors.remark && <span className="text-red-600">{discardErrors.remark.message}</span>}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-800 duration-150 ease-in-out text-white py-2 rounded-xl w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={discardIsSubmitting}
                  >
                    {discardIsSubmitting ? "discarding..." : "Discard"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Modal>
      )}
      <div>
        <p className="text-red-600 text-2xl font-bold my-5 mx-10">Volume of Milk</p>
        <form className="my-5 mx-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div>
              <Select options={donorList} onChange={(e) => setSelectedDonorId(e.value)} placeholder={"Select Donor Name"} />
            </div>
            <div className="flex gap-3">
              <button className="text-white bg-red-600 hover:bg-[#004a89] disabled:bg-gray-400 disabled:cursor-not-allowed px-3 py-3 rounded-lg text-sm" type="submit" disabled={!selectedDonorId}>
                SEARCH
              </button>
              <button className="text-white bg-red-600 hover:bg-[#004a89] rounded-lg text-sm px-3 py-3" onClick={resetFilter} type="button">
                RESET
              </button>
            </div>
          </div>
        </form>
        <div className="mx-10">
          <TableBorder
            title={"List of Volume of Milk"}
            title2={
              <div className="flex justify-end">
                <Link href={"/volumeOfMilk/addVolumeOfMilk"}>
                  <button className="text-white bg-red-600 hover:bg-[#004a89] px-4 py-3 rounded-lg font-bold">+ Add</button>
                </Link>
              </div>
            }
          >
            <div className="my-5">
              <table className="w-full">
                <tr className="bg-[#004a89] text-white text-lg text-center">
                  <td className="py-3">Id</td>
                  <td className="py-3">Donor Name</td>
                  <td className="py-3">Gestational Age</td>
                  <td className="py-3">Total Volume</td>
                  <td className="py-3">Remaining Volume</td>
                  <td className="py-3">Action</td>
                </tr>
                {displayList?.slice(page * rowPerPage, page * rowPerPage + rowPerPage)?.map((item, index) => (
                  <tr className="border border-x-gray text-center" key={index}>
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3">{item.donorName}({item.donorRegNo})</td>
                    {gestationalAgeList?.map((age, i) => {
                      if (age.gestationalId === item.gestationalAge) {
                        return <td className="py-3" key={i}>{age.gestationalName}</td>;
                      }
                    })}
                    <td className="py-3">{item.totalMilkCollected} ml</td>
                    <td className="py-3">{item.remaining} ml</td>
                    <td className="py-3 flex items-center justify-center">
                      <div className="flex items-center gap-3 text-xl">
                        <h1 className="cursor-pointer rounded-md px-2 py-1.5 bg-indigo-600 text-white text-sm" onClick={() => handleDetail(item.donorId)}>
                          Details
                        </h1>
                        <h1 className="cursor-pointer rounded-md px-2 py-1.5 bg-red-600 text-white text-sm" onClick={() => openModel(item.donorId)}>
                          Discard
                        </h1>
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
              <TablePagination
                rowsPerPageOptions={[7]}
                rowsPerPage={rowPerPage}
                page={page}
                count={displayList?.length}
                component="div"
                onPageChange={handlePageChange}
                onRowsPerPageChange={handlePerPage}
              />
            </div>
          </TableBorder>
        </div>
      </div>
    </>
  );
}
