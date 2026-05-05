"use client";
import React, { useState, useEffect } from "react";
import {
  getDonorOtherTest,
  discard,
} from "../../../../../../../../services/apiService/donorRecord/donor";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import "nepali-datepicker-reactjs/dist/index.css";
const aa = new BikramSambat(new Date()).toBS();
export default function TestView() {
  const FormBorder = dynamic(() => import("src/components/reusableForm"), {
    ssr: false,
  });
  const router = useRouter();
  const { id } = useParams();
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(aa);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getDonorOtherTest(id);
      setApiData(response?.data);
    };
    fetchData();
  }, [id]);

  const handleDiscard = async () => {
    setIsLoading(true);
    const data = {id:id,discardDate:date}
    const response = await discard(data);
    if (response?.status === 200) {
      setIsLoading(false);
      router.push("/donorRecord/viewDonorRecord");
    }
  };

  return (
    <div className="mx-6">
      <FormBorder title={"Other Tests"}>
        <table className=" border-collapse w-full">
          <tr>
            <th className="border border-black px-3 py-4">Test Date</th>
            <th className="border border-black px-3 py-4">Test Name</th>
            <th className="border border-black px-3 py-4">Test Result</th>
          </tr>

          {apiData?.length > 0 ? (
            apiData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="border border-black px-3 py-4">
                    {item?.testDate}
                  </td>
                  <td className="border border-black px-3 py-4">
                    {item?.testName}
                  </td>
                  <td className="border border-black px-3 py-4">
                    {item?.testResult ? <p>Positive</p> : <p>Negative</p>}
                  </td>
                </tr>
              );
            })
          ) : (
            <div>
              <p className="text-3xl text-center">No Other Test Available</p>
            </div>
          )}
        </table>

        {apiData?.length > 0 && (
          <div className="flex items-center gap-3 justify-end my-3">
           
            <div className="flex flex-col">
              <label htmlFor="">
               Discard Date<span className="text-red-600">*</span>
              </label>

              <NepaliDatePicker
                inputClassName="form-control  focus:outline-none"
                value={date}
                onChange={(e) => setDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
            <button
              className="bg-red-600 h-10 rounded-md shadow-md text-white px-4 py-2 mt-4 "
              onClick={() => handleDiscard()}
            >
              {isLoading ? "Discarding..." : "Discard"}
            </button>
            
          </div>
        )}
      </FormBorder>
    </div>
  );
}
