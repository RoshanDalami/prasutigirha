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
    getDepartmentById: {
      method: "GET",
      url: "/office/departmentById",
    },
    getPostById: {
      method: "GET",
      url: "/office/postById",
    },
    getEmployeeById: {
      method: "GET",
      url: "/office/employeeById",
    },
    getDonation: {
      method: "GET",
      url: "/donation/getAllDonation",
    },
    createDonation: {
      method: "POST",
      url: "/donation/createDonation",
    },
    getDonationById: {
      method: "GET",
      url: "/donation/getDonationById",
    },
    deleteDonation: {
      method: "DELETE",
      url: "/donation/deleteDonation",
    },
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
    getDonorOtherTest: {
      method: "GET",
      url: "/donor/getOtherTest",
    },
    discard: {
      method: "POST",
      url: "/donor/discard",
    },
    donorByGestationalAge: {
      method: "GET",
      url: "/donor/getDonorWithGestationalAge",
    },
    regList: {
      method: "GET",
      url: "/donor/regList",
    },
    updateSerologyRecord: {
      method: "POST",
      url: "/donor/updateSerologyRecord",
    },
    getAllActiveDonorListForSelect: {
      method: "GET",
      url: "/donor/allDonorListSelect",
    },
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
    getCollectedMilkListForDonor: {
      method: "GET",
      url: "/milkVolume/getCollectedMilkListForDonor",
    },
    discardMilkBeforePasturization:{
      method:"GET",
      url:"/milkVolume/discardMilkBeforePasturization"
    }
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
    discard: {
      method: "GET",
      url: "/pasteurization/discard",
    },
  },
  baby: {
    getBabyDetail: {
      method: "GET",
      url: "/baby/getBabyDetail",
    },
    getInActiveBaby: {
      method: "GET",
      url: "/baby/getInactiveBaby",
    },
    getBabyById: {
      method: "GET",
      url: "/baby/getBabyDetailId",
    },
    createBaby: {
      method: "POST",
      url: "/baby/createBabyDetail",
    },
    updateStatus: {
      method: "GET",
      url: "/baby/updateBaby",
    },
    ipList: {
      method: "GET",
      url: "/baby/ipList",
    },
    updateBabyOutcome: {
      method: "PATCH",
      url: "/baby/updateBabyOutcome",
    },
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
    updateBottleStatus: {
      method: "GET",
      url: "/bottle/updateStatus",
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
    searchBaby: {
      method: "GET",
      url: "/baby/searchBaby",
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
    getDonorNumber: {
      method: "GET",
      url: "/dashboard/getDonorCountMonthly",
    },
    getAllRecords: {
      method: "GET",
      url: "/dashboard/getAllRecords",
    },
  },
  report: {
    getAllReports: {
      method: "GET",
      url: "/report/getAllReport",
    },
    getReportDateWise: {
      method: "GET",
      url: "/report/getAllReportDateWise",
    },
    getMilkDiscardReport :{
      method:"GET",
      url:"/report/getMilkDiscardReport"
    },
    getMilkDiscardReportDateWise :{
      method:"GET",
      url:"/report/getMilkDiscardReportDateWise"
    },
  },
  dropdown: {
    getGestationalTwo: {
      method: "GET",
      url: "/dropdown/getGestationalTwo",
    },
    getBabyOutCome: {
      method: "GET",
      url: "/dropdown/getBabyOutcome",
    },
  },
};
export default apiUrls;
