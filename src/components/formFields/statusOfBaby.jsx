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

const StatusOfBaby = ({ handleClick, currentStep, steps, clickedIdData }) => {
  const [defaultValuesWithUserData, setDefaultValuesWithUserData] =
    useState("");
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
    setUserData({ ...userData, ...data });
    localStorage.setItem("userData", JSON.stringify({ ...userData, ...data }));
    handleClick("next");
    console.log(userData, "This is data");
  };

  const watchAllFields = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBorder title={" Status of Baby"}>
        <p className="font-bold text-xl py-5 ">Add Status of Baby:</p>
        <div className="grid md:grid-cols-2 gap-4 text-lg">
          <div className="flex flex-col">
            <label>
              {" "}
              Date of Birth<span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              placeholder=""
              className="inputStyle"
              {...register("birthDate", { required: "DOB Required" })}
            />
            {errors.birthDate && (
              <p className="errorMessages">{errors.birthDate.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              {" "}
              Baby Status
              <span className="text-red-600">*</span>
            </label>
            <select
              className="inputStyle"
              {...register("babyStat", { required: "Baby Status Required" })}
            >
              <option>Select Your Baby Status</option>
              <option>Normal</option>
              <option>Birth Asphylexia</option>
              <option>Preterm </option>
              <option>Sepsis</option>
              <option>Jaundice</option>
              <option>Other</option>
            </select>
            {errors.babyStat && (
              <p className="errorMessages">{errors.babyStat.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Baby Transfer Status
              <span className="text-red-600">*</span>
            </label>
            <select
              className="inputStyle"
              {...register("babyTransferStat", {
                required: "Baby Transfer Status Required",
              })}
            >
              <option>Select Your Baby Status</option>
              <option>NICU</option>
            </select>
            {errors.babyTransferStat && (
              <p className="errorMessages">{errors.babyTransferStat.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              {" "}
              Baby Breast Feeding Status
              <span className="text-red-600">*</span>
            </label>
            <select
              className="inputStyle"
              {...register("breastFeedStat", {
                required: "Breast Feeding Stat Required",
              })}
            >
              <option>Select Your Baby Status</option>
              <option>Exclusive Breast Feeding</option>
              <option>Partial Breast Feeding</option>
              <option>Formula Milk Only </option>
              <option>NPO</option>
              <option>PDHM</option>
            </select>
            {errors.breastFeedStat && (
              <p className="errorMessages">{errors.breastFeedStat.message}</p>
            )}
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
            <select
              className="inputStyle"
              {...register("hivStat", {
                required: "Yes/No Required",
              })}
            >
              {" "}
              <option>Yes</option>
              <option>No</option>
            </select>
            {errors.hivStat && (
              <p className="errorMessages">{errors.hivStat.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              {" "}
              HBSAG Test
              <span className="text-red-600">*</span>
            </label>
            <select
              className="inputStyle"
              {...register("hbsagStat", {
                required: "Yes/No Required",
              })}
            >
              {" "}
              <option>Yes</option>
              <option>No</option>
            </select>
            {errors.hbsagStat && (
              <p className="errorMessages">{errors.hbsagStat.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              {" "}
              VDRL Test
              <span className="text-red-600">*</span>
            </label>
            <select
              className="inputStyle"
              {...register("vdrlStat", {
                required: "Yes/No Required",
              })}
            >
              {" "}
              <option>Yes</option>
              <option>No</option>
            </select>
            {errors.vdrlStat && (
              <p className="errorMessages">{errors.vdrlStat.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              {" "}
              Date of Test
              <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              className="inputStyle"
              {...register("testDate", {
                required: "Yes/No Required",
              })}
            />
            {errors.testDate && (
              <p className="errorMessages">{errors.testDate.message}</p>
            )}
          </div>
        </div>
      </FormBorder>

      <div className="mt-5">
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
    </form>
  );
};

export default StatusOfBaby;
