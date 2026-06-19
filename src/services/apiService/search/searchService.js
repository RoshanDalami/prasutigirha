import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";

export async function searchDonor(donorName, number,regNumber) {
  let response = await mainApi(
    apiUrls.search.searchDonor.method,
    apiUrls.search.searchDonor.url +
      `?donorName=${donorName}&number=${number}&regNumber=${regNumber}`
  );
  return response;
}

export async function searchMilkVolume(donorId, gestationalAge, date) {
  const params = new URLSearchParams();
  if (donorId) params.set("donorId", donorId);
  if (gestationalAge) params.set("gestationalAge", gestationalAge);
  if (date) params.set("date", date);

  const response = await mainApi(
    apiUrls.search.searchMilkVolume.method,
    `${apiUrls.search.searchMilkVolume.url}?${params.toString()}`,
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
