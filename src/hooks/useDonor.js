"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDonor,
  getInActiveDonor,
  getDiscardedDonor,
  updateDonorStatus,
  getDonorOtherTest,
  discard,
  donorByGestationalAge,
  regList,
  updateSerology,
  getAllDonorListForSelect,
} from "src/services/apiService/donorRecord/donor";
import { getMilkByDonorId } from "src/services/apiService/milkVolume/milkVolume";
import { keys } from "src/lib/queryKeys";

export function useDonorList(page, limit, enabled = true, startDate = "", endDate = "", includeAll = false) {
  return useQuery({
    queryKey: [...keys.donor.list(page, limit), startDate, endDate, includeAll],
    enabled,
    queryFn: async () => {
      const { data } = await getDonor(page, limit, startDate, endDate, includeAll);
      return data;
    },
  });
}

export function useInactiveDonors(enabled = true, startDate = "", endDate = "") {
  return useQuery({
    queryKey: [...keys.donor.inactive, startDate, endDate],
    enabled,
    queryFn: async () => {
      const { data } = await getInActiveDonor(startDate, endDate);
      return data ?? [];
    },
  });
}

export function useDiscardedDonors(enabled = true, startDate = "", endDate = "") {
  return useQuery({
    queryKey: [...keys.donor.discarded, startDate, endDate],
    enabled,
    queryFn: async () => {
      const { data } = await getDiscardedDonor(startDate, endDate);
      return data ?? [];
    },
  });
}

export function useDonorOtherTest(id) {
  return useQuery({
    queryKey: keys.donor.otherTest(id),
    queryFn: async () => {
      const { data } = await getDonorOtherTest(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useDonorMilkVolume(id) {
  return useQuery({
    queryKey: keys.milkVolume.byDonor(id),
    queryFn: async () => {
      const { data } = await getMilkByDonorId(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useAllDonorsForSelect(status = "active") {
  return useQuery({
    queryKey: ["donor", "selectList", status],
    queryFn: async () => {
      const response = await getAllDonorListForSelect(status);
      return response?.data ?? [];
    },
  });
}

export function useUpdateDonorStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => updateDonorStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donor"] });
    },
  });
}

export function useDiscardDonor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => discard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donor"] });
    },
  });
}

export function useUpdateSerology() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateSerology(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donor"] });
    },
  });
}
