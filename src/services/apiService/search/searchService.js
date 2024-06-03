import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";

export async function searchDonor(donorName, number) {
  let response = await mainApi(
    apiUrls.search.searchDonor.method,
    apiUrls.search.searchDonor.url +
      `?donorName=${donorName}&number=${number}`
  );
  return response;
}

export async function searchMilkVolume(donorName) {
  let response = await mainApi(
    apiUrls.search.searchMilkVolume.method,
    apiUrls.search.searchMilkVolume.url +
      `?donorName=${donorName}`
  );
  return response;
}

export async function searchPasteurization(poolingCondition, poolingDate) {
  let response = await mainApi(
    apiUrls.search.searchPasteurization.method,
    apiUrls.search.searchPasteurization.url +
      `?poolingCondition=${poolingCondition}&poolingDate=${poolingDate}`
  );
  return response;
}

export async function searchRequsition(date) {
  let response = await mainApi(
    apiUrls.search.searchRequsition.method ,
      apiUrls.search.searchRequsition.url +
      `?date=${date}`
  );
  return response;
}
