"use client";
import React from "react";
import TableBorder from "src/components/TableDesign";
import Link from "next/link";
import Button from "src/components/button";
import { useRouter } from "next/navigation";
import TableSkeleton from "src/components/TableSkeleton";
import { usePostList } from "src/hooks/useOffice";

export default function Post() {
  const router = useRouter();
  const { data: apiData = [], isLoading } = usePostList();

  return (
    <div className="mx-6">
      <TableBorder
        title={"Post"}
        title2={
          <div className="flex flex-col">
            <div className="flex justify-end">
              <Link href={"/office/postList/createPost"}>
                <Button>+Add</Button>
              </Link>
            </div>
          </div>
        }
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#004a89] text-white text-lg text-center">
              <th className="border border-black px-3 py-4">Post</th>
              <th className="border border-black px-3 py-4">Department</th>
              <th className="border border-black px-3 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton rows={8} cols={3} />
            ) : (
              apiData?.map((item, index) => (
                <tr key={index}>
                  <td className="border border-black px-3 py-2 text-lg">{item.postName}</td>
                  <td className="border border-black px-3 py-2 text-lg">{item.departmentName}</td>
                  <td className="border border-black px-3 py-2 text-lg">
                    <button className="text-white px-4 py-2 rounded-md shadow-md bg-indigo-600" onClick={() => router.push(`/office/postList/createPost/${item._id}`)}>
                      Edit
                    </button>
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
