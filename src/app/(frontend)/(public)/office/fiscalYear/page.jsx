"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { urls } from "src/services/apiHelpers";
import Link from "next/link";
import Button from "src/components/button";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function ViewDonor() {
  const TableBorder = dynamic(() => import("@/components/TableDesign"), {
    ssr: false,
  });
  const router = useRouter();

  return (
    <>
      <div>
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
                  <td className="py-3">S No.</td>
                  <td className="py-3">Fiscal Year</td>

                  {/* <td className="py-3">Email</td>
                  <td className="py-3">Contact</td> */}
                </tr>
              </table>
            </div>
          </TableBorder>
        </div>
      </div>
    </>
  );
}
