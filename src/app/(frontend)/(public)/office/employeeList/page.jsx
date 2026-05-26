"use client";
import Link from "next/link";
import Button from "src/components/button";
import { useRouter } from "next/navigation";
import TableBorder from "src/components/TableDesign";
import Switch from "@mui/material/Switch";
import Loader from "/src/components/Loader";
import { useEmployeeList, useUpdateEmployeeStatus } from "src/hooks/useOffice";
const label = { inputProps: { "aria-label": "Switch demo" } };
export default function ViewDonor() {
  const router = useRouter();
  const { data: employeeList = [], isLoading } = useEmployeeList();
  const { mutateAsync: toggleStatus } = useUpdateEmployeeStatus();

  const local = <div>
    <div className="mx-10">
      <TableBorder
          title={"Employee List"}
          title2={
            <div className="flex flex-col   ">
              <div className=" flex justify-end">
                <Link href={"/office/employee"}>
                  <Button>+Add </Button>
                </Link>
              </div>
            </div>
          }
      >
        <div className=" my-5">
          <table className="w-full">
            <tr className="bg-[#004a89] text-white text-lg text-center">
              <td className="py-3">S No.</td>
              <td className="py-3">Employee Name</td>
              <td className="py-3">Department Name</td>
              <td className="py-3">Post Name</td>
              <td className="py-3">Contact</td>
              <td className="py-3">Email</td>
              <td className="py-3">Status</td>
              <td className="py-3">Action</td>
            </tr>
            {employeeList?.map((item, index) => {
              return (
                  <tr
                      className=" border border-x-gray text-center"
                      key={index}
                  >

                    <td className="py-3">{index + 1}</td>
                    <td className="py-3">{item.employeeName}</td>

                            <td className="py-3" key={index}>
                              {item.departmentName}
                            </td>



                            <td className="py-3" key={index}>
                              {item.postName}
                            </td>

                    <td className="py-3">{item.employeePhone}</td>
                    <td className="py-3 text-sm px-2">
                      {item.employeeEmail}
                    </td>
                    <td className="py-3">
                      <Switch
                          {...label}
                          onChange={() => toggleStatus(item._id)}
                          checked={item.isActive}
                      />
                    </td>
                    <td className="py-3">
                      <button
                          className="text-white px-4 py-2 rounded-md shadow-md bg-indigo-600"
                          onClick={() =>
                              router.push(`/office/employee/${item._id}`)
                          }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
              );
            })}
          </table>
        </div>
      </TableBorder>
    </div>
  </div>;
  return (
      <>
        {
          isLoading ? <Loader /> : local
        }
      </>
  );
}
