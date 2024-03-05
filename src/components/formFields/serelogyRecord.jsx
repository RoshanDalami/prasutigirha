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
const SerelogyRecord = ({ handleClick, currentStep, steps, clickedIdData }) => {
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
  const [testDate, setTestDate] = useState(aa);
  const [hivTestDate, setHivTestDate] = useState(aa);
  const [hbsagTestDate, setHbsagTestDate] = useState(aa);

  const engTestDate = new BikramSambat(testDate, "BS").toAD();

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
      setValue("hiv", clickedIdData?.serologyRecords?.hiv);
      setValue("hbsag", clickedIdData?.serologyRecords?.hbsag);
      setValue("vdrl", clickedIdData?.serologyRecords?.vdrl);
      // setValue("dateOfTest", clickedIdData?.serologyRecords?.dateOfTest );
      setTestDate(clickedIdData?.serologyRecords?.dateOfTest);
      setValue("engDateTest", clickedIdData?.serologyRecords?.engDateTest);
    } else if (userData) {
      setDefaultValuesWithUserData({
        hiv: userData.hiv || "",
        hbsag: userData.hbsag || "",
        vdrl: userData.vdrl || "",
        dateOfTest: userData.dateOfTest || "",
        engDateTest: userData.engDateTest || "",
      });

      setValue("hiv", userData.hiv || "");
      setValue("hbsag", userData.hbsag || "");
      setValue("vdrl", userData.vdrl || "");
      setValue("dateOfTest", userData.dateOfTest || "");
      setValue("engDateTest", userData.engDateTest || "");
    } else {
      setDefaultValuesWithUserData(defaultValues);
    }
  }, [userData, setValue, clickedIdData]);

  const onSubmit = async (data) => {
    if (serologyStatus == "false") {
      setUserData({
        ...userData,
        serologyRecords: {
          hiv: JSON.parse(data.hiv),
          hbsag: JSON.parse(data.hbsag),
          vdrl: JSON.parse(data.vdrl),
          dateOfTest: testDate,
          engDateTest: engTestDate,
          dateOfHivTest: hivTestDate,
          dateofHbsagTest: hbsagTestDate,
        },
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          serologyRecords: {
            hiv: JSON.parse(data.hiv),
            hbsag: JSON.parse(data.hbsag),
            vdrl: JSON.parse(data.vdrl),
            dateOfTest: testDate,
            engDateTest: engTestDate,
            dateOfHivTest: hivTestDate,
            dateofHbsagTest: hbsagTestDate,
          },
        })
      );
      handleClick("next");
      console.log(userData, "response");
    } else {
      setUserData({
        ...userData,
        serologyRecords: {
          hiv: JSON.parse(data.hiv),
          hbsag: JSON.parse(data.hbsag),
          vdrl: JSON.parse(data.vdrl),
          dateOfTest: testDate,
          engDateTest: engTestDate,
          dateOfHivTest: hivTestDate,
          dateofHbsagTest: hbsagTestDate,
        },
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          serologyRecords: {
            hiv: JSON.parse(data.hiv),
            hbsag: JSON.parse(data.hbsag),
            vdrl: JSON.parse(data.vdrl),
            dateOfTest: testDate,
          engDateTest: engTestDate,
          dateOfHivTest: hivTestDate,
          dateofHbsagTest: hbsagTestDate,
          },
        })
      );
      data = {
        ...userData,
        serologyRecords: {
          hiv: JSON.parse(data.hiv),
          hbsag: JSON.parse(data.hbsag),
          vdrl: JSON.parse(data.vdrl),
          dateOfTest: testDate,
          engDateTest: engTestDate,
          dateOfHivTest: hivTestDate,
          dateofHbsagTest: hbsagTestDate,
        },
      };
      try {
        const response = await axios.post(`${urls.createDanaDarta}`, data);
        // console.log(response, "response");
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
  useEffect(() => {
    if (watchAllFields?.hiv) {
      setSerologyPositive(watchAllFields?.hiv);
    }
  }, [setSerologyPositive, watchAllFields?.hiv]);
  useEffect(() => {
    if (watchAllFields?.hbsag) {
      setSerologyPositive1(watchAllFields?.hbsag);
    }
  }, [setSerologyPositive1, watchAllFields?.hbsag]);
  useEffect(() => {
    if (watchAllFields?.vdrl) {
      setSerologyPositive2(watchAllFields?.vdrl);
    }
  }, [setSerologyPositive2, watchAllFields?.vdrl]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBorder title={" Serelogy Records"}>
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
              {...register("hiv", {
                required: "Yes/No Required",
              })}
            >
              {" "}
              <option selected disabled value={""}>
                --select HIV Status--
              </option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            {errors.hiv && (
              <p className="errorMessages">{errors.hiv.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              {" "}
              Date of HIV Test
              <span className="text-red-600">*</span>
            </label>

            <NepaliDatePicker
              inputClassName="form-control  focus:outline-none"
              value={hivTestDate}
              onChange={(e) => setHivTestDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className="inputStyle"
              // {...register("dateOfBirth", { required: true })}
            />
            {errors.dateOfTest && (
              <p className="errorMessages">{errors.dateOfTest.message}</p>
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
              {...register("hbsag", {
                required: "Yes/No Required",
              })}
            >
              {" "}
              <option selected disabled value={""}>
                --select HBSAG Status--
              </option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            {errors.hbsag && (
              <p className="errorMessages">{errors.hbsag.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              {" "}
              Date of HBSAG Test
              <span className="text-red-600">*</span>
            </label>

            <NepaliDatePicker
              inputClassName="form-control  focus:outline-none"
              value={hbsagTestDate}
              onChange={(e) => setHbsagTestDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className="inputStyle"
              // {...register("dateOfBirth", { required: true })}
            />
            {errors.dateOfTest && (
              <p className="errorMessages">{errors.dateOfTest.message}</p>
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
              {...register("vdrl", {
                required: "Yes/No Required",
              })}
            >
              {" "}
              <option selected disabled value={""}>
                --select VDRL Status--
              </option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            {errors.vdrl && (
              <p className="errorMessages">{errors.vdrl.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              {" "}
              Date of VDRL Test
              <span className="text-red-600">*</span>
            </label>

            <NepaliDatePicker
              inputClassName="form-control  focus:outline-none"
              value={testDate}
              onChange={(e) => setTestDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className="inputStyle"
              // {...register("dateOfBirth", { required: true })}
            />
            {errors.dateOfTest && (
              <p className="errorMessages">{errors.dateOfTest.message}</p>
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

export default SerelogyRecord;
