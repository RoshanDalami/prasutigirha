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

export const getDepartment = async () => {
  let response = await mainApi(
    apiUrls.office.getDepartment.method,
    apiUrls.office.getDepartment.url
  );
  return response;
};

export const createDepartment = async (data) => {
  let response = await mainApi(
    apiUrls.office.createDepartment.method,
    apiUrls.office.createDepartment.url,
    data
  );
  return response;
};

export const getPost = async () => {
  let response = await mainApi(
    apiUrls.office.getPost.method,
    apiUrls.office.getPost.url
  );
  return response;
};

export const createPost = async (data) => {
  let response = await mainApi(
    apiUrls.office.createPost.method,
    apiUrls.office.createPost.url,
    data
  );
  return response;
};

export const getEmployee = async () => {
  let response = await mainApi(
    apiUrls.office.getEmployee.method,
    apiUrls.office.getEmployee.url
  );
  return response;
};

export const createEmpolyee = async (data) => {
  let response = await mainApi(
    apiUrls.office.createEmployee.method,
    apiUrls.office.createEmployee.url,
    data
  );
  return response;
};

export const employeeStatus = async (id) => {
  let response = await mainApi(
    apiUrls.office.activeDeactiveEmployee.method,
    apiUrls.office.activeDeactiveEmployee.url + `/${id}`
  );
  return response;
};

export const getState = async () => {
  let response = await mainApi(
    apiUrls.office.getStates.method,
    apiUrls.office.getStates.url
  );
  return response;
};

export const getDistrict = async (id) => {
  let response = await mainApi(
    apiUrls.office.getDistrict.method,
    apiUrls.office.getDistrict.url + `?stateId=${id}`
  );
  return response;
};

export const getPalika = async (id) => {
  let response = await mainApi(
    apiUrls.office.getPalika.method,
    apiUrls.office.getPalika.url + `?districtId=${id}`
  );
  return response;
};

export const createFiscalYear = async (data) => {
  let response = await mainApi(
    apiUrls?.office?.createFiscalYear.method,
    apiUrls?.office?.createFiscalYear.url,
    data
  );
  return response;
};

export const getFiscalYear = async () => {
  let response = await mainApi(
    apiUrls.office.getFiscalYear.method,
    apiUrls.office.getFiscalYear.url
  );
  return response;
};

export const updateFiscalYearStatus = async (id) => {
  let response = await mainApi(
    apiUrls.office.updateFiscalYearStatus.method,
    apiUrls.office.updateFiscalYearStatus.url + `/${id ? id : ""}`
  );
  return response;
};

export const getFiscalYearById = async (id) => {
  let response = await mainApi(
    apiUrls?.office.getFiscalYearById.method,
    apiUrls?.office.getFiscalYearById.url + `/${id ? id : ""}`
  );
  return response;
};

export const giveAccess = async (data) => {
  let response = await mainApi(
    apiUrls?.user?.giveAccess.method,
    apiUrls?.user?.giveAccess.url,
    data
  );
  return response;
};
export const getAllUser = async () => {
  let response = await mainApi(
    apiUrls?.user?.getAllUser.method,
    apiUrls?.user?.getAllUser.url
  );
  return response;
};
export const getOneUser = async (id) => {
  let response = await mainApi(
    apiUrls?.user?.getOneUser.method,
    apiUrls?.user?.getOneUser.url + `/${id ? id : ""}`
  );
  return response;
};

export const GetAllModule = async () => {
  let response = await mainApi(
    apiUrls.user.getAllModule.method,
    apiUrls.user.getAllModule.url
  );
  return response;
};

export const GetDepartmentById = async (id) =>{
  let response = await mainApi(
  apiUrls.office.getDepartmentById.method,
  apiUrls.office.getDepartmentById.url+`/${id?id:''}`,
  )
  return response 
}

export const GetPostById = async (id) =>{
  let response = await mainApi(
    apiUrls.office.getPostById.method,
    apiUrls.office.getPostById.url+`/${id?id:''}`,
  )
  return response
}

export const GetEmployeeById = async (id) =>{
  let response = await mainApi(
    apiUrls?.office?.getEmployeeById.method,
    apiUrls?.office?.getEmployeeById.url+`/${id?id:''}`,
  )
  return response 
}

