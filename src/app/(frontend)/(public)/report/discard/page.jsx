"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  GetMilkDiscardReport,
  GetMilkDiscardReportDateWise,
} from "../../../../../services/apiService/report/reportServices";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { BSToAD } from "bikram-sambat-js";
import Loader from "src/components/Loader";
import toast from "react-hot-toast";
const aa = new BikramSambat(new Date()).toBS();

function DiscardReportPage() {
  const [reportData, setReportData] = useState({});
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isReseting, setIsReseting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await GetMilkDiscardReport();
        if (response.status === 200) {
          setReportData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    setIsSearchLoading(true);
    try {
      const data = {
        startingDate: BSToAD(startingDate),
        endingDate: BSToAD(endingDate),
      };
      const response = await GetMilkDiscardReportDateWise(data);
      console.log(response, "data");
      if (response.status === 200) {
        setReportData(response.data);
        setIsSearchLoading(false);
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(error.message);
      setIsSearchLoading(false);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleReset = async () => {
    setIsReseting(true);
    try {
      const response = await GetMilkDiscardReport();
      if (response.status === 200) {
        setReportData(response.data);
        setIsReseting(false);
      }
    } catch (error) {
      setIsReseting(false);
      toast.error(error.message);
    } finally {
      setIsReseting(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className={"px-10 py-5"}>
      <div className="py-5">
        <h1 className="text-3xl font-bold text-red-600">Discard Report </h1>
      </div>
      <div className={"flex items-center gap-5"}>
        <div className={"flex  gap-3 items-center"}>
          <div className={"flex flex-col gap-2"}>
            <label htmlFor="">Starting Date</label>
            <NepaliDatePicker
              inputClassName="form-control  focus:outline-none"
              value={startingDate}
              onChange={(e) => setStartingDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className="inputStyle"
            />
          </div>
          <div className={"flex flex-col gap-2"}>
            <label htmlFor=""> Ending Date</label>
            <NepaliDatePicker
              inputClassName="form-control  focus:outline-none"
              value={endingDate}
              onChange={(e) => setEndingDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className="inputStyle"
            />
          </div>
        </div>
        <div className={" flex items-center gap-3 mt-8"}>
          <button
            disabled={isSearchLoading}
            className={
              "bg-blue-600 px-4 py-2 rounded-lg text-white" +
              " disabled:bg-gray-300 disabled:cursor-not-allowed"
            }
            onClick={() => handleSearch()}
          >
            {isSearchLoading ? "searching ..." : "Search"}
          </button>
          <button
            className={
              "bg-red-600 px-4 py-2 rounded-lg text-white disabled:bg-gray-300" +
              " disabled:cursor-not-allowed"
            }
            onClick={() => handleReset()}
            disabled={isReseting}
          >
            {isReseting ? "resetting ..." : "Reset"}
          </button>
        </div>
      </div>

      <div className={"printMargin p-10 page-break"}>
        <table className={"w-full  print:px-10 print:py-5 "}>
          <tr>
            <th className={"tableBorder"}>Description</th>
            <th className={"tableBorder"}> ML</th>
          </tr>
          <tbody>
            <tr>
              <td className={"tableBorder text-center font-bold"} colSpan={2}>
                Discard Before Pasteurization
              </td>
            </tr>
            {reportData?.milkDiscardBeforePastrizution?.length > 0 ? (
              reportData?.milkDiscardBeforePastrizution?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="tableBorder">{item.discardRemark}</td>
                    <td className="tableBorder">
                      {item.milkDiscardedBeforePasturization} ml
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  className="text-gray-500 tableBorder text-center"
                  colSpan={2}
                >
                  No Data Found !!!
                </td>
              </tr>
            )}
            <tr>
              <td className={"tableBorder text-center font-bold"} colSpan={2}>
                Discard After Pasteurization
              </td>
            </tr>
            {reportData?.milkDiscardAfterPastrizution?.length > 0 ? (
              reportData?.milkDiscardAfterPastrizution?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="tableBorder">{item.discardRemark}</td>
                    <td className="tableBorder">
                      {item.milkDiscardedAfterPasturizationWithoutCulture} ml
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  className="text-gray-500 tableBorder text-center"
                  colSpan={2}
                >
                  No Data Found !!!
                </td>
              </tr>
            )}
            <tr>
              <td className={"tableBorder text-center font-bold"} colSpan={2}>
                Discard After Pasteurization and Culture
              </td>
            </tr>
            {reportData?.milkDiscardAfterPastrizutionWithCulture?.length > 0 ? (
              reportData?.milkDiscardAfterPastrizutionWithCulture?.map(
                (item, index) => {
                  return (
                    <tr key={index}>
                      <td className="tableBorder">{item.discardRemark}</td>
                      <td className="tableBorder">
                        {item.milkDiscardAfterCulture} ml
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td
                  className="text-gray-500 tableBorder text-center"
                  colSpan={2}
                >
                  No Data Found !!!
                </td>
              </tr>
            )}
            <tr>
              <td className={"tableBorder text-center font-bold"} colSpan={2}>
                Discarded Bottle Reason Wise
              </td>
            </tr>
            {reportData?.bottleDiscardWithReason?.length > 0 ? (
              reportData?.bottleDiscardWithReason?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="tableBorder">
                      {item.reason === null || item.reason == "undefined"
                        ? "Before Reason  "
                        : item.reason}
                    </td>
                    <td className="tableBorder">{item.volume} ml</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  className="text-gray-500 tableBorder text-center"
                  colSpan={2}
                >
                  No Data Found !!!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DiscardReportPage;
