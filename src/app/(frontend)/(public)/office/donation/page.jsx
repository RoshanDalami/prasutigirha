"use client";
import React from "react";
import TableBorder from "src/components/TableDesign";
import Link from "next/link";
import Button from "src/components/button";
import { useRouter } from "next/navigation";
import TableSkeleton from "src/components/TableSkeleton";
import { useDonationList, useDeleteDonation } from "src/hooks/useOffice";

function DonationIndex() {
  const router = useRouter();
  const { data: apiData = [], isLoading } = useDonationList();
  const { mutateAsync: deleteDonation } = useDeleteDonation();

  return (
    <div className="mx-5">
      <TableBorder
        title={"Donation Place"}
        title2={
          <div className="flex flex-col">
            <div className="flex justify-end">
              <Link href={"/office/donation/createDonation"}>
                <Button>+Add</Button>
              </Link>
            </div>
          </div>
        }
      >
        <table className="w-full">
          <thead>
            <tr className="bg-[#004a89] text-white text-lg text-center">
              <th className="border border-black px-3 py-1">S.N</th>
              <th className="border border-black px-3 py-1">Name</th>
              <th className="border border-black px-3 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton rows={8} cols={3} />
            ) : (
              apiData?.map((item, index) => (
                <tr key={index}>
                  <td className="border border-black px-3 py-2">{index + 1}</td>
                  <td className="border border-black px-3 py-2">{item.name}</td>
                  <td className="border border-black px-3 py-2">
                    <div className="flex gap-3">
                      <button className="bg-green-600 px-4 py-2 rounded-md text-white" onClick={() => router.push(`/office/donation/createDonation/${item._id}`)}>
                        Edit
                      </button>
                      <button className="bg-red-600 px-4 py-2 rounded-md text-white" onClick={() => deleteDonation(item._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </TableBorder>
    </div>
  );
}

export default DonationIndex;
