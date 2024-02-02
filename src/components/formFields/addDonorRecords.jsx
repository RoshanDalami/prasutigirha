"use client";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StepperContext } from "../stepper/StepperContext";
import StepperControl from "../stepper/StepperControl";
import { useRouter } from "next/navigation";
import FormRender from "../form/FormRender";
import FormBorder from "../reusableForm";
import Button from "../button";
const defaultValues = {
  hosRegNo: "",
  donorRegNo: "",
  date: "",
  time: "",
  donor_FullName: "",
  donorAge: "",
  education: "",
  ethnicity: "",
  address: "",
  contactNo: "",
  ageOfChild: "",
  gestationalAge: "",
  modeOfDelivery: "",
  parity: "",
};
const formField = [
  {
    name: "fullNameEnglish",
    label: "पुरानाम,थर(अंग्रेजीमा) ",
    type: "text",
    placeholder: "Enter your name in English",
  },
  {
    name: "fullName_NepSchema",
    label: "पुरानाम,थर(नेपालीमा)",
    type: "text",
    placeholder: "पुरानाम,थर(नेपालीमा)",
  },
  {
    name: "gender",
    label: "लिङ्ग",
    type: "select",
    defaultValue: "लिङ्ग छान्नुहोस् ",
  },
  {
    name: "age",
    label: "उमेर",
    type: "number",
    placeholder: "उमेर",
  },
  {
    name: "mobileNo",
    label: "मोबाइल नं.",
    type: "number",
    placeholder: "मोबाइल नं.",
  },
  {
    name: "contact",
    label: "मोबाइल नं.(optional)",
    type: "number",
    placeholder: "मोबाइल नं.(optional)",
  },
  {
    name: "citznshipNo",
    label: "ना.प्र.प.नं / ज.द.नं",
    type: "text",
    placeholder: "ना.प्र.प.नं / ज.द.नं",
  },
  {
    name: "citznIssueDistrict",
    label: "नागरिकता जारी गरिएको जिल्ला",
    type: "select",
    defaultValue: "--नागरिकता जारी गरिएको जिल्ला--",
  },
  {
    name: "education",
    label: "शिक्षा स्थर",
    type: "select",
    defaultValue: "--शिक्षा स्थर छान्नुहोस्--",
  },
  {
    name: "occupation",
    label: "पेशा",
    type: "select",
    defaultValue: "--पेशा छान्नुहोस्--",
  },
  {
    name: "bloodGroup",
    label: "रक्त समूह",
    type: "select",
    defaultValue: "--रक्त समूह छान्नुहोस्--",
  },
];
const AddDonorRecord = ({ handleClick, currentStep, steps, clickedIdData }) => {
  const { userData, setUserData } = useContext(StepperContext);
  const [defaultValuesWithUserData, setDefaultValuesWithUserData] =
    useState("");
  const { query } = useRouter();

  const {
    control,
    register,

    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
  } = useForm({
    // defaultValues: defaultValuesWithUserData,
  });

  useEffect(() => {
    if (userData) {
      setDefaultValuesWithUserData({
        fullName_Eng: userData.fullName_Eng || "",
        fullName_Nep: userData.fullName_Nep || "",
        mobileNo: userData.mobileNo || "",
        citznshipNo: userData.citznshipNo || "",
        age: userData.age || "",
        gender: userData.gender || "",
        education: userData.education || "",
        occupation: userData.occupation || "",
        bloodGroup: userData.bloodGroup || "",
      });
      setValue("fullName_Eng", userData.fullName_Eng || ""); // pass setValue to the dependencies array and use it directly
      setValue("fullName_Nep", userData.fullName_Nep || "");
      setValue("mobileNo", userData.mobileNo || "");
      setValue("citznshipNo", userData.citznshipNo || "");
      setValue("age", userData.age || "");
      setValue("gender", userData.gender || defaultValues.gender);
      setValue("education", userData.education || defaultValues.education);
      setValue("occupation", userData.occupation || defaultValues.occupation);
      setValue("bloodGroup", userData.bloodGroup || defaultValues.bloodGroup);
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
  const [isExternal, setIsExternal] = useState(false);
  function handleExternal(e) {
    setIsExternal(!isExternal);
    e.preventDefault(false);
  }
  const validationRules = {
    hosRegNo: { required: "Hospital Registration Number is required" },
    date: { required: "Date is required" },
    time: { required: "Time is required" },
    donor_FullName: { required: "Donor Full Name is required" },
    donorAge: { required: "Donor Age is required", pattern: /^\d+$/ }, // Example pattern for numeric input
    // Add validation rules for other fields as needed
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBorder title={"Add Donor Records"}>
        <div className="flex justify-end">
          {isExternal ? (
            <div className="font-bold  text-xl  " onClick={handleExternal}>
              <Button>Internal</Button>
            </div>
          ) : (
            <div className="font-bold text-xl " onClick={handleExternal}>
              <Button>External</Button>
            </div>
          )}
        </div>
        <div className="md:grid-cols-2 grid text-lg gap-4">
          {/* <div className="grid"> */}
          <div className={`grid ${isExternal ? "hidden" : "block"}`}>
            <label>
              {" "}
              Hospital Registration Number
              <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Hospital Registration Number"
              className="inputStyle"
              {...register("hosRegNo")}
            />
          </div>
          <div className="grid">
            <label>
              {" "}
              Date<span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              placeholder=""
              className="inputStyle"
              {...register("date")}
            />
          </div>
          <div className="grid">
            <label>
              {" "}
              Time<span className="text-red-600">*</span>
            </label>
            <input
              type="time"
              placeholder=""
              className="inputStyle"
              {...register("time")}
            />
          </div>
          <div className="grid">
            <label>
              {" "}
              Donor Full Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Donar Full Name"
              className="inputStyle"
              {...register("donor_FullName")}
            />
          </div>
          <div className="grid">
            <label>
              {" "}
              Donor Age<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Donar Age"
              className="inputStyle"
              {...register("donorAge")}
            />
          </div>
          <div className="grid">
            <label>
              {" "}
              Education<span className="text-red-600">*</span>
            </label>
            <select className="inputStyle" {...register("education")}>
              <option></option>
            </select>
          </div>
          <div className="grid">
            <label>
              {" "}
              Ethnicity<span className="text-red-600">*</span>
            </label>
            <select className="inputStyle" {...register("ethnicity")}>
              <option>test</option>
            </select>
          </div>
          <div className="grid">
            <label>
              {" "}
              Address<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="inputStyle"
              {...register("address")}
            />
          </div>
          <div className="grid">
            <label>
              {" "}
              Contact Number<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Contact Number"
              className="inputStyle"
              {...register("contactNo")}
            />
          </div>
          <div className="grid">
            <label>
              {" "}
              Present Age of Child in Days (DOL)
              <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Present Age of Child"
              className="inputStyle"
              {...register("ageOfChild")}
            />
          </div>
          <div className="grid">
            <label>
              {" "}
              Gestational Age ( WOG)<span className="text-red-600">*</span>
            </label>
            <select className="inputStyle" {...register("gestationalAge")}>
              <option>test</option>
            </select>
          </div>
          <div className="grid">
            <label>
              {" "}
              Mode Of Delivery<span className="text-red-600">*</span>
            </label>
            <select className="inputStyle" {...register("modeOfDelivery")}>
              <option>test</option>
            </select>
          </div>
          <div className="grid">
            <label>
              {" "}
              Parity<span className="text-red-600">*</span>
            </label>
            <select className="inputStyle" {...register("parity")}>
              <option>test</option>
            </select>
          </div>
        </div>
      </FormBorder>

      <div>
        {/* {updatedFormField?.map((formField) => {
          return (
            <Controller
              key={formField.name}
              name={formField.name}
              control={control}
              render={({ field: controllerField }) => {
                return (
                  <FormRender
                    controllerField={controllerField}
                    formField={formField}
                    errors={errors}
                    isSubmitting={isSubmitting}
                  />
                );
              }}
            />
          );
        })} */}
      </div>

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

export default AddDonorRecord;
