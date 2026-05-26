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

export function useBabyList(page, limit) {
  return useQuery({
    queryKey: [...keys.baby.list, page, limit],
    queryFn: async () => {
      const { data } = await getBabyDetail(page, limit);
      return data ?? {};
    },
  });
}

export function useInactiveBabyList(page, limit) {
  return useQuery({
    queryKey: [...keys.baby.inactive, page, limit],
    queryFn: async () => {
      const { data } = await getInactiveBaby(page, limit);
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
