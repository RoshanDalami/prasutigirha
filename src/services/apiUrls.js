const apiUrls = {
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
    createFiscalYear:{
      method:"POST",
      url:"/fiscal/createFiscal"
    },
    getFiscalYear:{
      method:"GET",
      url:"/fiscal/getFiscal"
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
    getMilkListByDonor:{
      method:"GET",
      url:"/milkVolume/volumeByDonorId"
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
    getDonorListById:{
      method:"GET",
      url:"/pasteurization/getDonorByGestationalAge"
    },
    updateCulture:{
      method:"POST",
      url:"/pasteurization/updateCulture"
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
  search:{
    searchDonor:{
      method:"GET",
      url:"/search/searchDonor"
    },
    searchMilkVolume:{
      method:"GET",
      url:"/search/searchMilkVolume"
    },
    searchPasteurization:{
      method:"GET",
      url:"/search/searchPasteurization"
    },
    searchRequsition:{
      method:"GET",
      url:"/search/searchRequsition"
    }
  },
  culture:{
    createCulture:{
      method:"POST",
      url:"/culture/createCulture"
    }
  }
  
};
export default apiUrls;



