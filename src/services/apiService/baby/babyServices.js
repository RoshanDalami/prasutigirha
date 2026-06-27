import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";

export async function getBabyDetail(page = 1, limit = 10, q, startDate, endDate) {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);
  if (q === "true") {
    params.append("all", "true");
  }
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  let response = await mainApi(
    apiUrls.baby.getBabyDetail.method,
    apiUrls.baby.getBabyDetail.url + "?" + params.toString()
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

export async function getInactiveBaby(page, limit, startDate, endDate, includeAll) {
  const params = new URLSearchParams();
  if (page != null) {
    params.set("page", page);
    params.set("limit", limit);
  }
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);
  if (includeAll) params.set("all", "true");
  const qs = params.toString();
  let response = await mainApi(
    apiUrls.baby.getInActiveBaby.method,
    apiUrls.baby.getInActiveBaby.url + (qs ? `?${qs}` : "")
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
