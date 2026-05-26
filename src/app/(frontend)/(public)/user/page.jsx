"use client";
import { useRouter } from "next/navigation";
import TableBorder from "@/components/TableDesign";
import TableSkeleton from "src/components/TableSkeleton";
import { useAllUsers } from "src/hooks/useUser";

export default function ViewDonor() {
  const router = useRouter();
  const { data: employeeList = [], isLoading } = useAllUsers();

  return (
    <div className="mx-10">
      <TableBorder title={"User List"}>
        <div className="my-5">
          <table className="w-full">
            <thead>
              <tr className="bg-[#004a89] text-white text-lg text-center">
                <td className="py-3">S No.</td>
                <td className="py-3">Username</td>
                <td className="py-3">Email</td>
                <td className="py-3">Role</td>
                <td className="py-3">Contact</td>
                <td className="py-3">Manage Access</td>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <TableSkeleton rows={8} cols={6} />
              ) : (
                employeeList?.map((item, index) => (
                  <tr className="border border-x-gray text-center" key={index}>
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3">{item.username}</td>
                    <td className="py-3">{item.email}</td>
                    <td className="py-3 text-sm px-2">{item?.role}</td>
                    <td className="py-3 text-sm px-2">{item?.contactNo}</td>
                    <td>
                      <button className="bg-green-600 rounded-md shadow-md px-3 py-2 text-white" onClick={() => router.push(`/user/${item._id}`)}>
                        Manage Access
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
