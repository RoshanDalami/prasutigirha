import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";

export const getDonor = async () => {
  let response = await mainApi(
    apiUrls.donor.getDonor.method,
    apiUrls.donor.getDonor.url
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

export const getInActiveDonor = async ()=>{
  let response = await mainApi(
    apiUrls?.donor?.getInActiveDonor?.method,
    apiUrls?.donor?.getInActiveDonor?.url,
  )
  return response;
}

export const updateDonorStatus = async (id)=>{
  let response = await mainApi(
    apiUrls?.donor?.updateDonorStatus?.method,
    apiUrls?.donor?.updateDonorStatus?.url+`/${id?id:''}`,
  )
  return response
}

export const getDonorOtherTest = async (id)=>{
  let response = await mainApi(
    apiUrls.donor.getDonorOtherTest.method,
    apiUrls.donor.getDonorOtherTest.url+`/${id?id:''}`,
  )
  return response
}

export const discard = async (data)=>{
  let response = await mainApi(
    apiUrls.donor.discard.method,
    apiUrls.donor.discard.url,
    data
  )
  return response
}