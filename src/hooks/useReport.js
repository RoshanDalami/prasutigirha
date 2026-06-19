"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";
import { keys } from "src/lib/queryKeys";
import { getMotherMilkReport } from "src/services/apiService/report/reportServices";

async function getAllReports() {
  const response = await mainApi(
    apiUrls.report.getAllReports.method,
    apiUrls.report.getAllReports.url
  );
  return response;
}

async function getMilkDiscardReport() {
  const response = await mainApi(
    apiUrls.report.getMilkDiscardReport.method,
    apiUrls.report.getMilkDiscardReport.url
  );
  return response;
}

export function useAllReports() {
  return useQuery({
    queryKey: keys.report.all,
    queryFn: async () => {
      const { data } = await getAllReports();
      return data ?? [];
    },
  });
}

export function useMilkDiscardReport() {
  return useQuery({
    queryKey: keys.report.milkDiscard,
    queryFn: async () => {
      const { data } = await getMilkDiscardReport();
      return data ?? [];
    },
  });
}

async function getMilkDiscardDetailedReport() {
  const response = await mainApi(
    apiUrls.report.getMilkDiscardDetailedReport.method,
    apiUrls.report.getMilkDiscardDetailedReport.url
  );
  return response;
}

async function getMilkDiscardDetailedReportDateWise(startingDate, endingDate) {
  const response = await mainApi(
    apiUrls.report.getMilkDiscardDetailedReportDateWise.method,
    apiUrls.report.getMilkDiscardDetailedReportDateWise.url +
      `?startDate=${startingDate}&endDate=${endingDate}`
  );
  return response;
}

export function useMilkDiscardDetailedReport() {
  return useQuery({
    queryKey: keys.report.milkDiscardDetailed,
    queryFn: async () => {
      const { data } = await getMilkDiscardDetailedReport();
      return data ?? [];
    },
  });
}

export function useMilkDiscardDetailedReportDateWise({ startingDate, endingDate }) {
  return useQuery({
    queryKey: keys.report.milkDiscardDetailedDateWise(startingDate, endingDate),
    queryFn: async () => {
      const { data } = await getMilkDiscardDetailedReportDateWise(startingDate, endingDate);
      return data ?? [];
    },
    enabled: !!startingDate && !!endingDate,
  });
}

export function useMotherMilkReport({ donorId, startDate, endDate, motherStatus = "all" }) {
  return useQuery({
    queryKey: keys.report.motherMilk(donorId, startDate, endDate, motherStatus),
    queryFn: async () => {
      const { data } = await getMotherMilkReport(donorId, startDate, endDate, motherStatus);
      return data ?? {};
    },
    enabled: !!donorId && !!startDate && !!endDate,
    retry: false,
    placeholderData: keepPreviousData,
  });
}
