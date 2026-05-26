"use client";
import Link from "next/link";
import Button from "src/components/button";
import { useRouter } from "next/navigation";
import Switch from "@mui/material/Switch";
import { FaEdit } from "react-icons/fa";
import Loader from "src/components/Loader";
import TableBorder from "@/components/TableDesign";
import { useFiscalYearList, useUpdateFiscalYearStatus } from "src/hooks/useOffice";
const label = { inputProps: { "aria-label": "Switch demo" } };
export default function ViewDonor() {
  const router = useRouter();
  const { data: apiData = [], isLoading } = useFiscalYearList();
  const { mutateAsync: toggleStatus } = useUpdateFiscalYearStatus();
  const handleEdit = (id) => {
    router.push(`/office/fiscalYear/createFiscalYear/${id}`)
  }
  const local = <div>
    <div className="mx-10">
      <TableBorder
          title={"Fiscal Year List"}
          title2={
            <div className="flex flex-col   ">
              <div className=" flex justify-end">
                <Link href={"/office/fiscalYear/createFiscalYear"}>
                  <Button>+Add </Button>
                </Link>
              </div>
            </div>
          }
      >
        <div className=" my-5">
          <table className="w-full">
            <tr className="bg-[#004a89] text-white text-lg text-center">
              {/* <td className="py-3">
                    <input type="checkbox" name="" id="" />
                  </td> */}
              <th className="py-3">S No.</th>
              <th className="py-3">Fiscal Year</th>
              <th className="py-3">Status</th>
              <th className="py-3">Update Status</th>
              <th className="py-3">Action</th>

              {/* <td className="py-3">Email</td>
                  <td className="py-3">Contact</td> */}
            </tr>
            {apiData?.map((item, index) => {
              return (
                  <tr key={index}>
                    <th className="border border-black px-2 py-3">
                      {index + 1}
                    </th>
                    <th className="border border-black px-2 py-3">
                      {item.fiscalYear}
                    </th>
                    <th
                        className={`border border-black px-2 py-3 ${
                            item.status ? "text-green-600" : "text-red-600"
                        } `}
                    >
                      {item.status ? "Active" : "Deactive"}
                    </th>
                    <th className={`border border-black px-2 py-3  `}>
                      <Switch
                          {...label}
                          onChange={() => toggleStatus(item._id)}
                          value={true}
                          checked={item.status}
                      />
                    </th>
                    <th className="border border-black px-2 py-3 ">
                      <div className="flex">

                        <div className="bg-green-600 p-2 rounded-md shadow-md text-white cursor-pointer "
                             onClick={() => handleEdit(item._id)}>
                          <FaEdit size={20}/>
                        </div>
                      </div>
                    </th>
                  </tr>
              );
            })}
          </table>
        </div>
      </TableBorder>
    </div>
  </div>
  return (
      <>
        {isLoading ? <Loader /> : local }
      </>
  );
}
