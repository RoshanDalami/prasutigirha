import apiUrls from "../../apiUrls";
import { mainApi } from "../../apiHelpers";

export const getGestationalTwo = async () => {
  const response = await mainApi(
    apiUrls.dropdown.getGestationalTwo.method,
    apiUrls.dropdown.getGestationalTwo.url
  );
  return response;
};

export const getBabyOutCome = async () => {
  const response = await mainApi(
    apiUrls.dropdown.getBabyOutCome.method,
    apiUrls.dropdown.getBabyOutCome.url
  );
  return response;
};
