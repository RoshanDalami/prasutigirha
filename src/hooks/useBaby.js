"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBabyDetail,
  getBabyById,
  createBaby,
  updateBabyStatus,
  getInactiveBaby,
  ipList,
  updateBabyOutcome,
} from "src/services/apiService/baby/babyServices";
import { keys } from "src/lib/queryKeys";

export function useBabyList(page, limit, q, startDate = "", endDate = "") {
  return useQuery({
    queryKey: [...keys.baby.list, page, limit, q, startDate, endDate],
    queryFn: async () => {
      const { data } = await getBabyDetail(page, limit, q, startDate, endDate);
      return data ?? {};
    },
  });
}

export function useInactiveBabyList(page, limit, startDate = "", endDate = "", includeAll = false) {
  return useQuery({
    queryKey: [...keys.baby.inactive, page, limit, startDate, endDate, includeAll],
    queryFn: async () => {
      const { data } = await getInactiveBaby(page, limit, startDate, endDate, includeAll);
      return data ?? {};
    },
  });
}

export function useBabyById(id) {
  return useQuery({
    queryKey: keys.baby.byId(id),
    queryFn: async () => {
      const { data } = await getBabyById(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useIpList() {
  return useQuery({
    queryKey: keys.baby.ipList,
    queryFn: async () => {
      const { data } = await ipList();
      return data ?? [];
    },
  });
}

export function useUpdateBabyStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => updateBabyStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.baby.all });
    },
  });
}

export function useUpdateBabyOutcome() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateBabyOutcome(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.baby.all });
    },
  });
}
