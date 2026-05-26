import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";

export async function getMilkRequsition (page, limit){
    const params = page != null ? `?page=${page}&limit=${limit}` : "";
    let response = await mainApi(
        apiUrls.milkRequsition.getRequistion.method,
        apiUrls.milkRequsition.getRequistion.url + params
    )
    return response
}

export async function createMilkRequistion(data){
let response = await mainApi(
    apiUrls.milkRequsition.createMilkRequistion.method,
    apiUrls.milkRequsition.createMilkRequistion.url,
    data
)
return response
}

export async function getMilkRequsitionById(id) {
    let response = await mainApi(
        apiUrls.milkRequsition.getRequistion.method,
        apiUrls.milkRequsition.getRequistion.url + `/${id ? id : ""}`,
    )
    return response
}

export async function deleteMilkRequsition(id){
    let response = await mainApi(
        apiUrls.milkRequsition.deleteRequistion.method,
        apiUrls.milkRequsition.deleteRequistion.url+`/${id? id: ''}`,
    )
    return response
}