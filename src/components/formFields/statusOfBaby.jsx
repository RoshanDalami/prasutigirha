import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
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
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const StatusOfBaby = ({ handleClick, currentStep, steps, clickedIdData }) => {
  const [defaultValuesWithUserData, setDefaultValuesWithUserData] =
    useState("");

  const [personName, setPersonName] = React.useState([]);
  const setSerologyPositive = useSetRecoilState(serologyAtom);
  const setSerologyPositive1 = useSetRecoilState(serologyAtom1);
  const setSerologyPositive2 = useSetRecoilState(serologyAtom2);
  const serologyStatus = useRecoilValue(serologyAtom);
  const { userData, setUserData } = useContext(StepperContext);
  const router = useRouter();
  const { id } = useParams();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const diagnosis = [
    { name: "Normal", id: 1 },
    { name: "Premature delivery", id: 2 },
    { name: "Perinatal Asphyxia", id: 3 },
    { name: "Respiratory Distress syndrome", id: 4 },
    { name: "Mortality", id: 13 },

    { name: "Sepsis", id: 5 },
    { name: "Neonatal Jaundice", id: 6 },
    { name: "Seizure disorders", id: 7 },
    { name: "IUGR", id: 8 },
    { name: "Congenital anomalies", id: 9 },
    { name: "Hypoglycemia", id: 10 },
    { name: "LBW", id: 11 },
    { name: "Other", id: 12 },
  ];

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
        setBabyStatusList(data.data);
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
        setBabyTranferList(data?.data);
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
        setBreastFeedingList(data?.data);
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
  const [selectedOptions, setSelectedOptions] = useState([]);

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
    console.log(data.selectedOptions);
    if (serologyStatus == "false") {
      setUserData({
        ...userData,
        babyStatus: {
          dateOfBirth: birthDate,
          engDateBirth: engDate,
          babyStatus: personName,
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
            babyStatus: personName,
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
          babyStatus: personName,
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
            babyStatus: personName,
            babyTransfer: data.babyTransfer,
            babyFeeding: data.babyFeeding,
          },
        })
      );
      data = {
        ...userData,
        babyStatus: {
          dateOfBirth: data.dateOfBirth,
          babyStatus: personName,
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
  const selectOptions = babyStatusList?.map((item) => {
    return {
      value: item?.babyStatusId,
      label: item?.babyStatusName,
    };
  });
  
 
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
            {
              birthDate > aa ? <p className="text-red-600">Future date is not allowed !!!</p> : <></>
            }
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
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              placeholder="-- Select Baby Status --"
            >
              {diagnosis.map((name) => (
                <MenuItem key={name?.id} value={name?.name}>
                  <Checkbox checked={personName.indexOf(name?.name) > -1} />
                  <ListItemText primary={name?.name} />
                </MenuItem>
              ))}
            </Select>

            {/* <select
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
            </select> */}
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
