"use client";
import React, { useState } from "react";
import { discard } from "../../../../../../../../services/apiService/donorRecord/donor";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import "nepali-datepicker-reactjs/dist/index.css";
import { useDonorOtherTest } from "src/hooks/useDonor";

const aa = new BikramSambat(new Date()).toBS();
const FormBorder = dynamic(() => import("src/components/reusableForm"), { ssr: false });

export default function TestView() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(aa);

  const { data: apiData = [] } = useDonorOtherTest(id);

  const handleDiscard = async () => {
    setIsLoading(true);
    const response = await discard({ id, discardDate: date });
    if (response?.status === 200) {
      setIsLoading(false);
      router.push("/donorRecord/viewDonorRecord");
    }
  };

  return (
    <div className="mx-6">
      <FormBorder title={"Other Tests"}>
        <table className="border-collapse w-full">
          <tr>
            <th className="border border-black px-3 py-4">Test Date</th>
            <th className="border border-black px-3 py-4">Test Name</th>
            <th className="border border-black px-3 py-4">Test Result</th>
          </tr>
          {apiData?.length > 0 ? (
            apiData?.map((item, index) => (
              <tr key={index}>
                <td className="border border-black px-3 py-4">{item?.testDate}</td>
                <td className="border border-black px-3 py-4">{item?.testName}</td>
                <td className="border border-black px-3 py-4">
                  {item?.testResult ? <p>Positive</p> : <p>Negative</p>}
                </td>
              </tr>
            ))
          ) : (
            <div>
              <p className="text-3xl text-center">No Other Test Available</p>
            </div>
          )}
        </table>
        {apiData?.length > 0 && (
          <div className="flex items-center gap-3 justify-end my-3">
            <div className="flex flex-col">
              <label htmlFor="">Discard Date<span className="text-red-600">*</span></label>
              <NepaliDatePicker
                inputClassName="form-control focus:outline-none"
                value={date}
                onChange={(e) => setDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
            <button
              className="bg-red-600 h-10 rounded-md shadow-md text-white px-4 py-2 mt-4"
              onClick={handleDiscard}
            >
              {isLoading ? "Discarding..." : "Discard"}
            </button>
          </div>
        )}
      </FormBorder>
    </div>
  );
}
