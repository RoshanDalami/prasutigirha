import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";

export const getMilkByDonorId = async (id) => {
  let response = await mainApi(
    apiUrls.milkVolume.getMilkVolumeByDonor.method,
    apiUrls.milkVolume.getMilkVolumeByDonor.url + `/${id}`
  );
  return response;
};
export const deleteMilkById = async (id) => {
  let response = await mainApi(
    apiUrls.milkVolume.deleteMilkVolume.method,
    apiUrls.milkVolume.deleteMilkVolume.url + `/${id}`
  );
  return response;
};
export const getVolumeOfMilk = async () => {
  let response = await mainApi(
    apiUrls.milkVolume.getVolumeOfMilk.method,
    apiUrls.milkVolume.getVolumeOfMilk.url
  );
  return response;
};
export const createVolumeOfMilk = async (data) => {
  let response = await mainApi(
    apiUrls.milkVolume.createVolumeOfMilk.method,
    apiUrls.milkVolume.createVolumeOfMilk.url,
    data
  );
  return response;
};

export const getMilkListByDonor = async (id) => {
  let response = await mainApi(
    apiUrls?.milkVolume?.getMilkListByDonor?.method,
    apiUrls?.milkVolume?.getMilkListByDonor?.url + `/${id}`
  );
  return response;
};

export const getDonorWithTotalVolume = async () => {
  let response = await mainApi(
    apiUrls?.milkVolume?.getDonoWithTotalVolume?.method,
    apiUrls?.milkVolume?.getDonoWithTotalVolume?.url
  );
  return response;
};

export const getCollectedMilkListForDonor = async (donorId) => {
  let response = await mainApi(
    apiUrls.milkVolume.getCollectedMilkListForDonor.method,
    apiUrls.milkVolume.getCollectedMilkListForDonor.url +
      `/${donorId ? donorId : ""}`
  );
  return response;
};

export const discardMilkBeforePasturization = async (collectionId,remark) => {
  let response = await mainApi(
    apiUrls.milkVolume.discardMilkBeforePasturization.method,
    apiUrls.milkVolume.discardMilkBeforePasturization.url +
      `?collectedId=${collectionId ? collectionId : ""}&remark=${remark}`
  );
  return response;
};
