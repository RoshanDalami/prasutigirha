import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";

export async function getBabyDetail(){
    let response = await mainApi(
        apiUrls.baby.getBabyDetail.method,
        apiUrls.baby.getBabyDetail.url,
    )
    return response
}

export async function createBaby(data){
    let response = await mainApi(
        apiUrls.baby.createBaby.method,
        apiUrls.baby.createBaby.url,
        data
    )
    return response
}

export async function getBabyById(id){
    let response = await mainApi(
        apiUrls.baby.getBabyById.method,
        apiUrls.baby.getBabyById.url+`/${id?id:''}`,
    )
    return response
}
export async function updateBabyStatus(id){
    let response = await mainApi(
        apiUrls.baby.updateStatus.method,
        apiUrls.baby.updateStatus.url+`/${id?id:''}`,

    )
    return response
}