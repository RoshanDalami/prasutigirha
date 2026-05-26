"use client";
import { useQuery } from "@tanstack/react-query";
import {
  getAllRecords,
  getDonorNumberMonthly,
  getMonthWiseMilkCollection,
  getMonthWiseMilkRequsition,
} from "src/services/apiService/dashboard/dashboardService";
import { keys } from "src/lib/queryKeys";

export function useAllRecords() {
  return useQuery({
    queryKey: keys.dashboard.allRecords,
    queryFn: async () => {
      const { data } = await getAllRecords();
      return data ?? [];
    },
  });
}

export function useDonorNumberMonthly() {
  return useQuery({
    queryKey: keys.dashboard.donorNumberMonthly,
    queryFn: async () => {
      const response = await getDonorNumberMonthly();
      return response?.data ?? [];
    },
  });
}

export function useMilkCollectionMonthly() {
  return useQuery({
    queryKey: keys.dashboard.milkCollectionMonthly,
    queryFn: async () => {
      const { data } = await getMonthWiseMilkCollection();
      return data ?? [];
    },
  });
}

export function useMilkRequisitionMonthly() {
  return useQuery({
    queryKey: keys.dashboard.milkRequisitionMonthly,
    queryFn: async () => {
      const { data } = await getMonthWiseMilkRequsition();
      return data ?? [];
    },
  });
}
