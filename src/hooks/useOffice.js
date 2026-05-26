"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOffice,
  getDepartment,
  GetDepartmentById,
  getPost,
  GetPostById,
  getEmployee,
  GetEmployeeById,
  getFiscalYear,
  getFiscalYearById,
  getState,
  getDistrict,
  getPalika,
  employeeStatus,
  updateFiscalYearStatus,
  GetDonation,
  GetDonationById,
  DeleteDonation,
  getAllUser,
  getOneUser,
  GetAllModule,
} from "src/services/apiService/officeService/office";
import { keys } from "src/lib/queryKeys";

export function useOfficeList() {
  return useQuery({
    queryKey: keys.office.list,
    queryFn: async () => {
      const { data } = await getOffice();
      return data ?? [];
    },
  });
}

export function useDepartmentList() {
  return useQuery({
    queryKey: keys.office.department,
    queryFn: async () => {
      const { data } = await getDepartment();
      return data ?? [];
    },
  });
}

export function useDepartmentById(id) {
  return useQuery({
    queryKey: keys.office.departmentById(id),
    queryFn: async () => {
      const { data } = await GetDepartmentById(id);
      return data;
    },
    enabled: !!id,
  });
}

export function usePostList() {
  return useQuery({
    queryKey: keys.office.post,
    queryFn: async () => {
      const { data } = await getPost();
      return data ?? [];
    },
  });
}

export function usePostById(id) {
  return useQuery({
    queryKey: keys.office.postById(id),
    queryFn: async () => {
      const { data } = await GetPostById(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useEmployeeList() {
  return useQuery({
    queryKey: keys.office.employee,
    queryFn: async () => {
      const { data } = await getEmployee();
      return data ?? [];
    },
  });
}

export function useEmployeeById(id) {
  return useQuery({
    queryKey: keys.office.employeeById(id),
    queryFn: async () => {
      const { data } = await GetEmployeeById(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useFiscalYearList() {
  return useQuery({
    queryKey: keys.office.fiscal,
    queryFn: async () => {
      const { data } = await getFiscalYear();
      return data ?? [];
    },
  });
}

export function useFiscalYearById(id) {
  return useQuery({
    queryKey: keys.office.fiscalById(id),
    queryFn: async () => {
      const { data } = await getFiscalYearById(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useStateList() {
  return useQuery({
    queryKey: keys.office.state,
    queryFn: async () => {
      const { data } = await getState();
      return data ?? [];
    },
  });
}

export function useDistrictList(stateId) {
  return useQuery({
    queryKey: keys.office.district(stateId),
    queryFn: async () => {
      const { data } = await getDistrict(stateId);
      return data ?? [];
    },
    enabled: !!stateId,
  });
}

export function usePalikaList(districtId) {
  return useQuery({
    queryKey: keys.office.palika(districtId),
    queryFn: async () => {
      const { data } = await getPalika(districtId);
      return data ?? [];
    },
    enabled: !!districtId,
  });
}

export function useDonationList() {
  return useQuery({
    queryKey: keys.office.donation,
    queryFn: async () => {
      const { data } = await GetDonation();
      return data ?? [];
    },
  });
}

export function useDonationById(id) {
  return useQuery({
    queryKey: keys.office.donationById(id),
    queryFn: async () => {
      const { data } = await GetDonationById(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useUpdateEmployeeStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => employeeStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.office.employee });
    },
  });
}

export function useUpdateFiscalYearStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => updateFiscalYearStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.office.fiscal });
    },
  });
}

export function useDeleteDonation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => DeleteDonation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.office.donation });
    },
  });
}
