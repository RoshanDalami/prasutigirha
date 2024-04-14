import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";

export const getPooling = async () => {
  let response = await mainApi(
    apiUrls.pasteurization.getPooling.method,
    apiUrls.pasteurization.getPooling.url
  );
  return response;
};
export const getPoolingById = async (id) => {
  let response = await mainApi(
    apiUrls.pasteurization.getPoolingById.method,
    apiUrls.pasteurization.getPoolingById.url + `/${id}`
  );
  return response;
};
export const createPooling = async (data) => {
  let response = await mainApi(
    apiUrls.pasteurization.createPooling.method,
    apiUrls.pasteurization.createPooling.url,
    data
  );
  return response;
};
export const deletePooling = async (id) => {
  let response = await mainApi(
    apiUrls.pasteurization.deletePooling.method,
    apiUrls.pasteurization.deletePooling.url + `/${id}`
  );
  return response;
};

export const getColostrum = async () => {
  let response = await mainApi(
    apiUrls.pasteurization.getColostrum.method,
    apiUrls.pasteurization.getColostrum.url
  );
  return response;
};
export const getCondition = async () => {
  let response = await mainApi(
    apiUrls.pasteurization.getCondition.method,
    apiUrls.pasteurization.getCondition.url
  );
  return response;
};
export const getConditionById = async (id) => {
  let response = await mainApi(
    apiUrls.pasteurization.getCondition.method,
    apiUrls.pasteurization.getCondition.url + `/${id}`
  );
  return response;
};
export const getGestationalPooling = async (id) => {
  let response = await mainApi(
    apiUrls.pasteurization.getCondition.method,
    apiUrls.pasteurization.getCondition.url + `/${id}`
  );
  return response;
};
