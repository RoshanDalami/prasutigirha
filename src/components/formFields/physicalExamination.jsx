"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useRouter } from "next/navigation";
import StepperControl from "../stepper/StepperControl";
import { StepperContext } from "../stepper/StepperContext";
import FormBorder from "../reusableForm";
import RadioInput from "../radioInput";
const defaultValues = {
  mastitis: "",
  localLesions: "",
  fugalInNipple: "",
  herpes: "",
  others: "",
  signature: "",
  helperEmployee: "",
};

const PhysicalExamination = ({
  handleClick,
  currentStep,
  steps,
  clickedIdData,
}) => {
  const { userData, setUserData } = useContext(StepperContext);
  const [defaultValuesWithUserData, setDefaultValuesWithUserData] =
    useState("");
  const { query } = useRouter();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: defaultValuesWithUserData,
  });

  useEffect(() => {
    if (userData) {
      setDefaultValuesWithUserData({
        mastitis: userData.mastitis || "",
        localLesions: userData.localLesions || "",
        fugalInNipple: userData.fugalInNipple || "",
        herpes: userData.herpes || "",
        others: userData.others || "",
        helperEmployee: userData.helperEmployee || "",
        signature: userData.signature || "",
      });
      setValue("mastitis", userData.mastitis || ""); // pass setValue to the dependencies array and use it directly
      setValue("localLesions", userData.localLesions || "");
      setValue("fugalInNipple", userData.fugalInNipple || "");
      setValue("herpes", userData.herpes || "");
      setValue("others", userData.others || "");
      setValue("helperEmployee", userData.helperEmployee || "");
      setValue("signature", userData.signature || "");
    } else {
      setDefaultValuesWithUserData(defaultValues);
    }
  }, [userData, setValue]);

  const onSubmit = (data) => {
    setUserData({ ...userData, ...data });
    localStorage.setItem("userData", JSON.stringify({ ...userData, ...data }));
    handleClick("next");
    console.log(userData,data, "This is data");
  };

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    // Trigger a click on the hidden file input
    fileInputRef.current.click();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBorder title={"Add Donor Physical Examination"}>
        <div className="grid grid-cols-2 gap-5 text-lg my-4 mx-4">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Mastitis</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Yes"
                {...register("mastitis")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("mastitis")}
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Local Lesions :
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Yes"
                {...register("localLesions")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("localLesions")}
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Fugal in Nipple and Areola :
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Yes"
                {...register("fugalInNipple")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("fugalInNipple")}
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Herpes Zoster :
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Yes"
                {...register("herpes")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("herpes")}
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Others :</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Yes"
                {...register("others")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("others")}
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div
          className="flex justify-center items-center border border-gray-400 w-[250px] h-[150px]"
          onClick={handleButtonClick}
        >
          Upload your Signature
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            {...register("signature")}
          />
        </div>
        <div className="grid grid-cols-2 mt-5">
          <input
            className="inputStyle"
            placeholder="Breast Feeding Helper Employee Name"
            {...register("helperEmployee")}
          />
        </div>
      </FormBorder>
      <div className=" mt-5 ">
        {currentStep === steps.length && (
          <StepperControl
            handleClick={handleClick}
            // handleClick={handleNext}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
    </form>
  );
};

export default PhysicalExamination;
