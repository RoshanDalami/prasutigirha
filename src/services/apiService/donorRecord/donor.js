import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";

export const getDonor = async (page, limit, startDate, endDate, includeAll) => {
  const params = new URLSearchParams({ page, limit });
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);
  if (includeAll) params.set("all", "true");
  let response = await mainApi(
    apiUrls.donor.getDonor.method,
    `${apiUrls.donor.getDonor.url}?${params.toString()}`
  );
  return response;
};
export const createDonor = async (data) => {
  let response = await mainApi(
    apiUrls.donor.createDonor.method,
    apiUrls.donor.createDonor.url,
    data
  );
  return response;
};

export const getInActiveDonor = async (startDate, endDate) => {
  const params = new URLSearchParams();
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);
  const qs = params.toString();
  let response = await mainApi(
    apiUrls?.donor?.getInActiveDonor?.method,
    apiUrls?.donor?.getInActiveDonor?.url + (qs ? `?${qs}` : "")
  );
  return response;
};

export const getDiscardedDonor = async (startDate, endDate) => {
  const params = new URLSearchParams();
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);
  const qs = params.toString();
  let response = await mainApi(
    apiUrls?.donor?.getDiscardedDonor?.method,
    apiUrls?.donor?.getDiscardedDonor?.url + (qs ? `?${qs}` : "")
  );
  return response;
};

export const updateDonorStatus = async (id) => {
  let response = await mainApi(
    apiUrls?.donor?.updateDonorStatus?.method,
    apiUrls?.donor?.updateDonorStatus?.url + `/${id ? id : ""}`
  );
  return response;
};

export const getDonorOtherTest = async (id) => {
  let response = await mainApi(
    apiUrls.donor.getDonorOtherTest.method,
    apiUrls.donor.getDonorOtherTest.url + `/${id ? id : ""}`
  );
  return response;
};

export const discard = async (data) => {
  let response = await mainApi(
    apiUrls.donor.discard.method,
    apiUrls.donor.discard.url,
    data
  );
  return response;
};

export const donorByGestationalAge = async (id) => {
  let response = await mainApi(
    apiUrls?.donor.donorByGestationalAge.method,
    apiUrls?.donor.donorByGestationalAge.url + `/${id ? id : ""}`
  );
  return response;
};
export const regList = async () => {
  let response = await mainApi(
    apiUrls?.donor.regList.method,
    apiUrls?.donor.regList.url
  );
  return response;
};

export const updateSerology = async (data) => {
  const response = await mainApi(
    apiUrls?.donor.updateSerologyRecord.method,
    apiUrls?.donor.updateSerologyRecord.url,
    data
  );
  return response;
};

export const getAllDonorListForSelect = async (status = "active") => {
  const params = new URLSearchParams({ status });
  const response = await mainApi(
    apiUrls.donor.getAllActiveDonorListForSelect.method,
    `${apiUrls.donor.getAllActiveDonorListForSelect.url}?${params.toString()}`,
  );
  return response;
};
