import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";

export async function getBabyDetail() {
  let response = await mainApi(
    apiUrls.baby.getBabyDetail.method,
    apiUrls.baby.getBabyDetail.url
  );
  return response;
}

export async function createBaby(data) {
  let response = await mainApi(
    apiUrls.baby.createBaby.method,
    apiUrls.baby.createBaby.url,
    data
  );
  return response;
}

export async function getBabyById(id) {
  let response = await mainApi(
    apiUrls.baby.getBabyById.method,
    apiUrls.baby.getBabyById.url + `/${id ? id : ""}`
  );
  return response;
}
export async function updateBabyStatus(id) {
  let response = await mainApi(
    apiUrls.baby.updateStatus.method,
    apiUrls.baby.updateStatus.url + `/${id ? id : ""}`
  );
  return response;
}

export async function getInactiveBaby() {
  let response = await mainApi(
    apiUrls.baby.getInActiveBaby.method,
    apiUrls.baby.getInActiveBaby.url
  );
  return response;
}

export async function searchBaby(term) {
  let response = await mainApi(
    apiUrls.search.searchBaby.method,
    apiUrls.search.searchBaby.url + `/${term ? term : ""}`
  );
  return response;
}
export async function ipList() {
  let response = await mainApi(
    apiUrls.baby.ipList.method,
    apiUrls.baby.ipList.url
  );
  return response;
}

export async function updateBabyOutcome(data) {
  let response = await mainApi(
    apiUrls.baby.updateBabyOutcome.method,
    apiUrls.baby.updateBabyOutcome.url,
    data
  );
  return response;
}
