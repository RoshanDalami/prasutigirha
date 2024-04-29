import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";

export async function searchDonor(gestationalAge, donorName, registerDate) {
  let response = await mainApi(
    apiUrls.search.searchDonor.method,
    apiUrls.search.searchDonor.url +
      `?gestationalAge=${gestationalAge}&donorName=${donorName}&registerDate=${registerDate}`
  );
  return response;
}

export async function searchMilkVolume(gestationalAge, volumeDate) {
  let response = await mainApi(
    apiUrls.search.searchMilkVolume.method,
    apiUrls.search.searchMilkVolume.url +
      `?gestationalAge=${gestationalAge}&volumeDate=${volumeDate}`
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
