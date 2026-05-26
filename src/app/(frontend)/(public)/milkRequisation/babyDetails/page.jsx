"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import TableBorder from "src/components/TableDesign";
import TablePagination from "@mui/material/TablePagination";
import { searchBaby } from "src/services/apiService/baby/babyServices";
import Link from "next/link";
import { useForm } from "react-hook-form";
import TableSkeleton from "src/components/TableSkeleton";
import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };
import Modal from "src/components/Modal";
import toast from "react-hot-toast";
import { useBabyList, useUpdateBabyStatus, useUpdateBabyOutcome } from "src/hooks/useBaby";
import { useBabyOutcome } from "src/hooks/useDropdown";

export default function BabyDetail() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const { register: outcomeRegister, handleSubmit: outcomeHandleSubmit, formState: { errors: outcomeErrors, isSubmitting: outcomeIsSubmitting }, watch: outcomeWatch, reset: outcomeReset } = useForm();

  const [searchOverride, setSearchOverride] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [babyId, setBabyId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const router = useRouter();

  const { data: babyResult = {}, isLoading } = useBabyList(page + 1, rowsPerPage);
  const { data: babyOutcome = [] } = useBabyOutcome();
  const { mutateAsync: toggleStatus } = useUpdateBabyStatus();
  const { mutateAsync: submitOutcome } = useUpdateBabyOutcome();

  const babyDetails = babyResult.data ?? [];
  const totalCount = babyResult.totalCount ?? 0;
  const displayList = searchOverride ?? babyDetails;

  const handleDetail = useCallback((id) => router.push(`/milkRequisation/babyDetails/${id}`), [router]);

  const handleOutcomeModalOpen = (id) => { setBabyId(id); setOpenModal(true); };
  const handleOutcomeModalClose = () => { setBabyId(""); setOpenModal(false); outcomeReset(); };

  const onSubmit = async (data) => {
    try {
      const response = await searchBaby(data?.term);
      if (response?.status == 200) {
        setSearchOverride(response?.data);
      }
    } catch (error) {}
  };

  const onOutcomeSubmit = async (data) => {
    try {
      const response = await submitOutcome({ ...data, babyId });
      if (response?.status === 200) {
        toast.success("Baby Outcome updated successfully");
        handleOutcomeModalClose();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const babyOutcomeOptions = babyOutcome?.map((item, index) => (
    <option key={index} value={item.name}>{item.name}</option>
  ));

  return (
    <div className="pt-10 px-10">
      {openModal && (
        <Modal>
          <div className="bg-white p-5 w-[50vw] rounded-xl">
            <form className="flex flex-col gap-4" onSubmit={outcomeHandleSubmit(onOutcomeSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label>Baby Outcome <span className="text-red-600">*</span></label>
                  <select className="inputStyle" {...outcomeRegister("babyOutcome", { required: "Baby Outcome is required", validate: (value) => value !== "" })}>
                    <option value="">--Select Baby Outcome--</option>
                    {babyOutcomeOptions}
                  </select>
                  {outcomeErrors?.babyOutcome && <p className="text-red-600">{outcomeErrors?.babyOutcome?.message}</p>}
                </div>
                {(outcomeWatch("babyOutcome") === "Refer" || outcomeWatch("babyOutcome") === "Mortality") && (
                  <div className="flex flex-col gap-2">
                    <label>Reason <span className="text-red-600">*</span></label>
                    <textarea className="inputStyle" {...outcomeRegister("reason", { required: "Reason is required" })} placeholder="Enter Reason" />
                    {outcomeErrors?.reason && <p className="text-red-600">{outcomeErrors?.reason?.message}</p>}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={handleOutcomeModalClose} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={outcomeIsSubmitting}>
                  {outcomeIsSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-bold my-2">Search Baby</h1>
        <div className="flex gap-3">
          <input type="text" className="inputStyle" placeholder="Baby Name / ip number" {...register("term", { required: "Baby Name or ip number is required" })} />
          <button type="submit" className="px-6 py-3 rounded-md bg-red-600 hover:bg-blue-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <button type="button" onClick={() => { setSearchOverride(null); reset(); setPage(0); }} className="px-6 py-3 rounded-md bg-red-600 hover:bg-blue-600 text-white">
            Reset
          </button>
        </div>
        {errors?.term && <p className="text-red-600">{errors?.term?.message}</p>}
      </form>
      <TableBorder
        title={"Baby Details"}
        title2={
          <div className="flex justify-end">
            <Link href={"/milkRequisation/addBabyDetails"}>
              <button className="text-white bg-red-600 hover:bg-[#004a89] px-4 py-3 rounded-lg font-bold">+ Add</button>
            </Link>
          </div>
        }
      >
        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#004a89] text-white text-lg text-center">
                <td className="py-3">S.No</td>
                <td className="py-3">Baby Name</td>
                <td className="py-3">Date of Birth</td>
                <td className="py-3">Weight</td>
                <td className="py-3">Indication</td>
                <td className="py-3">Baby Status</td>
                <td className="py-3">Milk Consumed</td>
                <td className="py-3">Action</td>
                <td className="py-3">Status</td>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <TableSkeleton rows={8} cols={9} />
              ) : displayList?.map((items, index) => (
                <tr key={index} className={`${!items?.status ? "bg-red-400" : ""} border border-x-gray text-center`}>
                  <td className="py-3">{searchOverride ? index + 1 : page * rowsPerPage + index + 1}</td>
                  <td className="py-3">{items?.babyName}({items.ipNumber})</td>
                  <td className="py-3">{items?.dateOfBaby}</td>
                  <td className="py-3">{items?.babyWeight}</td>
                  <td className="py-3">{items?.indications}</td>
                  <td className="py-3">{items?.babyStatus}</td>
                  <td className="py-3">{items?.milkConsumed}</td>
                  <td className="py-3">
                    <div className="flex justify-evenly gap-3 text-xl">
                      <h1 className="cursor-pointer bg-indigo-600 text-sm rounded-md text-white px-2 py-1.5" onClick={() => handleDetail(items._id)}>Details</h1>
                      <h1 className="cursor-pointer bg-indigo-600 text-sm rounded-md text-white px-2 py-1.5" onClick={() => handleOutcomeModalOpen(items._id)}>OutCome</h1>
                    </div>
                  </td>
                  <td className="py-3">
                    <Switch {...label} onChange={async () => { await toggleStatus(items._id); }} checked={items?.status} />
                  </td>
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
  );
}
