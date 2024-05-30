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
    apiUrls.pasteurization.deletePooling.url+`/${id}`
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
    apiUrls.pasteurization.getConditionById.method,
    apiUrls.pasteurization.getConditionById.url + `/${id}`
  );
  return response;
};
export const getGestationalPooling = async (id) => {
  let response = await mainApi(
    apiUrls.pasteurization.getGestationalPooling.method,
    apiUrls.pasteurization.getGestationalPooling.url + `/${id}`
  );
  return response;
};

export const getDonorByGestationalAge = async (id)=>{
  let response = await mainApi(
    apiUrls.pasteurization.getDonorListById.method,
    apiUrls.pasteurization.getDonorListById.url+`/${id}`,
    
  )
  return response
}

export const updateCulture = async (data) =>{
  let response = await mainApi(
    apiUrls.pasteurization.updateCulture.method,
    apiUrls.pasteurization.updateCulture.url,
    data
  )
  return response
}

export const updateOther = async (data) =>{
  let response = await mainApi(
    apiUrls.pasteurization.updateOther.method,
    apiUrls.pasteurization.updateOther.url,
    data
  );
  return response
}

export const Discard = async (id)=>{
  let response = await mainApi(
    apiUrls.pasteurization.discard.method,
    apiUrls.pasteurization.discard.url+`/${id?id:''}`,
  )
  return response
}