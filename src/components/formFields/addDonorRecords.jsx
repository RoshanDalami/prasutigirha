"use client";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StepperContext } from "../stepper/StepperContext";
import StepperControl from "../stepper/StepperControl";
import { useRouter } from "next/navigation";
import FormRender from "../form/FormRender";
import FormBorder from "../reusableForm";
import Button from "../button";
import axios from "axios";
import { urls } from "src/services/apiHelpers";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
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
const educationList = [
  { name: "School Level", id: 1 },
  { name: "High School", id: 2 },
  { name: "Bachelor Degree", id: 3 },
  { name: "Master Degree", id: 4 },
  { name: "Doctorate", id: 5 },
  { name: "Other", id: 6 },
];

const AddDonorRecord = ({ handleClick, currentStep, steps, clickedIdData }) => {
  const { userData, setUserData } = useContext(StepperContext);
  const [defaultValuesWithUserData, setDefaultValuesWithUserData] =
    useState("");
  const router = useRouter();

  //ethnicity
  const [ethnicityList, setEthnicity] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await axios.get(`${urls.getEthnicity}`);
      if (status === 200) {
        setEthnicity(data);
      }
    }
    fetchData();
  }, []);
  const ethnicityOptions = ethnicityList?.map((item, index) => {
    return (
      <option key={index} value={item.ethnicityName}>
        {item.ethnicityName}
      </option>
    );
  });

  //gestationalAge
  const [gestationalAgeList, setGestationalAgeList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await axios.get(`${urls.getGestational}`);
      if (status === 200) {
        setGestationalAgeList(data);
      }
    };
    fetchData();
  }, []);
  const gestationalOptions = gestationalAgeList?.map((item, index) => {
    return (
      <option key={index} value={item.gestationalId}>
        {item.gestationalName}
      </option>
    );
  });

  //modeOfDelivery
  const [modeOfDeliveryList, setModeOfDeliveryList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getDelivery}`);
      if (status === 200) {
        setModeOfDeliveryList(data);
      }
    }
    fetchData();
  }, []);

  const deliveryOptions = modeOfDeliveryList?.map((item, index) => {
    return (
      <option key={index} value={item.deliveryId}>
        {item.deliveryName}
      </option>
    );
  });

  //parity
  const [parityList, setParityList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await axios.get(`${urls.getParity}`);
      if (status === 200) {
        setParityList(data);
      }
    }
    fetchData();
  }, []);
  const parityOptions = parityList?.map((item, index) => {
    return (
      <option key={index} value={item.parityId}>
        {item.parityName}
      </option>
    );
  });

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
    if (clickedIdData) {
      setValue("_id", clickedIdData?._id);
      setValue("hosRegNo", clickedIdData?.hosRegNo);
      setValue("donorRegNo", clickedIdData?.donorRegNo);
      setValue("date", clickedIdData?.date);
      setValue("time", clickedIdData?.time);
      setValue("donor_FullName", clickedIdData?.donor_FullName);
      setValue("donorAge", clickedIdData?.donorAge);
      setValue("education", clickedIdData?.education);
      setValue("ethnicity", clickedIdData?.ethnicity);
      setValue("address", clickedIdData?.address);
      setValue("contactNo", clickedIdData?.contactNo);
      setValue("ageOfChild", clickedIdData?.ageOfChild);
      setValue("gestationalAge", clickedIdData?.gestationalAge);
      setValue("modeOfDelivery", clickedIdData?.modeOfDelivery);
      setValue("parity", clickedIdData?.parity);
    } else if (userData) {
      setDefaultValuesWithUserData({
        hosRegNo: userData.hosRegNo || "",
        donorRegNo: userData.donorRegNo || "",
        date: userData.date || "",
        time: userData.time || "",
        donor_FullName: userData.donor_FullName || "",
        donorAge: userData.donorAge || "",
        education: userData.education || "",
        ethnicity: userData.ethnicity || "",
        address: userData.address || "",
        contactNo: userData.contactNo || "",
        ageOfChild: userData.ageOfChild || "",
        gestationalAge: userData.gestationalAge || "",
        modeOfDelivery: userData.modeOfDelivery || "",
        parity: userData.parity || "",
      });
      setValue("hosRegNo", userData.hosRegNo || ""); // pass setValue to the dependencies array and use it directly
      setValue("donorRegNo", userData.donorRegNo || "");
      setValue("date", userData.date || "");
      setValue("time", userData.time || "");
      setValue("donor_FullName", userData.donor_FullName || "");
      setValue("donorAge", userData.donorAge || defaultValues.donorAge);
      setValue("education", userData.education || defaultValues.education);
      setValue("ethnicity", userData.ethnicity || defaultValues.ethnicity);
      setValue("address", userData.address || defaultValues.address);
      setValue("contactNo", userData.contactNo || defaultValues.contactNo);
      setValue("ageOfChild", userData.ageOfChild || defaultValues.ageOfChild);
      setValue(
        "modeOfDelivery",
        userData.modeOfDelivery || defaultValues.modeOfDelivery
      );
      setValue(
        "gestationalAge",
        userData.gestationalAge || defaultValues.gestationalAge
      );
      setValue("parity", userData.parity || defaultValues.parity);
    } else {
      setDefaultValuesWithUserData(defaultValues);
    }
  }, [userData, clickedIdData, setValue]);
  console.log(clickedIdData, "donordata");
  const onSubmit = (data) => {
    setUserData({ ...userData, ...data });
    localStorage.setItem("userData", JSON.stringify({ ...userData, ...data }));
    handleClick("next");
    console.log(userData, "response");
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
              type="number"
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
              <option selected disabled>
                --Select Education--
              </option>
              {educationList?.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
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
              <option selected disabled value={""}>
                --Select Ethnicity--
              </option>
              {ethnicityOptions}
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
              type="number"
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
              type="number"
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
                valueAsNumber: true,
              })}
            >
              <option selected disabled value={""}>
                --Select Gestational Age--
              </option>
              {gestationalOptions}
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
                valueAsNumber: true,
              })}
            >
              <option selected disabled value={""}>
                --Select Mode Of Delivery--
              </option>
              {deliveryOptions}
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
              {...register("parity", {
                required: "Parity Required",
                valueAsNumber: true,
              })}
            >
              <option selected disabled value={""}>
                --Select Parity--
              </option>
              {parityList?.map((item, index) => {
                return (
                  <option key={index} value={item.parityId}>
                    {item.parityName}
                  </option>
                );
              })}
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
