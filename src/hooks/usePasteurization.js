"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPooling,
  getPoolingById,
  createPooling,
  deletePooling,
  getColostrum,
  getCondition,
  getConditionById,
  getDonorByGestationalAge,
  updateCulture,
  updateOther,
  Discard,
} from "src/services/apiService/pasteurization/pasteurization";
import { keys } from "src/lib/queryKeys";

export function usePasteurizationList(page, limit) {
  return useQuery({
    queryKey: [...keys.pasteurization.list, page, limit],
    queryFn: async () => {
      const { data } = await getPooling(page, limit);
      return data ?? {};
    },
  });
}

export function usePasteurizationById(id) {
  return useQuery({
    queryKey: keys.pasteurization.byId(id),
    queryFn: async () => {
      const { data } = await getPoolingById(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useColostrum() {
  return useQuery({
    queryKey: keys.pasteurization.colostrum,
    queryFn: async () => {
      const { data } = await getColostrum();
      return data ?? [];
    },
  });
}

export function useCondition() {
  return useQuery({
    queryKey: keys.pasteurization.condition,
    queryFn: async () => {
      const { data } = await getCondition();
      return data ?? [];
    },
  });
}

export function useConditionById(id) {
  return useQuery({
    queryKey: keys.pasteurization.conditionById(id),
    queryFn: async () => {
      const { data } = await getConditionById(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useDonorByGestationalAge(id) {
  return useQuery({
    queryKey: keys.pasteurization.donorByGestational(id),
    queryFn: async () => {
      const { data } = await getDonorByGestationalAge(id);
      return data ?? [];
    },
    enabled: !!id,
  });
}

export function useDiscardPasteurization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, remarks }) => Discard(id, remarks),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.pasteurization.all });
    },
  });
}

export function useDeletePooling() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePooling(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.pasteurization.all });
    },
  });
}

export function useUpdateCulture() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateCulture(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.pasteurization.all });
    },
  });
}

export function useUpdateOther() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateOther(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.pasteurization.all });
    },
  });
}
