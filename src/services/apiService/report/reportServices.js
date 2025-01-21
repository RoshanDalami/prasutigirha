import apiUrls from "../../apiUrls";
import {mainApi} from "../../apiHelpers";


export const GetAllReport = async () => {
    const response = await mainApi(
        apiUrls.report?.getAllReports.method,
        apiUrls.report?.getAllReports.url
    )
    return response
}

export const GetReportDateWise = async (data) =>{
    const response = await mainApi(
        apiUrls.report?.getReportDateWise.method,
        apiUrls.report?.getReportDateWise.url+`?startDate=${data.startingDate}&endDate=${data.endingDate}`,
        )
    return response
}