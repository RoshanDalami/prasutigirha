"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import Button from "src/components/button";
import { useRouter } from "next/navigation";
import { searchDonor } from "src/services/apiService/search/searchService";
import "nepali-datepicker-reactjs/dist/index.css";
import { useForm } from "react-hook-form";
import TablePagination from "@mui/material/TablePagination";
import Switch from "@mui/material/Switch";
import Loader from "src/components/Loader";
import TableBorder from "src/components/TableDesign";
import { useDonorList, useUpdateDonorStatus } from "src/hooks/useDonor";
import { useQueryClient } from "@tanstack/react-query";
import { keys } from "src/lib/queryKeys";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function ViewDonor() {
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(8);
  const [donorListOverride, setDonorListOverride] = useState(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const { data, isLoading } = useDonorList(page + 1, rowPerPage);
  const { mutateAsync: toggleStatus } = useUpdateDonorStatus();

  const donorList = donorListOverride ?? data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;

  const handlePageChange = (e, newpage) => {
    setPage(newpage);
    setDonorListOverride(null);
  };

  function handlePerPage(e) {
    setRowPerPage(+e.target.value);
    setPage(0);
    setDonorListOverride(null);
  }

  const resetFilter = () => {
    setDonorListOverride(null);
    queryClient.invalidateQueries({ queryKey: ["donor"] });
  };

  const handleEdit = useCallback((id) => router.push(`/donorRecord/addDonorRecord/${id}`), [router]);
  const handleDetail = useCallback((id) => router.push(`/donorRecord/viewDonorRecord/${id}`), [router]);
  const handleOther = (id) => router.push(`/donorRecord/viewDonorRecord/Other/${id}`);
  const handleOtherView = (id) => router.push(`/donorRecord/viewDonorRecord/Other/test/${id}`);
  const handleSerologyUpdate = (id) => router.push(`/donorRecord/viewDonorRecord/serologyupdate/${id}`);

  const onSubmit = async (formData) => {
    try {
      const response = await searchDonor(formData.donorName, formData.number, formData.regNumber);
      if (response?.status === 200) {
        setDonorListOverride(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="my-5 mx-10" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-red-600 text-2xl font-bold my-5">Donar Records</p>
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            className="border px-4 border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
            placeholder="Donor Name"
            {...register("donorName")}
          />
          <input
            type="text"
            className="border px-4 border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
            placeholder="Contact Number"
            {...register("number")}
          />
          <input
            type="text"
            className="border px-4 border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
            placeholder="Hospital Regestration Number"
            {...register("regNumber")}
          />
          <div className="flex gap-3">
            <button className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg" type="submit">
              SEARCH
            </button>
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg"
              onClick={resetFilter}
            >
              RESET
            </button>
          </div>
        </div>
      </form>
      <div className="mx-10">
        <TableBorder
          title={"List of Donar Records"}
          title2={
            <div className="flex flex-col">
              <div className="flex justify-end">
                <Link href={"/donorRecord/addDonorRecord"}>
                  <Button>+Add </Button>
                </Link>
              </div>
            </div>
          }
        >
          <div className="my-5">
            <table className="w-full">
              {!isLoading && (
                <tr className="bg-[#004a89] text-white text-lg text-center">
                  <td className="py-3">Reg. No</td>
                  <td className="py-3">Donar Name</td>
                  <td className="py-3">Age</td>
                  <td className="py-3">Address</td>
                  <td className="py-3">Contact</td>
                  <td className="py-3">Status</td>
                  <td className="py-3">Details</td>
                  <td className="py-3">Test</td>
                  <td></td>
                </tr>
              )}
              {isLoading ? (
                <div className="w-[80vw] flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                donorList?.map((item, index) => (
                  <tr className="border border-x-gray text-center" key={index}>
                    <td className="py-3">{item.donorRegNo}</td>
                    <td className="py-3">{item.donorName}</td>
                    <td className="py-3">{item.donorAge}</td>
                    <td className="py-3">{item?.address?.stateId}</td>
                    <td className="py-3">{item.contactNo}</td>
                    <td className="py-3">
                      <div className="flex justify-evenly text-xl">
                        <Switch
                          {...label}
                          onChange={async () => {
                            await toggleStatus(item._id);
                          }}
                          checked={item.isDonorActive}
                        />
                      </div>
                    </td>
                    <td>
                      <h1
                        className="cursor-pointer rounded-md px-2 py-1.5 bg-indigo-600 text-white font-semibold"
                        onClick={() => handleDetail(item._id)}
                      >
                        Details
                      </h1>
                    </td>
                    <td className="py-2">
                      <div className="flex gap-3 items-center justify-center">
                        <button
                          className="bg-indigo-600 rounded-md shadow-md px-3 py-2 text-white"
                          onClick={() => handleOther(item._id)}
                        >
                          Other
                        </button>
                        {item?.other?.length > 0 && (
                          <button
                            className="bg-indigo-600 rounded-md shadow-md px-3 py-2 text-white"
                            onClick={() => handleOtherView(item._id)}
                          >
                            View Test
                          </button>
                        )}
                        {item.isSerologyPending && (
                          <button
                            className="bg-indigo-600 px-2 py-2 text-white rounded-lg"
                            type="button"
                            onClick={() => handleSerologyUpdate(item._id)}
                          >
                            Update Serology
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </table>
            {!donorListOverride && (
              <TablePagination
                component="div"
                count={totalCount}
                page={page}
                rowsPerPage={rowPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handlePerPage}
                rowsPerPageOptions={[8, 25, 50]}
              />
            )}
          </div>
        </TableBorder>
      </div>
    </div>
  );
}
