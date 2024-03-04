import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StepperContext } from "../stepper/StepperContext";
import { useRouter } from "next/navigation";
import StepperControl from "../stepper/StepperControl";
import FormBorder from "../reusableForm";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { urls } from "src/services/apiHelpers";
import axios from "axios";
import { useParams } from "next/navigation";
const aa = new BikramSambat(new Date()).toBS();
const defaultValues = {
  dateOfBirth: "",
  engDateBirth: "",
  babyFeeding: "",
  babyTransfer: "",
  babyStatus: "",
  hiv: "",
  hbsag: "",
  vdrl: "",
  dateOfTest: "",
  engDateTest: "",
};
import {
  serologyAtom,
  serologyAtom1,
  serologyAtom2,
} from "src/recoil/serology/serologyAtom";
import { useSetRecoilState, useRecoilValue } from "recoil";
const StatusOfBaby = ({ handleClick, currentStep, steps, clickedIdData }) => {
  const [defaultValuesWithUserData, setDefaultValuesWithUserData] =
    useState("");
  const setSerologyPositive = useSetRecoilState(serologyAtom);
  const setSerologyPositive1 = useSetRecoilState(serologyAtom1);
  const setSerologyPositive2 = useSetRecoilState(serologyAtom2);
  const serologyStatus = useRecoilValue(serologyAtom);
  const { userData, setUserData } = useContext(StepperContext);
  const router = useRouter();
  const { id } = useParams();

  //Nepali date
  const [birthDate, setBirthDate] = useState(aa);
  const [testDate, setTestDate] = useState(aa);
  const engDate = new BikramSambat(birthDate, "BS").toAD();
  const engTestDate = new BikramSambat(testDate, "BS").toAD();

  //babyStatus
  const [babyStatusList, setBabyStatusList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getBabyStatus}`);
      if (status === 200) {
        setBabyStatusList(data);
      }
    }
    fetchData();
  }, []);
  const babyStatusOptions = babyStatusList?.map((item, index) => {
    return (
      <option key={index} value={item.babyStatusId}>
        {item.babyStatusName}
      </option>
    );
  });
  //babyTransfer
  const [babyTransferList, setBabyTranferList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getBabyTransfer}`);
      if (status === 200) {
        setBabyTranferList(data);
      }
    }
    fetchData();
  }, []);
  const babyTransferOptions = babyTransferList?.map((item, index) => {
    return (
      <option key={index} value={item.babyTransferId}>
        {item.babyTransferName}
      </option>
    );
  });
  //babyTransfer
  const [breastFeedingList, setBreastFeedingList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getBreastFeeding}`);
      if (status === 200) {
        setBreastFeedingList(data);
      }
    }
    fetchData();
  }, []);
  const breastFeedingOptions = breastFeedingList?.map((item, index) => {
    return (
      <option key={index} value={item.feedingId}>
        {item.feedingName}
      </option>
    );
  });

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
    if (clickedIdData) {
      setBirthDate(clickedIdData?.babyStatus?.dateOfBirth);
      setValue("engDateBirth", clickedIdData?.babyStatus?.engDateBirth);
      setValue("babyFeeding", clickedIdData?.babyStatus?.babyFeeding);
      setValue("babyTransfer", clickedIdData?.babyStatus?.babyTransfer);
      setValue("babyStatus", clickedIdData?.babyStatus?.babyStatus);
    } else if (userData) {
      setDefaultValuesWithUserData({
        dateOfBirth: userData.dateOfBirth || "",
        engDateBirth: userData.engDateBirth || "",
        engDate: userData.engDate || "",
        babyFeeding: userData.babyFeeding || "",
        babyTransfer: userData.babyTransfer || "",
        babyStatus: userData.babyStatus || "",
      });
      setValue("dateOfBirth", userData.dateOfBirth || "");
      setValue("engDateBirth", userData.engDateBirth || "");
      setValue("babyFeeding", userData.babyFeeding || "");
      setValue("babyTransfer", userData.babyTransfer || "");
      setValue("babyStatus", userData.babyStatus || "");
    } else {
      setDefaultValuesWithUserData(defaultValues);
    }
  }, [userData, setValue, clickedIdData]);

  const onSubmit = async (data) => {
    if (serologyStatus == "false") {
      setUserData({
        ...userData,
        babyStatus: {
          dateOfBirth: birthDate,
          engDateBirth: engDate,
          babyStatus: data.babyStatus,
          babyTransfer: data.babyTransfer,
          babyFeeding: data.babyFeeding,
        },
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          babyStatus: {
            dateOfBirth: birthDate,
            engDateBirth: engDate,
            babyStatus: data.babyStatus,
            babyTransfer: data.babyTransfer,
            babyFeeding: data.babyFeeding,
          },
        })
      );
      handleClick("next");
      console.log(userData, "response");
    } else {
      setUserData({
        ...userData,
        babyStatus: {
          dateOfBirth: birthDate,
          engDateBirth: engDate,
          babyStatus: data.babyStatus,
          babyTransfer: data.babyTransfer,
          babyFeeding: data.babyFeeding,
        },
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          babyStatus: {
            dateOfBirth: data.dateOfBirth,
            babyStatus: data.babyStatus,
            babyTransfer: data.babyTransfer,
            babyFeeding: data.babyFeeding,
          },
        })
      );
      data = {
        ...userData,
        babyStatus: {
          dateOfBirth: data.dateOfBirth,
          babyStatus: data.babyStatus,
          babyTransfer: data.babyTransfer,
          babyFeeding: data.babyFeeding,
        },
      };
      try {
        const response = await axios.post(`${urls.createDanaDarta}`, data);
        console.log(response, "response");
        if (response.status === 200) {
          router.push("/donorRecord/viewDonorRecord");
          setSerologyPositive("false");
        }
      } catch (error) {
        console.log(error, "response");
      }
    }
  };

  const watchAllFields = watch();
  // useEffect(() => {
  //   if (watchAllFields?.hiv) {
  //     setSerologyPositive(watchAllFields?.hiv);
  //   }
  // }, [setSerologyPositive, watchAllFields?.hiv]);
  // useEffect(() => {
  //   if (watchAllFields?.hbsag) {
  //     setSerologyPositive1(watchAllFields?.hbsag);
  //   }
  // }, [setSerologyPositive1, watchAllFields?.hbsag]);
  // useEffect(() => {
  //   if (watchAllFields?.vdrl) {
  //     setSerologyPositive2(watchAllFields?.vdrl);
  //   }
  // }, [setSerologyPositive2, watchAllFields?.vdrl]);

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
            <NepaliDatePicker
              inputClassName="form-control  focus:outline-none"
              value={birthDate}
              onChange={(e) => setBirthDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className="inputStyle"
              // {...register("dateOfBirth", { required: true })}
            />
            {errors.dateOfBirth && (
              <p className="errorMessages">{errors.dateOfBirth.message}</p>
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
              {...register("babyStatus", {
                required: "Baby Status Required",
                valueAsNumber: true,
              })}
            >
              <option selected value={""} disabled>
                --Select Your Baby Status--
              </option>
              {babyStatusOptions}
            </select>
            {errors.babyStatus && (
              <p className="errorMessages">{errors.babyStatus.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              Baby Transfer Status
              <span className="text-red-600">*</span>
            </label>
            <select
              className="inputStyle"
              {...register("babyTransfer", {
                required: "Baby Transfer Status Required",
                valueAsNumber: true,
              })}
            >
              <option selected disabled value={""}>
                --Select Baby Transfer Status--
              </option>
              {babyTransferOptions}
            </select>
            {errors.babyTransfer && (
              <p className="errorMessages">{errors.babyTransfer.message}</p>
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
              {...register("babyFeeding", {
                required: "Breast Feeding Stat Required",
                valueAsNumber: true,
              })}
            >
              <option selected disabled value={""}>
                --Select Breast Feeding Status--
              </option>
              {breastFeedingOptions}
            </select>
            {errors.babyFeeding && (
              <p className="errorMessages">{errors.babyFeeding.message}</p>
            )}
          </div>
        </div>
      </FormBorder>
      {serologyStatus == "false" ? (
        <div className="mt-5">
          {currentStep !== steps.length && (
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
            />
          )}
        </div>
      ) : (
        <div className="mt-5">
          {currentStep == steps.length && (
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
            />
          )}
        </div>
      )}
    </form>
  );
};

export default StatusOfBaby;
