import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";


export async function getNumberOfDonor(){
    let response = await mainApi(
        apiUrls?.dashboard?.getNumberOfDonor.method,
        apiUrls?.dashboard?.getNumberOfDonor.url,
    )
    return response
}

export async function getMilkCollected(){
    let response = await mainApi(
        apiUrls.dashboard.getNumberOfMilkCollected.method,
        apiUrls.dashboard.getNumberOfMilkCollected.url
    )
    return response
}

export async function getMilkRequsitited(){
    let response = await mainApi(
        apiUrls.dashboard.getMilkRequsitited.method,
        apiUrls.dashboard.getMilkRequsitited.url,
    )
    return response
}

export async function getTotalBaby(){
    let response = await mainApi(
        apiUrls.dashboard.getNumberOfBaby.method,
        apiUrls.dashboard.getNumberOfBaby.url
    )
    return response
}

export async function getMonthWiseMilkCollection(){
    let response = await mainApi(
        apiUrls.dashboard.getMonthWiseMilkCollection.method,
        apiUrls.dashboard.getMonthWiseMilkCollection.url,
    )
    return response
}
export async function getMonthWiseMilkRequsition(){
    let response = await mainApi(
        apiUrls.dashboard.getMonthWiseMilkRequsition.method,
        apiUrls.dashboard.getMonthWiseMilkRequsition.url,
    )
    return response
}

export async function getDonorNumberMonthly(){
    let resposne = await mainApi(
        apiUrls.dashboard.getDonorNumber.method,
        apiUrls.dashboard.getDonorNumber.url,
    )
    return resposne
}

export async function getAllRecords(){
    let response = await mainApi(
        apiUrls.dashboard.getAllRecords.method,
        apiUrls.dashboard.getAllRecords.url,
    )
    return response
}