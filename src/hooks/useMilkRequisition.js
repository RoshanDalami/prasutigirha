"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMilkRequsition,
  getMilkRequsitionById,
  createMilkRequistion,
  deleteMilkRequsition,
} from "src/services/apiService/milkRequistion/requistionService";
import { keys } from "src/lib/queryKeys";

export function useMilkRequisitionList(page, limit) {
  return useQuery({
    queryKey: [...keys.milkRequisition.list, page, limit],
    queryFn: async () => {
      const { data } = await getMilkRequsition(page, limit);
      return data ?? {};
    },
  });
}

export function useRequisitionById(id) {
  return useQuery({
    queryKey: keys.milkRequisition.byId(id),
    queryFn: async () => {
      const { data } = await getMilkRequsitionById(id);
      return data ?? {};
    },
    enabled: !!id,
  });
}

export function useDeleteMilkRequisition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteMilkRequsition(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.milkRequisition.all });
    },
  });
}
