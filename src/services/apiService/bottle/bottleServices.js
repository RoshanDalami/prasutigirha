import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";

export async function getBottle(id){
    let response = await mainApi(
        apiUrls.bottle?.getBottle?.method,
        apiUrls?.bottle?.getBottle?.url+`/${id}`
    )
    return response
}

export async function createBottle(data){
    let response = await mainApi(
        apiUrls.bottle.createBottle.method,
        apiUrls.bottle.createBottle.url,
        data
    )
    return response
}
export async function updateBottleStatus(id){
    let response = await mainApi(
        apiUrls.bottle.updateBottleStatus.method,
        apiUrls.bottle.updateBottleStatus.url+`/${id?id:''}`,
    )
    return response;
}
