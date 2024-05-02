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