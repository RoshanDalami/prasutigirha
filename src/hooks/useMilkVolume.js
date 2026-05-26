"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getVolumeOfMilk,
  getDonorWithTotalVolume,
  getMilkListByDonor,
  getCollectedMilkListForDonor,
  deleteMilkById,
  discardMilkBeforePasturization,
} from "src/services/apiService/milkVolume/milkVolume";
import { keys } from "src/lib/queryKeys";

export function useMilkVolumeList(page, limit) {
  return useQuery({
    queryKey: [...keys.milkVolume.list, page, limit],
    queryFn: async () => {
      const { data } = await getVolumeOfMilk(page, limit);
      return data ?? {};
    },
  });
}

export function useDonorWithTotalVolume() {
  return useQuery({
    queryKey: keys.milkVolume.donorWithTotal,
    queryFn: async () => {
      const { data } = await getDonorWithTotalVolume();
      return data ?? [];
    },
  });
}

export function useMilkListByDonor(id) {
  return useQuery({
    queryKey: keys.milkVolume.milkList(id),
    queryFn: async () => {
      const { data } = await getMilkListByDonor(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useCollectedMilkForDonor(donorId, enabled = true) {
  return useQuery({
    queryKey: keys.milkVolume.collectedForDonor(donorId),
    queryFn: async () => {
      const response = await getCollectedMilkListForDonor(donorId);
      return response?.data;
    },
    enabled: !!donorId && enabled,
  });
}

export function useDeleteMilk() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteMilkById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.milkVolume.all });
    },
  });
}

export function useDiscardMilkBeforePasteurization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ collectionId, remark }) =>
      discardMilkBeforePasturization(collectionId, remark),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.milkVolume.all });
    },
  });
}
