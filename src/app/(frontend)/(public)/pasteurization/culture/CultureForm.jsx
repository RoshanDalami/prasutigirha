"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getPooling } from "src/services/apiService/pasteurization/pasteurization";
import FormBorder from "src/components/reusableForm";
export default function CultureForm() {
  const [poolingList, setPoolingList] = useState([]);
  useEffect(() => {
    async function getPoolingList() {
      const { data, status } = await getPooling();
      if (status === 200) {
        setPoolingList(data);
      }
    }
    getPoolingList();
  }, []);
  return (
    <div className="px-6">
      <FormBorder title={'Culture'} >
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold">
            Paropakar Maternity and Women&apos;s Hospital
          </h1>
          <h1 className="text-xl font-bold">Department of Pediatrics</h1>
          <h1 className="text-xl">
            Comprehensive Lactation Management Center (CLMC)
          </h1>
          <h1>Thapathali, Kathmandu</h1>
          <h1 className="font-bold text-md underline">
            Pre-pasteurization Culture / Post-pasteurization Culture
          </h1>
        </div>
        <div className="mt-4" >
          <table className=" w-full border-collapse">
            <tr className="bg-[#004a89] text-lg text-white">
              <th className="border border-black">S.N</th>
              <th className="border border-black">Pooling Batch</th>
              <th className="border border-black">Date of Pasteurization</th>
              <th className="border border-black">Culture Report</th>
            </tr>
            {poolingList?.map((item, index) => {
                if(item.culture != null){
                    return (
                      <tr key={index} className={`${item.culture ? 'bg-rose-600/50':'bg-lime-600/50'}`} >
                        <td className="border border-black font-bold px-2 py-3 ">
                          {index + 1}
                        </td>
                        <td className="border border-black font-bold px-2 py-3 ">
                          <Link
                            href={`/pasteurization/pasteurizationList/${item._id}`}
                          >
                            {item.batchName}
                          </Link>
                        </td>
                        <td className="border border-black font-bold px-2 py-3 ">
                          {item.date}
                        </td>
                        <td className="border border-black font-bold px-2 py-3 ">
                          {item.culture ? "Positive (Discard) " : "Negative (Despense) "}
                        </td>
                      </tr>
                    );
                }
            })}
          </table>
        </div>
      </FormBorder>
    </div>
  );
}
