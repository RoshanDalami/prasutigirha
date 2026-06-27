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

export async function searchMilkVolume(donorId, gestationalAge, date, startDate, endDate) {
  const params = new URLSearchParams();
  if (donorId) params.set("donorId", donorId);
  if (gestationalAge) params.set("gestationalAge", gestationalAge);
  if (date) params.set("date", date);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  const response = await mainApi(
    apiUrls.search.searchMilkVolume.method,
    `${apiUrls.search.searchMilkVolume.url}?${params.toString()}`,
  );
  return response;
}

export async function searchPasteurization(poolingCondition, poolingDate, startDate, endDate) {
  const params = new URLSearchParams();
  if (poolingCondition) params.set("poolingCondition", poolingCondition);
  if (poolingDate) params.set("poolingDate", poolingDate);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  let response = await mainApi(
    apiUrls.search.searchPasteurization.method,
    `${apiUrls.search.searchPasteurization.url}?${params.toString()}`
  );
  return response;
}

export async function searchRequsition(date, startDate, endDate) {
  const params = new URLSearchParams();
  if (date) params.set("date", date);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  let response = await mainApi(
    apiUrls.search.searchRequsition.method,
    `${apiUrls.search.searchRequsition.url}?${params.toString()}`
  );
  return response;
}
