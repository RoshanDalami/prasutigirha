import { mainApi } from "src/services/apiHelpers";
import apiUrls from "src/services/apiUrls";
export const getOffice = async () => {
  let response = await mainApi(
    apiUrls.office.getOffice.method,
    apiUrls.office.getOffice.url
  );
  return response;
};
export const createOffice = async (data) => {
  let response = await mainApi(
    apiUrls.office.createOffice.method,
    apiUrls.office.createOffice.url,
    data
  );
  return response;
};

export const getDepartment = async()=>{
  let response = await mainApi(
    apiUrls.office.getDepartment.method,
    apiUrls.office.getDepartment.url,
  )
  return response
}

export const createDepartment = async (data)=>{
  let response = await mainApi(
    apiUrls.office.createDepartment.method,
    apiUrls.office.createDepartment.url,
    data
  )
  return response
}

export const getPost = async()=>{
  let response = await mainApi(
    apiUrls.office.getPost.method,
    apiUrls.office.getPost.url,
  )
  return response
}

export const createPost = async (data)=>{
  let response = await mainApi(
    apiUrls.office.createPost.method,
    apiUrls.office.createPost.url,
    data 
  )
  return response
}

export const getEmployee = async ()=>{
  let response = await mainApi(
    apiUrls.office.getEmployee.method,
    apiUrls.office.getEmployee.url,
  )
  return response
}

export const createEmpolyee = async (data)=>{
  let response = await mainApi(
    apiUrls.office.createEmployee.method,
    apiUrls.office.createEmployee.url,
    data
  )
  return response
}

export const getState =  async () =>{
  let response = await mainApi(
    apiUrls.office.getStates.method,
    apiUrls.office.getStates.url,
  )
  return response
}

export const getDistrict = async (id)=>{
let response = await mainApi(
  apiUrls.office.getDistrict.method,
  apiUrls.office.getDistrict.url+`?stateId=${id}`,
)
return response
}

export const getPalika = async (id)=>{
  let response = await mainApi(
    apiUrls.office.getPalika.method,
    apiUrls.office.getPalika.url+`?districtId=${id}`,
  )
  return response
}

export const createFiscalYear = async (data)=>{
let response = await mainApi(
  apiUrls?.office?.createFiscalYear.method,
  apiUrls?.office?.createFiscalYear.url,
  data
)
return response
}

export const getFiscalYear = async ()=>{
  let response = await mainApi(
    apiUrls.office.getFiscalYear.method,
    apiUrls.office.getFiscalYear.url,
  )
  return response
}