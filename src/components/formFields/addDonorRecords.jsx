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
          <div className={`flex flex-col ${isExternal ? "hidden" : "block"}`}>
            <label>
              {" "}
              Hospital Registration Number
              <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Hospital Registration Number"
              className="inputStyle"
              {...register("hosRegNo", {
                required: "Hospital Registration Number is required",
              })}
            />
            {errors.hosRegNo && (
              <p className="errorMessages">{errors.hosRegNo.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              {" "}
              Date<span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              placeholder=""
              className="inputStyle"
              {...register("date", { required: "Date is Required" })}
            />
            {errors.date && (
              <p className="errorMessages">{errors.date.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              {" "}
              Time<span className="text-red-600">*</span>
            </label>
            <input
              type="time"
              placeholder=""
              className="inputStyle"
              {...register("time", { required: "Time is Required" })}
            />
            {errors.time && (
              <p className="errorMessages">{errors.time.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              {" "}
              Donor Full Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Donar Full Name"
              className="inputStyle"
              {...register("donor_FullName", {
                required: "Donor Name Required",
              })}
            />
            {errors.donor_FullName && (
              <p className="errorMessages">{errors.donor_FullName.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              {" "}
              Donor Age<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Donar Age"
              className="inputStyle"
              {...register("donorAge", { required: "Donor Age Required" })}
            />
            {errors.donorAge && (
              <p className="errorMessages">{errors.donorAge.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              {" "}
              Education<span className="text-red-600">*</span>
            </label>
            <select
              className="inputStyle"
              {...register("education", { required: "Education Required" })}
            >
              <option>test</option>
            </select>
            {errors.education && (
              <p className="errorMessages">{errors.education.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              {" "}
              Ethnicity<span className="text-red-600">*</span>
            </label>
            <select
              className="inputStyle"
              {...register("ethnicity", { required: "Ethnicity Required" })}
            >
              <option>test</option>
            </select>
            {errors.ethnicity && (
              <p className="errorMessages">{errors.ethnicity.message}</p>
            )}
          </div>
          <div className="flex-col flex">
            <label>
              {" "}
              Address<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="inputStyle"
              {...register("address", { required: "Address Required" })}
            />
            {errors.address && (
              <p className="errorMessages">{errors.address.message}</p>
            )}
          </div>
          <div className="flex-col flex">
            <label>
              {" "}
              Contact Number<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Contact Number"
              className="inputStyle"
              {...register("contactNo", {
                required: "Contact Number Required",
              })}
            />
            {errors.contactNo && (
              <p className="errorMessages">{errors.contactNo.message}</p>
            )}
          </div>
          <div className="flex-col flex">
            <label>
              {" "}
              Present Age of Child in Days (DOL)
              <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Present Age of Child"
              className="inputStyle"
              {...register("ageOfChild", { required: "Age Required" })}
            />
            {errors.ageOfChild && (
              <p className="errorMessages">{errors.ageOfChild.message}</p>
            )}
          </div>
          <div className="flex-col flex">
            <label>
              {" "}
              Gestational Age ( WOG)<span className="text-red-600">*</span>
            </label>
            <select
              className="inputStyle"
              {...register("gestationalAge", {
                required: " Gestational Age Required",
              })}
            >
              <option>test</option>
            </select>
            {errors.gestationalAge && (
              <p className="errorMessages">{errors.gestationalAge.message}</p>
            )}
          </div>
          <div className="flex-col flex">
            <label>
              {" "}
              Mode Of Delivery<span className="text-red-600">*</span>
            </label>
            <select
              className="inputStyle"
              {...register("modeOfDelivery", {
                required: "Mode of Delivery Required",
              })}
            >
              <option>test</option>
            </select>
            {errors.modeOfDelivery && (
              <p className="errorMessages">{errors.modeOfDelivery.message}</p>
            )}
          </div>
          <div className="flex-col flex">
            <label>
              {" "}
              Parity<span className="text-red-600">*</span>
            </label>
            <select
              className="inputStyle"
              {...register("parity", { required: "Parity Required" })}
            >
              <option>test</option>
            </select>
            {errors.parity && (
              <p className="errorMessages">{errors.parity.message}</p>
            )}
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
