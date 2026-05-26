"use client";
import { useQuery } from "@tanstack/react-query";
import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";
import { keys } from "src/lib/queryKeys";

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
