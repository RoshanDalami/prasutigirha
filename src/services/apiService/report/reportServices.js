import apiUrls from "../../apiUrls";
import { mainApi } from "../../apiHelpers";

export const GetAllReport = async () => {
  const response = await mainApi(
    apiUrls.report?.getAllReports.method,
    apiUrls.report?.getAllReports.url,
  );
  return response;
};

export const GetReportDateWise = async (data) => {
  const response = await mainApi(
    apiUrls.report?.getReportDateWise.method,
    apiUrls.report?.getReportDateWise.url +
      `?startDate=${data.startingDate}&endDate=${data.endingDate}`,
  );
  return response;
};

export const GetMilkDiscardReport = async () => {
  const response = await mainApi(
    apiUrls.report.getMilkDiscardReport.method,
    apiUrls.report.getMilkDiscardReport.url,
  );
  return response;
};

export const GetMilkDiscardReportDateWise = async (data) => {
  const response = await mainApi(
    apiUrls.report.getMilkDiscardReportDateWise.method,
    apiUrls.report.getMilkDiscardReportDateWise.url +
      `?startDate=${data.startingDate}&endDate=${data.endingDate}`,
  );
  return response;
};

export const GetMilkDiscardDetailedReport = async () => {
  const response = await mainApi(
    apiUrls.report.getMilkDiscardDetailedReport.method,
    apiUrls.report.getMilkDiscardDetailedReport.url,
  );
  return response;
};

export const GetMilkDiscardDetailedReportDateWise = async (data) => {
  const response = await mainApi(
    apiUrls.report.getMilkDiscardDetailedReportDateWise.method,
    apiUrls.report.getMilkDiscardDetailedReportDateWise.url +
      `?startDate=${data.startingDate}&endDate=${data.endingDate}`,
  );
  return response;
};
