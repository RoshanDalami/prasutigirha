"use client";
import axios from "axios";
import Cookies from "js-cookie";
// const userInfo = typeof (localStorage != 'undefined')
//   ? JSON.parse(localStorage.getItem("user"))
//   : "";
const token = Cookies.get("token");

// const baseUrl = "https://www.prasuti.palikasoft.com";



const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://prasuti.palikasoft.com"
    : "http://localhost:8000";

export const urls = {
  mainUrl: `${baseUrl}/api/v1`,
  login: `/api/user/login`,
  register: `/api/user/register`,
  logout: `/api/user/logout`,
  // createOffice: `${baseUrl}/api/v1/office/registerOffice`,
  // getOffice: `${baseUrl}/api/v1/office/getOffice`,
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
  //milkvolume
  getMilkByDonorId: `${baseUrl}/api/v1/milkVolume/getMilkVolumeByDonor`,
  deleteMilkById: `${baseUrl}/api/v1/milkVolume/deleteMilkById`,
  getVolumeOfMilk: `${baseUrl}/api/v1/milkVolume/getMilkVolume`,
  createVolumeOfMilk: `${baseUrl}/api/v1/milkVolume/registerMilkVolume`,
  //pooling
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

export const mainApi = async (method, url, data) => {
  let response = await axios({
    method,
    url: `${urls.mainUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
