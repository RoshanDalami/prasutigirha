"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllUser,
  getOneUser,
  GetAllModule,
  giveAccess,
} from "src/services/apiService/officeService/office";
import { keys } from "src/lib/queryKeys";

export function useAllUsers() {
  return useQuery({
    queryKey: keys.user.all,
    queryFn: async () => {
      const { data } = await getAllUser();
      return data ?? [];
    },
  });
}

export function useOneUser(id) {
  return useQuery({
    queryKey: keys.user.byId(id),
    queryFn: async () => {
      const { data } = await getOneUser(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useAllModules() {
  return useQuery({
    queryKey: keys.user.modules,
    queryFn: async () => {
      const { data } = await GetAllModule();
      return data ?? [];
    },
  });
}

export function useGiveAccess() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => giveAccess(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: keys.user.all });
    },
  });
}
