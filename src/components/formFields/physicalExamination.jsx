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
import axios from "axios";
import { urls } from "src/services/apiHelpers";
import { submittingAtom } from "src/recoil/isSubmiting/submittingAtom";
import { useSetRecoilState } from "recoil";
const defaultValues = {
  mastitis: "",
  localLesions: "",
  fugalInNippleAreola: "",
  herpesZoster: "",
  others: "",
  signature: "",
  doctorName: "",
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
  const setSubmitting = useSetRecoilState(submittingAtom);

  const router = useRouter();
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
    setSubmitting(isSubmitting);
  }, [isSubmitting, setSubmitting]);

  useEffect(() => {
    if (clickedIdData) {
      setValue(
        "mastitis",
        clickedIdData?.donorPhysicalExamination?.mastitis || ""
      ); // pass setValue to the dependencies array and use it directly
      setValue(
        "localLesions",
        clickedIdData?.donorPhysicalExamination?.localLesions || ""
      );
      setValue(
        "fugalInNippleAreola",
        clickedIdData?.donorPhysicalExamination?.fugalInNippleAreola || ""
      );
      setValue(
        "herpesZoster",
        clickedIdData?.donorPhysicalExamination?.herpesZoster || ""
      );
      setValue("others", clickedIdData?.donorPhysicalExamination?.others || "");
      setValue(
        "doctorName",
        clickedIdData?.donorPhysicalExamination?.doctorName || ""
      );
      setValue(
        "signature",
        clickedIdData?.donorPhysicalExamination?.signature || ""
      );
    } else if (userData) {
      setDefaultValuesWithUserData({
        mastitis: userData.mastitis || "",
        localLesions: userData.localLesions || "",
        fugalInNippleAreola: userData.fugalInNippleAreola || "",
        herpesZoster: userData.herpesZoster || "",
        others: userData.others || "",
        doctorName: userData.doctorName || "",
        signature: userData.signature || "",
      });
      setValue("mastitis", userData.mastitis || ""); // pass setValue to the dependencies array and use it directly
      setValue("localLesions", userData.localLesions || "");
      setValue("fugalInNippleAreola", userData.fugalInNippleAreola || "");
      setValue("herpesZoster", userData.herpesZoster || "");
      setValue("others", userData.others || "");
      setValue("doctorName", userData.doctorName || "");
      setValue("signature", userData.signature || "");
    } else {
      setDefaultValuesWithUserData(defaultValues);
    }
  }, [userData, setValue, clickedIdData]);

  const onSubmit = async (data) => {
    setUserData({
      ...userData,
      donorPhysicalExamination: {
        mastitis: JSON.parse(data.mastitis),
        localLesions: JSON.parse(data.localLesions),
        fugalInNippleAreola: JSON.parse(data.fugalInNippleAreola),
        herpesZoster: JSON.parse(data.herpesZoster),
        doctorName: data.doctorName,
      },
    });
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...userData,
        donorPhysicalExamination: {
          mastitis: JSON.parse(data.mastitis),
          localLesions: JSON.parse(data.localLesions),
          fugalInNippleAreola: JSON.parse(data.fugalInNippleAreola),
          herpesZoster: JSON.parse(data.herpesZoster),
          doctorName: data.doctorName,
        },
      })
    );
    data = {
      ...userData,
      donorPhysicalExamination: {
        mastitis: JSON.parse(data.mastitis),
        localLesions: JSON.parse(data.localLesions),
        fugalInNippleAreola: JSON.parse(data.fugalInNippleAreola),
        herpesZoster: JSON.parse(data.herpesZoster),
        doctorName: data.doctorName,
      },
    };

    try {
      const response = await axios.post(`${urls.createDanaDarta}`, data);
      if (response.status === 200) {
        router.push("/donorRecord/viewDonorRecord");
      }
    } catch (error) {
      console.log(error, "response");
    }
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
                {...register("mastitis", {
                  required: true,
                })}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("mastitis", {
                  required: true,
                })}
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
                {...register("localLesions", {
                  required: true,
                })}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("localLesions", {
                  required: true,
                })}
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
                {...register("fugalInNippleAreola", {
                  required: true,
                })}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("fugalInNippleAreola", {
                  required: true,
                })}
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
                {...register("herpesZoster", {
                  required: true,
                })}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("herpesZoster", {
                  required: true,
                })}
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
                {...register("others", {
                  required: true,
                })}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
                {...register("others", {
                  required: true,
                })}
              />
            </RadioGroup>
          </FormControl>
        </div>

        {/* <div
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
        </div> */}
        <div className="flex flex-col mt-5">
          <input
            className="inputStyle"
            placeholder="Breast Feeding Helper Employee Name"
            {...register("doctorName", {
              required: "Name Required",
            })}
          />
          {errors.doctorName && (
            <p className="errorMessages">{errors.doctorName.message}</p>
          )}
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
