import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";

export async function createCulture(data){
let response = await mainApi(
    apiUrls.culture.createCulture.method,
    apiUrls.culture.createCulture.url,
    data
)
return response
}