import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StepperContext } from "../stepper/StepperContext";
import { useRouter } from "next/navigation";
import StepperControl from "../stepper/StepperControl";
import FormBorder from "../reusableForm";

const defaultValues = {
  birthDate: "",
  breastFeedingStat: "",
  babyTransferStat: "",
  babyStat: "",
  hivStat: "",
  hbsagStat: "",
  vdrlStat: "",
  testDate: "",
};
import { serologyAtom } from "src/recoil/serology/serologyAtom";
import { useSetRecoilState , useRecoilValue } from "recoil";
const StatusOfBaby = ({ handleClick, currentStep, steps, clickedIdData }) => {
  const [defaultValuesWithUserData, setDefaultValuesWithUserData] =
    useState("");
    const setSerologyPositive = useSetRecoilState(serologyAtom);
    const serologyStatus = useRecoilValue(serologyAtom)
  const { userData, setUserData } = useContext(StepperContext);
  const { query } = useRouter();
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: defaultValuesWithUserData,
    // resolver: addressValidation,
  });

  useEffect(() => {
    if (userData) {
      setDefaultValuesWithUserData({
        birthDate: userData.birthDate || "",
        breastFeedingStat: userData.breastFeedingStat || "",
        babyTransferStat: userData.babyTransferStat || "",
        babyStat: userData.babyStat || "",
        hivStat: userData.hivStat || "",
        hbsagStat: userData.hbsagStat || "",
        vdrlStat: userData.vdrlStat || "",
        testDate: userData.testDate || "",
      });
      setValue("birthDate", userData.birthDate || "");
      setValue("breastFeedingStat", userData.breastFeedingStat || "");
      setValue("babyTransferStat", userData.babyTransferStat || "");
      setValue("babyStat", userData.babyStat || "");
      setValue("hivStat", userData.hivStat || "");
      setValue("hbsagStat", userData.hbsagStat || "");
      setValue("vdrlStat", userData.vdrlStat || "");
      setValue("testDate", userData.testDate || "");
    } else {
      setDefaultValuesWithUserData(defaultValues);
    }
  }, [userData, setValue]);

  
  
 

    const onSubmit = (data) => {
      if ( serologyStatus === "false"){
        setUserData({ ...userData, ...data });
      localStorage.setItem("userData", JSON.stringify({ ...userData, ...data }));
      handleClick("next");
      console.log(userData, "This is data");
      }
      else {
        setUserData({ ...userData, ...data });
      localStorage.setItem("userData", JSON.stringify({ ...userData, ...data }));
      
      
      }
    };
  

  const watchAllFields = watch();

  if(watchAllFields?.hivStat){
    setSerologyPositive(watchAllFields?.hivStat)
  }

  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBorder title={" Status of Baby"}>
        <p className="font-bold text-xl py-5 ">Add Status of Baby:</p>
        <div className="grid md:grid-cols-2 gap-4 text-lg">
          <div className="grid">
            <label>
              {" "}
              Date of Birth<span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              placeholder=""
              className="inputStyle"
              {...register("birthDate")}
            />
          </div>
          <div className="grid">
            <label>
              {" "}
              Baby Status
              <span className="text-red-600">*</span>
            </label>
            <select className="inputStyle" {...register("babyStat")}>
              <option>Select Your Baby Status</option>
              <option>Normal</option>
              <option>Birth Asphylexia</option>
              <option>Preterm </option>
              <option>Sepsis</option>
              <option>Jaundice</option>
              <option>Other</option>
            </select>
          </div>
          <div className="grid">
            <label>
              Baby Transfer Status
              <span className="text-red-600">*</span>
            </label>
            <select className="inputStyle" {...register("babyTransferStat")}>
              <option>Select Your Baby Status</option>
              <option>NICU</option>
            </select>
          </div>
          <div className="grid">
            <label>
              {" "}
              Baby Breast Feeding Status
              <span className="text-red-600">*</span>
            </label>
            <select className="inputStyle" {...register("breastFeedStat")}>
              <option>Select Your Baby Status</option>
              <option>Exclusive Breast Feeding</option>
              <option>Partial Breast Feeding</option>
              <option>Formula Milk Only </option>
              <option>NPO</option>
              <option>PDHM</option>
            </select>
          </div>
        </div>
        <p className="font-bold text-xl py-5 ">Serology Screening Records:</p>
        <div className="grid grid-cols-2 gap-4 text-lg">
          <div className="grid">
            <label>
              {" "}
              HIV Test
              <span className="text-red-600">*</span>
            </label>
            <select className="inputStyle" {...register("hivStat")}>
              {" "}
              <option selected disabled value={''}>--select HIV Status--</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="grid">
            <label>
              {" "}
              HBSAG Test
              <span className="text-red-600">*</span>
            </label>
            <select className="inputStyle" {...register("hbsagStat")}>
              {" "}
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="grid">
            <label>
              {" "}
              VDRL Test
              <span className="text-red-600">*</span>
            </label>
            <select className="inputStyle" {...register("vdrlStat")}>
              {" "}
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="grid">
            <label>
              {" "}
              Date of Test
              <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              className="inputStyle"
              {...register("testDate")}
            />
          </div>
        </div>
      </FormBorder>
{
  (serologyStatus==="false") ? 
      <div className="mt-5">
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div> : <div className="mt-5">
        {currentStep == steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
}
    </form>
  );
};

export default StatusOfBaby;
