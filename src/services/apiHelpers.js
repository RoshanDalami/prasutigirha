"use client";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://prasuti.kantipurride.com"
    : "http://localhost:8000";

export const urls = {
  mainUrl: `${baseUrl}/api/v1`,
  login: `/api/user/login`,
  register: `/api/user/register`,
  logout: `/api/user/logout`,
  getStates: `${baseUrl}/api/v1/office/getState`,
  getDistrict: `${baseUrl}/api/v1/office/getdistrict`,
  getPalika: `${baseUrl}/api/v1/office/getPalika`,
  createDepartment: `${baseUrl}/api/v1/office/registerDepartment`,
  getDepartment: `${baseUrl}/api/v1/office/getDepartment`,
  getPost: `${baseUrl}/api/v1/office/getPost`,
  createPost: `${baseUrl}/api/v1/office/registerPost`,
  getEmployee: `${baseUrl}/api/v1/office/getEmployee`,
  createEmployee: `${baseUrl}/api/v1/office/registerEmployee`,
  getDonor: `${baseUrl}/api/v1/donor/getDonorList`,
  createDanaDarta: `${baseUrl}/api/v1/donor/registerDonor`,
  getEthnicity: `${baseUrl}/api/v1/dropdown/getEthnicity`,
  getDelivery: `${baseUrl}/api/v1/dropdown/getDelivery`,
  getBabyStatus: `${baseUrl}/api/v1/dropdown/getBabyStatus`,
  getBabyTransfer: `${baseUrl}/api/v1/dropdown/getBabyTransfer`,
  getBreastFeeding: `${baseUrl}/api/v1/dropdown/getBreastFeeding`,
  getGestational: `${baseUrl}/api/v1/dropdown/getGestational`,
  getParity: `${baseUrl}/api/v1/dropdown/getParity`,
  getMilkByDonorId: `${baseUrl}/api/v1/milkVolume/getMilkVolumeByDonor`,
  deleteMilkById: `${baseUrl}/api/v1/milkVolume/deleteMilkById`,
  getVolumeOfMilk: `${baseUrl}/api/v1/milkVolume/getMilkVolume`,
  createVolumeOfMilk: `${baseUrl}/api/v1/milkVolume/registerMilkVolume`,
  createPooling: `${baseUrl}/api/v1/pasteurization/createPasteurization`,
  getPooling: `${baseUrl}/api/v1/pasteurization/getPasteurization`,
  getPoolingById: `${baseUrl}/api/v1/pasteurization/getPasteurizationById`,
  deletePooling: `${baseUrl}/api/v1/pasteurization/deletePasteurizationById`,
  getColostrum: `${baseUrl}/api/v1/pasteurization/getColostrum`,
  getCondition: `${baseUrl}/api/v1/pasteurization/getCondition`,
  getConditionById: `${baseUrl}/api/v1/pasteurization/getConditionById`,
  getBaby: `${baseUrl}/api/v1/baby/getBabyDetail`,
  getBabyById: `${baseUrl}/api/v1/baby/getBabyDetailId`,
  createBaby: `${baseUrl}/api/v1/baby/createBabyDetail`,
  getBottle: `${baseUrl}/api/v1/bottle/getBottles`,
  createBottle: `${baseUrl}/api/v1/bottle/generateBottles`,
  createMilkRequistion: `${baseUrl}/api/v1/milkRequsition/registerMilkRequsition`,
  getRequistion: `${baseUrl}/api/v1/milkRequsition/getMilkRequsition`,
  getGestationalPooling: `${baseUrl}/api/v1/pasteurization/getConditionById`,
  deleteRequistion: `${baseUrl}/api/v1/milkRequsition/deleteMilkRequsition`,
  createFiscal: `${baseUrl}/api/v1/fiscal/createFiscal`,
  getFiscal: `${baseUrl}/api/v1/fiscal/getFiscal`,
};

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  try {
    const stored = JSON.parse(localStorage.getItem("user") || "{}");
    return Cookies.get("token") ?? stored?.data?.token ?? stored?.token ?? null;
  } catch {
    return Cookies.get("token") ?? null;
  }
}

export const apiClient = axios.create({
  baseURL: urls.mainUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      Cookies.remove("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

export const loginApi = async (method, url, data) => {
  const response = await axios({
    method,
    url: `${urls.mainUrl}${url}`,
    data,
  });
  return response.data;
};

export const mainApi = async (method, url, data) => {
  const response = await apiClient({
    method,
    url,
    data,
  });
  return response.data;
};
