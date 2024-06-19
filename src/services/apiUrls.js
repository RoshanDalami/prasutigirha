const apiUrls = {
  user: {
    giveAccess: {
      method: "POST",
      url: "/user/manageAccess",
    },
    getAllUser: {
      method: "GET",
      url: "/user/getAllUser",
    },
    getOneUser: {
      method: "GET",
      url: "/user/getOneUser",
    },
    getAllModule: {
      method: "GET",
      url: "/user/getAllModule",
    },
  },
  office: {
    createOffice: {
      method: "POST",
      url: "/office/registerOffice",
    },
    getOffice: {
      method: "GET",
      url: "/office/getOffice",
    },
    getStates: {
      method: "GET",
      url: "/office/getState",
    },
    getDistrict: {
      method: "GET",
      url: "/office/getdistrict",
    },
    getPalika: {
      method: "GET",
      url: "/office/getPalika",
    },
    createDepartment: {
      method: "POST",
      url: "/office/registerDepartment",
    },
    getDepartment: {
      method: "GET",
      url: "/office/getDepartment",
    },
    createPost: {
      method: "POST",
      url: "/office/registerPost",
    },
    getPost: {
      method: "GET",
      url: "/office/getPost",
    },
    getEmployee: {
      method: "GET",
      url: "/office/getEmployee",
    },
    createEmployee: {
      method: "POST",
      url: "/office/registerEmployee",
    },
    activeDeactiveEmployee: {
      method: "GET",
      url: "/office/employeeStatus",
    },
    createFiscalYear: {
      method: "POST",
      url: "/fiscal/createFiscal",
    },
    getFiscalYear: {
      method: "GET",
      url: "/fiscal/getFiscal",
    },
    updateFiscalYearStatus: {
      method: "GET",
      url: "/fiscal/updateStatus",
    },
    getFiscalYearById: {
      method: "GET",
      url: "/fiscal/getFiscal",
    },
    getDepartmentById:{
      method:"GET",
      url:"/office/departmentById"
    },
    getPostById:{
      method:"GET",
      url:"/office/postById"
    },
    getEmployeeById:{
      method:"GET",
      url:"/office/employeeById"
    }
  },
  donor: {
    getDonor: {
      method: "GET",
      url: "/donor/getDonorList",
    },
    createDonor: {
      method: "POST",
      url: "/donor/registerDonor",
    },
    getInActiveDonor: {
      method: "GET",
      url: "/donor/getInActiveDonor",
    },
    updateDonorStatus: {
      method: "GET",
      url: "/donor/updateStatus",
    },
    getDonorOtherTest:{
      method:"GET",
      url:"/donor/getOtherTest"
    },
    discard:{
      method:"POST",
      url:"/donor/discard"
    },
    donorByGestationalAge:{
      method:"GET",
      url:"/donor/getDonorWithGestationalAge"
    }
  },
  milkVolume: {
    getMilkVolumeByDonor: {
      method: "GET",
      url: "/milkVolume/getMilkVolumeByDonor",
    },
    deleteMilkVolume: {
      method: "DELETE",
      url: "/milkVolume/deleteMilkById",
    },
    getVolumeOfMilk: {
      method: "GET",
      url: "/milkVolume/getMilkVolume",
    },
    createVolumeOfMilk: {
      method: "POST",
      url: "/milkVolume/registerMilkVolume",
    },
    getMilkListByDonor: {
      method: "GET",
      url: "/milkVolume/volumeByDonorId",
    },
    getDonoWithTotalVolume: {
      method: "GET",
      url: "/milkVolume/donorWithTotalVolume",
    },
  },
  pasteurization: {
    createPooling: {
      method: "POST",
      url: "/pasteurization/createPasteurization",
    },
    getPooling: {
      method: "GET",
      url: "/pasteurization/getPasteurization",
    },
    getPoolingById: {
      method: "GET",
      url: "/pasteurization/getPasteurizationById",
    },
    deletePooling: {
      method: "DELETE",
      url: "/pasteurization/deletePasteurizationById",
    },
    getColostrum: {
      method: "GET",
      url: "/pasteurization/getColostrum",
    },
    getCondition: {
      method: "GET",
      url: "/pasteurization/getCondition",
    },
    getConditionById: {
      method: "GET",
      url: "/pasteurization/getConditionById",
    },
    getGestationalPooling: {
      method: "GET",
      url: "/pasteurization/getConditionById",
    },
    getDonorListById: {
      method: "GET",
      url: "/pasteurization/getDonorByGestationalAge",
    },
    updateCulture: {
      method: "POST",
      url: "/pasteurization/updateCulture",
    },
    updateOther: {
      method: "PATCH",
      url: "/donor/updateOther",
    },
    discard:{
      method:"GET",
      url:"/pasteurization/discard"
    }
  },
  baby: {
    getBabyDetail: {
      method: "GET",
      url: "/baby/getBabyDetail",
    },
    getBabyById: {
      method: "GET",
      url: "/baby/getBabyDetailId",
    },
    createBaby: {
      method: "POST",
      url: "/baby/createBabyDetail",
    },
    updateStatus:{
      method:"GET",
      url:"/baby/updateBaby"
    }
  },
  bottle: {
    getBottle: {
      method: "GET",
      url: "/bottle/getBottles",
    },
    createBottle: {
      method: "POST",
      url: "/bottle/generateBottles",
    },
  },
  milkRequsition: {
    createMilkRequistion: {
      method: "POST",
      url: "/milkRequsition/registerMilkRequsition",
    },
    getRequistion: {
      method: "GET",
      url: "/milkRequsition/getMilkRequsition",
    },
    deleteRequistion: {
      method: "DELETE",
      url: "/milkRequsition/deleteMilkRequsition",
    },
  },
  search: {
    searchDonor: {
      method: "GET",
      url: "/search/searchDonor",
    },
    searchMilkVolume: {
      method: "GET",
      url: "/search/searchMilkVolume",
    },
    searchPasteurization: {
      method: "GET",
      url: "/search/searchPasteurization",
    },
    searchRequsition: {
      method: "GET",
      url: "/search/searchRequsition",
    },
  },
  culture: {
    createCulture: {
      method: "POST",
      url: "/culture/createCulture",
    },
  },
  dashboard: {
    getNumberOfDonor: {
      method: "GET",
      url: "/dashboard/getNumberOfDonor",
    },
    getNumberOfMilkCollected: {
      method: "GET",
      url: "/dashboard/getNumberOfMilkCollected",
    },
    getMilkRequsitited: {
      method: "GET",
      url: "/dashboard/getTotalMilkRequsition",
    },
    getNumberOfBaby: {
      method: "GET",
      url: "/dashboard/getNumberOfBaby",
    },
    getMonthWiseMilkCollection: {
      method: "GET",
      url: "/dashboard/getMilkCollectedMonthWise",
    },
    getMonthWiseMilkRequsition: {
      method: "GET",
      url: "/dashboard/getMilkRequsitionMonthWise",
    },
    getDonorNumber:{
      method:"GET",
      url:"/dashboard/getDonorCountMonthly"
    }
  },
};
export default apiUrls;
