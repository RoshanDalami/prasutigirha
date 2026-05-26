"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { urls } from "src/services/apiHelpers";
import { getGestationalTwo, getBabyOutCome } from "src/services/apiService/dropdown/dropdownservices";
import { keys } from "src/lib/queryKeys";

export function useGestational() {
  return useQuery({
    queryKey: keys.dropdown.gestational,
    queryFn: async () => {
      const { data } = await axios.get(urls.getGestational);
      return data?.data ?? [];
    },
  });
}

export function useGestationalTwo() {
  return useQuery({
    queryKey: keys.dropdown.gestationalTwo,
    queryFn: async () => {
      const response = await getGestationalTwo();
      return response?.data ?? [];
    },
  });
}

export function useParity() {
  return useQuery({
    queryKey: keys.dropdown.parity,
    queryFn: async () => {
      const { data } = await axios.get(urls.getParity);
      return data?.data ?? [];
    },
  });
}

export function useDelivery() {
  return useQuery({
    queryKey: keys.dropdown.delivery,
    queryFn: async () => {
      const { data } = await axios.get(urls.getDelivery);
      return data?.data ?? [];
    },
  });
}

export function useBabyOutcome() {
  return useQuery({
    queryKey: keys.dropdown.babyOutcome,
    queryFn: async () => {
      const response = await getBabyOutCome();
      return response?.data ?? [];
    },
  });
}
