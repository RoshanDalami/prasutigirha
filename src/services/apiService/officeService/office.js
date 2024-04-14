import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";
export const getOffice = async () => {
  let response = await mainApi(
    apiUrls.office.getOffice.method,
    apiUrls.office.getOffice.url
  );
  return response;
};
export const createOffice = async (data) => {
  let response = await mainApi(
    apiUrls.office.createOffice.method,
    apiUrls.office.createOffice.url,
    data
  );
  return response;
};
