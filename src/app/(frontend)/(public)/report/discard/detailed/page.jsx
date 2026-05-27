"use client";
import React, { useState } from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { BSToAD } from "bikram-sambat-js";
import ReportSkeleton from "src/components/ReportSkeleton";
import Link from "next/link";
import {
  useMilkDiscardDetailedReport,
  useMilkDiscardDetailedReportDateWise,
} from "src/hooks/useReport";

const POOLING_CONDITION = { 1: "Colostrum", 2: "Pre-term", 3: "Term" };

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-t border border-b-0 border-gray-300">
        {title}
      </h2>
      {children}
    </div>
  );
}

function EmptyRow({ cols }) {
  return (
    <tr>
      <td className="tableBorder text-center text-gray-400 py-4" colSpan={cols}>
        No Data Found !!!
      </td>
    </tr>
  );
}

function DiscardDetailedReportPage() {
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [appliedStart, setAppliedStart] = useState("");
  const [appliedEnd, setAppliedEnd] = useState("");

  const { data: baseData = {}, isLoading: isBaseLoading } =
    useMilkDiscardDetailedReport();

  const { data: dateWiseData = {}, isLoading: isDateWiseLoading } =
    useMilkDiscardDetailedReportDateWise({
      startingDate: appliedStart,
      endingDate: appliedEnd,
    });

  const isFiltered = !!appliedStart && !!appliedEnd;
  const reportData = isFiltered ? dateWiseData : baseData;
  const isLoading = isFiltered ? isDateWiseLoading : isBaseLoading;

  const handleSearch = () => {
    if (!startingDate || !endingDate) return;
    setAppliedStart(BSToAD(startingDate));
    setAppliedEnd(BSToAD(endingDate));
  };

  const handleReset = () => {
    setStartingDate("");
    setEndingDate("");
    setAppliedStart("");
    setAppliedEnd("");
  };

  const beforePast = reportData?.milkDiscardedBeforePasteurization ?? [];
  const afterPast = reportData?.milkDiscardedAfterPasteurization ?? [];
  const bottleDiscard = reportData?.bottleDiscardDetails ?? [];

  return (
    <div className="px-10 py-5">
      {/* Header */}
      <div className="py-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-red-600">
            Detailed Discard Report
          </h1>
          {isFiltered && (
            <p className="text-sm text-gray-500 mt-1">
              From: {appliedStart} &nbsp;|&nbsp; To: {appliedEnd}
            </p>
          )}
        </div>
        <Link
          href="/report/discard"
          className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 text-sm hover:bg-gray-300"
        >
          ← Back to Summary
        </Link>
      </div>

      {/* Date Filter */}
      <div className="flex items-center gap-5 mb-8">
        <div className="flex gap-3 items-center">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Starting Date
            </label>
            <NepaliDatePicker
              inputClassName="form-control focus:outline-none"
              value={startingDate}
              onChange={(e) => setStartingDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className="inputStyle"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Ending Date
            </label>
            <NepaliDatePicker
              inputClassName="form-control focus:outline-none"
              value={endingDate}
              onChange={(e) => setEndingDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className="inputStyle"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <button
            disabled={!startingDate || !endingDate}
            className="bg-blue-600 px-4 py-2 rounded-lg text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="bg-red-500 px-4 py-2 rounded-lg text-white"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      {isLoading ? (
        <ReportSkeleton rows={20} />
      ) : (
        <div className="printMargin">
          {/* Section 1 — Before Pasteurization */}
          <Section title="Milk Discarded Before Pasteurization">
            <table className="w-full border border-gray-300 border-collapse">
              <thead className="bg-red-50">
                <tr>
                  <th className="tableBorder text-center w-10">S.N.</th>
                  <th className="tableBorder">Donor Name</th>
                  <th className="tableBorder">Collection Date (BS)</th>
                  <th className="tableBorder">Collection Date (AD)</th>
                  <th className="tableBorder">Collection Time</th>
                  <th className="tableBorder">Quantity (ml)</th>
                  <th className="tableBorder">Stored By</th>
                  <th className="tableBorder">Discard Remark</th>
                  <th className="tableBorder">Discarded At</th>
                </tr>
              </thead>
              <tbody>
                {beforePast.length > 0 ? (
                  beforePast.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="tableBorder text-center">{i + 1}</td>
                      <td className="tableBorder">{item.donorName ?? "-"}</td>
                      <td className="tableBorder">{item.nepaliDate ?? "-"}</td>
                      <td className="tableBorder">{item.engDate ?? "-"}</td>
                      <td className="tableBorder text-center">
                        {item.collectionTime ?? "-"}
                      </td>
                      <td className="tableBorder text-center">
                        {item.quantity ?? "-"}
                      </td>
                      <td className="tableBorder">{item.storedBy ?? "-"}</td>
                      <td className="tableBorder">{item.discardRemark ?? "-"}</td>
                      <td className="tableBorder text-center">
                        {item.discardedAt
                          ? new Date(item.discardedAt).toLocaleDateString(
                              "en-GB"
                            )
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <EmptyRow cols={9} />
                )}
              </tbody>
              {beforePast.length > 0 && (
                <tfoot className="bg-gray-50 font-semibold">
                  <tr>
                    <td className="tableBorder text-right" colSpan={5}>
                      Total
                    </td>
                    <td className="tableBorder text-center">
                      {beforePast.reduce((s, r) => s + (r.quantity ?? 0), 0)} ml
                    </td>
                    <td className="tableBorder" colSpan={3}></td>
                  </tr>
                </tfoot>
              )}
            </table>
          </Section>

          {/* Section 2 — After Pasteurization */}
          <Section title="Milk Discarded After Pasteurization">
            <table className="w-full border border-gray-300 border-collapse">
              <thead className="bg-orange-50">
                <tr>
                  <th className="tableBorder text-center w-10">S.N.</th>
                  <th className="tableBorder">Batch Name</th>
                  <th className="tableBorder">Condition</th>
                  <th className="tableBorder">Pasteurization Date (BS)</th>
                  <th className="tableBorder">Pasteurization Date (AD)</th>
                  <th className="tableBorder">Expire Date (BS)</th>
                  <th className="tableBorder">Volume (ml)</th>
                  <th className="tableBorder">Culture Result</th>
                  <th className="tableBorder">Discard Remark</th>
                  <th className="tableBorder">Discarded At</th>
                </tr>
              </thead>
              <tbody>
                {afterPast.length > 0 ? (
                  afterPast.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="tableBorder text-center">{i + 1}</td>
                      <td className="tableBorder font-medium">
                        {item.batchName ?? "-"}
                      </td>
                      <td className="tableBorder">
                        {POOLING_CONDITION[item.poolingCondition] ?? "-"}
                      </td>
                      <td className="tableBorder">{item.nepaliDate ?? "-"}</td>
                      <td className="tableBorder">{item.engDate ?? "-"}</td>
                      <td className="tableBorder">{item.expireDate ?? "-"}</td>
                      <td className="tableBorder text-center">
                        {item.collectedVolume ?? "-"}
                      </td>
                      <td className="tableBorder text-center">
                        {item.cultureResult === null ||
                        item.cultureResult === undefined ? (
                          <span className="text-gray-400">N/A</span>
                        ) : item.cultureResult ? (
                          <span className="text-red-600 font-semibold">
                            Positive
                          </span>
                        ) : (
                          <span className="text-green-600 font-semibold">
                            Negative
                          </span>
                        )}
                      </td>
                      <td className="tableBorder">
                        {item.discardRemarks ?? "-"}
                      </td>
                      <td className="tableBorder text-center">
                        {item.discardedAt
                          ? new Date(item.discardedAt).toLocaleDateString(
                              "en-GB"
                            )
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <EmptyRow cols={10} />
                )}
              </tbody>
              {afterPast.length > 0 && (
                <tfoot className="bg-gray-50 font-semibold">
                  <tr>
                    <td className="tableBorder text-right" colSpan={6}>
                      Total
                    </td>
                    <td className="tableBorder text-center">
                      {afterPast.reduce(
                        (s, r) => s + (r.collectedVolume ?? 0),
                        0
                      )}{" "}
                      ml
                    </td>
                    <td className="tableBorder" colSpan={3}></td>
                  </tr>
                </tfoot>
              )}
            </table>
          </Section>

          {/* Section 3 — Bottle Discard */}
          <Section title="Discarded Bottles">
            <table className="w-full border border-gray-300 border-collapse">
              <thead className="bg-yellow-50">
                <tr>
                  <th className="tableBorder text-center w-10">S.N.</th>
                  <th className="tableBorder">Bottle Name</th>
                  <th className="tableBorder">Condition</th>
                  <th className="tableBorder">Batch Date (BS)</th>
                  <th className="tableBorder">Expire Date (BS)</th>
                  <th className="tableBorder">Volume (ml)</th>
                  <th className="tableBorder">Discard Remark</th>
                  <th className="tableBorder">Discarded At</th>
                </tr>
              </thead>
              <tbody>
                {bottleDiscard.length > 0 ? (
                  bottleDiscard.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="tableBorder text-center">{i + 1}</td>
                      <td className="tableBorder font-medium">
                        {item.bottleName ?? "-"}
                      </td>
                      <td className="tableBorder">
                        {POOLING_CONDITION[item.poolingCondition] ?? "-"}
                      </td>
                      <td className="tableBorder">{item.nepaliDate ?? "-"}</td>
                      <td className="tableBorder">{item.expireDate ?? "-"}</td>
                      <td className="tableBorder text-center">
                        {item.volume ?? "-"}
                      </td>
                      <td className="tableBorder">
                        {item.discardRemark ?? "-"}
                      </td>
                      <td className="tableBorder text-center">
                        {item.discardedAt
                          ? new Date(item.discardedAt).toLocaleDateString(
                              "en-GB"
                            )
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <EmptyRow cols={8} />
                )}
              </tbody>
              {bottleDiscard.length > 0 && (
                <tfoot className="bg-gray-50 font-semibold">
                  <tr>
                    <td className="tableBorder text-right" colSpan={5}>
                      Total
                    </td>
                    <td className="tableBorder text-center">
                      {bottleDiscard.reduce(
                        (s, r) => s + (r.volume ?? 0),
                        0
                      )}{" "}
                      ml
                    </td>
                    <td className="tableBorder" colSpan={2}></td>
                  </tr>
                </tfoot>
              )}
            </table>
          </Section>
        </div>
      )}
    </div>
  );
}

export default DiscardDetailedReportPage;
