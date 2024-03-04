"use client";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StepperContext } from "../stepper/StepperContext";
import { useRouter } from "next/navigation";

import StepperControl from "../stepper/StepperControl";
import FormBorder from "../reusableForm";

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
  cancerTreatmentWithinThreeYears: "",
  autoImmuneDisease: "",
  coughMoreThanTwoWeeks: "",
  chickenpox: "",
  stdLastOneYear: "",
  medCancerAntisicotikRadioactiveThyroid: "",
  transplantAndBloodTaken: "",
  BadLifeStyle: "",
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
    if (clickedIdData) {
      setValue(
        "acuteInfection",
        clickedIdData?.verbalExamination?.acuteInfection
      );
      setValue(
        "chronicInfection",
        clickedIdData?.verbalExamination?.chronicInfection
      );
      setValue(
        "cancerTreatmentWithinThreeYears",
        clickedIdData?.verbalExamination?.cancerTreatmentWithinThreeYears
      );
      setValue(
        "autoImmuneDisease",
        clickedIdData?.verbalExamination?.autoImmuneDisease
      );
      setValue(
        "coughMoreThanTwoWeeks",
        clickedIdData?.verbalExamination?.coughMoreThanTwoWeeks
      );
      setValue("chickenpox", clickedIdData?.verbalExamination?.chickenpox);
      setValue(
        "stdLastOneYear",
        clickedIdData?.verbalExamination?.stdLastOneYear
      );
      setValue(
        "medCancerAntisicotikRadioactiveThyroid",
        clickedIdData?.verbalExamination?.medCancerAntisicotikRadioactiveThyroid
      );
      setValue(
        "transplantAndBloodTaken",
        clickedIdData?.verbalExamination?.transplantAndBloodTaken
      );
      setValue("BadLifeStyle", clickedIdData?.verbalExamination?.BadLifeStyle);
    } else if (userData) {
      setDefaultValuesWithUserData({
        acuteInfection: userData.acuteInfection || "",
        chronicInfection: userData.chronicInfection || "",
        cancerTreatmentWithinThreeYears:
          userData.cancerTreatmentWithinThreeYears || "",
        autoImmuneDisease: userData.autoImmuneDisease || "",
        coughMoreThanTwoWeeks: userData.coughMoreThanTwoWeeks || "",
        chickenpox: userData.chickenpox || "",
        stdLastOneYear: userData.stdLastOneYear || "",
        medCancerAntisicotikRadioactiveThyroid:
          userData.medCancerAntisicotikRadioactiveThyroid || "",
        transplantAndBloodTaken: userData.transplantAndBloodTaken || "",
        BadLifeStyle: userData.BadLifeStyle || "",
      });
      setValue("acuteInfection", userData.acuteInfection || "");
      setValue("chronicInfection", userData.chronicInfection || "");
      setValue(
        "cancerTreatmentWithinThreeYears",
        userData.cancerTreatmentWithinThreeYears || ""
      );
      setValue("autoImmuneDisease", userData.autoImmuneDisease || "");
      setValue("coughMoreThanTwoWeeks", userData.coughMoreThanTwoWeeks || "");
      setValue("chickenpox", userData.chickenpox || "");
      setValue("stdLastOneYear", userData.stdLastOneYear || "");
      setValue(
        "medCancerAntisicotikRadioactiveThyroid",
        userData.medCancerAntisicotikRadioactiveThyroid || ""
      );
      setValue(
        "transplantAndBloodTaken",
        userData.transplantAndBloodTaken || ""
      );
      setValue("BadLifeStyle", userData.BadLifeStyle || "");
    } else {
      setDefaultValuesWithUserData(defaultValues);
    }
  }, [userData, setValue, clickedIdData]);

  const onSubmit = (data) => {
    setUserData({
      ...userData,
      verbalExamination: {
        acuteInfection: JSON.parse(data.acuteInfection),
        chronicInfection: JSON.parse(data.chronicInfection),
        cancerTreatmentWithinThreeYears: JSON.parse(
          data.cancerTreatmentWithinThreeYears
        ),
        autoImmuneDisease: JSON.parse(data.autoImmuneDisease),
        coughMoreThanTwoWeeks: JSON.parse(data.coughMoreThanTwoWeeks),
        chickenpox: JSON.parse(data.chickenpox),
        stdLastOneYear: JSON.parse(data.stdLastOneYear),
        medCancerAntisicotikRadioactiveThyroid: JSON.parse(
          data.medCancerAntisicotikRadioactiveThyroid
        ),
        transplantAndBloodTaken: JSON.parse(data.transplantAndBloodTaken),
        BadLifeStyle: data.BadLifeStyle,
      },
    });
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...userData,
        verbalExamination: {
          acuteInfection: JSON.parse(data.acuteInfection),
          chronicInfection: JSON.parse(data.chronicInfection),
          cancerTreatmentWithinThreeYears: JSON.parse(
            data.cancerTreatmentWithinThreeYears
          ),
          autoImmuneDisease: JSON.parse(data.autoImmuneDisease),
          coughMoreThanTwoWeeks: JSON.parse(data.coughMoreThanTwoWeeks),
          chickenpox: JSON.parse(data.chickenpox),
          stdLastOneYear: JSON.parse(data.stdLastOneYear),
          medCancerAntisicotikRadioactiveThyroid: JSON.parse(
            data.medCancerAntisicotikRadioactiveThyroid
          ),
          transplantAndBloodTaken: JSON.parse(data.transplantAndBloodTaken),
          BadLifeStyle: data.BadLifeStyle,
        },
      })
    );
    handleClick("next");
    console.log(userData, "response");
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
                {...register("acuteInfection", {
                  required: "This field required",
                })}
              />

              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("acuteInfection", {
                  required: "This field required",
                })}
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
                {...register("chronicInfection", {
                  required: "This field required",
                })}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("chronicInfection", {
                  required: "This field required",
                })}
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
                {...register("cancerTreatmentWithinThreeYears", {
                  required: "This field required",
                })}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("cancerTreatmentWithinThreeYears", {
                  required: "This field required",
                })}
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
                {...register("autoImmuneDisease", {
                  required: "This field required",
                })}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("autoImmuneDisease", {
                  required: "This field required",
                })}
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
                {...register("coughMoreThanTwoWeeks", {
                  required: "This field required",
                })}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("coughMoreThanTwoWeeks", {
                  required: "This field required",
                })}
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
                {...register("chickenpox", {
                  required: "This field required",
                })}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("chickenpox", {
                  required: "This field required",
                })}
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
                {...register("stdLastOneYear", {
                  required: "This field required",
                })}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("stdLastOneYear", {
                  required: "This field required",
                })}
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
                {...register("medCancerAntisicotikRadioactiveThyroid", {
                  required: "This field required",
                })}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("medCancerAntisicotikRadioactiveThyroid", {
                  required: "This field required",
                })}
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
                {...register("transplantAndBloodTaken", {
                  required: "This field required",
                })}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("transplantAndBloodTaken", {
                  required: "This field required",
                })}
              />
            </RadioGroup>
          </FormControl>
          <div className="grid gap-2">
            <label htmlFor=""> Life Style ( Smoking/Drinking/Drugs):</label>
            <div className="flex gap-4">
              <div className="flex gap-1">
                <input
                  id="smoking"
                  type="radio"
                  value="smoking"
                  {...register("BadLifeStyle", {
                    required: "This field required",
                  })}
                />
                <label>Smoking</label>
              </div>
              <div className="flex gap-1">
                <input
                  id="drinking"
                  type="radio"
                  value="drinking"
                  {...register("BadLifeStyle", {
                    required: "This field required",
                  })}
                />
                <label>Drinking</label>
              </div>
              <div className="flex gap-1">
                <input
                  id="drugs"
                  type="radio"
                  value="drugs"
                  {...register("BadLifeStyle", {
                    required: "This field required",
                  })}
                />
                <label>Drugs</label>
              </div>
              <div className="flex gap-1">
                <input
                  id="drugs"
                  type="radio"
                  value="No"
                  {...register("BadLifeStyle", {
                    required: "This field required",
                  })}
                />
                <label>None</label>
              </div>
            </div>
          </div>
          {/* <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Life Style ( Smoking/Drinking/Drugs):
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
                {...register("transplantAndBloodTaken", {
                  required: "This field required",
                })}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("transplantAndBloodTaken", {
                  required: "This field required",
                })}
              />
            </RadioGroup>
          </FormControl> */}
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
