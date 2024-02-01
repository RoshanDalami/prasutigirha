"use client";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StepperContext } from "../stepper/StepperContext";
import { useRouter } from "next/navigation";
import FormRender from "../form/FormRender";
import StepperControl from "../stepper/StepperControl";
import FormBorder from "../reusableForm";
import RadioInput from "../radioInput";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const defaultValues = {
  acuteInfection: "",
  chronicInfection: "",
  cancer: "",
  emunDisease: "",
  cough: "",
  chickenPox: "",
  std: "",
  medicineTaken: "",
  bloodTaken: "",
  habits: "",
};

const VerbalExamination = ({
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
    // resolver: sarakxanValidation,
  });

  useEffect(() => {
    if (userData) {
      setDefaultValuesWithUserData({
        acuteInfection: userData.acuteInfection || "",
        chronicInfection: userData.chronicInfection || "",
        cancer: userData.cancer || "",
        emunDisease: userData.emunDisease || "",
        cough: userData.cough || "",
        chickenPox: userData.chickenPox || "",
        std: userData.std || "",
        medicineTaken: userData.medicineTaken || "",
        bloodTaken: userData.bloodTaken || "",
        habits: userData.habits || "",
      });
      setValue("acuteInfection", userData.acuteInfection || "");
      setValue("chronicInfection", userData.chronicInfection || "");
      setValue("cancer", userData.cancer || "");
      setValue("emunDisease", userData.emunDisease || "");
      setValue("cough", userData.cough || "");
      setValue("chickenPox", userData.chickenPox || "");
      setValue("std", userData.std || "");
      setValue("chickenPox", userData.chickenPox || "");
      setValue("medicineTaken", userData.medicineTaken || "");
      setValue("bloodTaken", userData.bloodTaken || "");
      setValue("habits", userData.habits || "");
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBorder title={"Add Donor Verbal Examination"}>
        <div className="grid grid-cols-2 gap-10 text-lg my-4 mx-4">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Acute Infection
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
                {...register("acuteInfection")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("acuteInfection")}
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Chronic Infection
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
                {...register("chronicInfection")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("chronicInfection")}
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Leukemia/Lymphoma/Cancer treatment within 3 Years :
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
                {...register("cancer")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("cancer")}
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Auto Emun Disease (RA,Lupus,GBS,Multiple Sclerosis,Type 1 DM):
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
                {...register("emunDisease")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("emunDisease")}
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Cough more than 2 weeks :
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
                {...register("cough")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("cough")}
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Chicken pox from one month to any person from home :
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
                {...register("chickenPox")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("chickenPox")}
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Sexually Transmitted Disease to your sexual partner from last 1
              years :
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
                {...register("std")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("std")}
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Any Medicine ( Cancer, Antisicotik, Radioactive, Thyroid) :
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
                {...register("medicineTaken")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("medicineTaken")}
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Transplant or Blood Taken from last 1 years :
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
                {...register("bloodTaken")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("bloodTaken")}
              />
            </RadioGroup>
          </FormControl>
          <div className="grid gap-2">
            <label htmlFor=""> Life Style ( Smoking/Drinking/Drugs):</label>
            <div className="flex gap-4">
              <div className="flex gap-1">
                <input type="radio" {...register("habits")} />
                <label>Smoking</label>
              </div>
              <div className="flex gap-1">
                <input type="radio" {...register("habits")} />
                <label>Drinking</label>
              </div>
              <div className="flex gap-1">
                <input type="radio" {...register("habits")} />
                <label>Drugs</label>
              </div>
            </div>
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

export default VerbalExamination;
