"use client";
import Link from "next/link";
import Button from "src/components/button";
import { useRouter } from "next/navigation";
import TableBorder from "src/components/TableDesign";
import TableSkeleton from "src/components/TableSkeleton";
import { useDepartmentList } from "src/hooks/useOffice";

export default function ViewDonor() {
  const router = useRouter();
  const { data: departmentList = [], isLoading } = useDepartmentList();

  return (
    <div className="mx-10">
      <TableBorder
        title={"Department List"}
        title2={
          <div className="flex flex-col">
            <div className="flex justify-end">
              <Link href={"/office/department"}>
                <Button>+Add</Button>
              </Link>
            </div>
          </div>
        }
      >
        <div className="my-5">
          <table className="w-full">
            <thead>
              <tr className="bg-[#004a89] text-white text-lg text-center">
                <td className="py-3">S No.</td>
                <td className="py-3">Department Name</td>
                <td className="py-3">Action</td>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <TableSkeleton rows={8} cols={3} />
              ) : (
                departmentList?.map((item, index) => (
                  <tr className="border border-x-gray text-center" key={index}>
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3">{item.departmentName}</td>
                    <td className="py-3">
                      <button className="bg-indigo-600 px-4 py-2 rounded-md shadow-md text-white" onClick={() => router.push(`/office/department/${item._id}`)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </TableBorder>
    </div>
  );
}
