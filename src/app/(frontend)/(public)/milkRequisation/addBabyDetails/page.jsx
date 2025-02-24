"use client";

import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { urls } from "src/services/apiHelpers";
import { useParams } from "next/navigation";
import { createBaby, ipList } from "src/services/apiService/baby/babyServices";
import { getGestationalTwo } from "src/services/apiService/dropdown/dropdownservices";
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
export default function AddBabyDetails({ clickedIdData }) {
  const router = useRouter();
  const { id } = useParams();
  const [birthDate, setBirthDate] = useState(aa);
  const [personName, setPersonName] = React.useState([]);
  const [indicationName, setIndicationName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleIndicationChange = (event) => {
    const {
      target: { value },
    } = event;
    setIndicationName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const userInfo =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : "";
  const engBirthDate = new BikramSambat(birthDate, "BS").toAD();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    watch,
  } = useForm();
  const watchFields = watch();
  //gestationalAge
  const [gestationalAge, setGestationalAge] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await axios.get(`${urls.getGestational}`);
      if (status === 200) {
        setGestationalAge(data?.data);
      }
    }
    fetchData();
  }, []);

  const gestationalOption = gestationalAge?.map((item, index) => {
    return (
      <option key={index} value={item.gestationalId}>
        {item.gestationalName}
      </option>
    );
  });
  const [parityList, setParityList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await axios.get(`${urls.getParity}`);
      if (status === 200) {
        setParityList(data?.data);
      }
    }
    fetchData();
  }, []);

  const parityOptions = parityList?.map((item, index) => {
    return (
      <option key={index} value={item.parityName}>
        {item.parityName}
      </option>
    );
  });
  //mode of delivery
  const [modeOfDeliveryList, setModeOfDeliveryList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getDelivery}`);
      if (status === 200) {
        setModeOfDeliveryList(data?.data);
      }
    }
    fetchData();
  }, []);
  const diagnosis = [
    { name: "Perinatal Asphyxia", id: 2 },
    { name: "Preterm", id: 3 },
    { name: "PT+ other Complication", id: 4 },
    { name: "Respiratory Distress ", id: 5 },
    { name: "Neonatal Jaundice", id: 6 },
    { name: "Sepsis", id: 7 },
    { name: " Meconium Aspiration Syndrome", id: 8 },
    { name: "IUGR", id: 9 },
    { name: "LBW", id: 10 },
    { name: "Seizure", id: 11 },
    { name: "Congenital Anomalies", id: 12 },
    { name: "Other", id: 13 },
  ];
  const diagnosisOptions = diagnosis?.map((item, index) => {
    return (
      <option key={index} value={item.name}>
        {item.name}
      </option>
    );
  });
  const indications = [
    // { id: 1, name: "Select Indication" },
    { id: 2, name: "PT/LBW" },
    { id: 4, name: "IUGR/LBW" },
    { id: 3, name: "Sick mother admitted in MICU" },
    { id: 12, name: "Post Surgical" },
    { id: 5, name: " Lactation failure" },
    { id: 6, name: "Multiple Deliveries with LBW" },
    { id: 7, name: "OCMC Case" },
    { id: 8, name: "Contraindication" },
    { id: 9, name: "Necrotizing Enterocolitis" },
    { id: 10, name: "Gastro-intestinal Surgeries" },
    { id: 11, name: "Others" },
  ];
  const indicationOption = indications?.map((item, index) => {
    return (
      <option key={index} value={item.name}>
        {item.name}
      </option>
    );
  });
  const babyStatus = [
    { id: 1, name: "NICU" },
    { id: 2, name: "SNCU" },
    { id: 3, name: "KMC" },
    { id: 4, name: "Mortality" },
    { id: 5, name: "Other" },
  ];
  const babyStatusOptions = babyStatus?.map((item, index) => {
    return (
      <option key={index} value={item.name}>
        {item.name}
      </option>
    );
  });

  const [ip, setIpList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await ipList();
      if (response?.status === 200) {
        setIpList(response?.data);
      }
    }
    fetchData();
  }, []);

  const [gestationalAgeTwo, setGestationalAgeTwo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getGestationalTwo();
      if (response?.status === 200) {
        setGestationalAgeTwo(response?.data);
      }
    };
    fetchData();
  }, []);
  const gestationalAgeTwoOptions = gestationalAgeTwo.map((item, index) => {
    return (
      <option key={index} value={item.gestationalName}>
        {item.gestationalName}
      </option>
    );
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      babyStatus:
        watchFields?.babyStatus === "Other"
          ? data?.babyStatusOther
          : data?.babyStatus,
      _id: data?._id,
      diagnosis: personName,
      indications: indicationName,
      dateOfBaby: birthDate,
      engDateOfBaby: engBirthDate,
      userId: userInfo?.userDetail._id,
    };

    try {
      const { status } = await createBaby(data);
      if (status === 200) {
        router.push("/milkRequisation/babyDetails");
      }
    } catch (error) {
      console.log(error, "response");
    }
  };

  return (
    <>
      <div className="mx-10">
        {/* <div className="flex justify-end mt-10">
          <Button>External</Button>
        </div> */}
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <FormBorder title={"Baby Details Form"}>
            <p className="text-xl font-bold py-6">1. Baby Entry Form:</p>
            <div className="grid md:grid-cols-2 grid-cols-1 text-lg gap-4">
              <div className="flex flex-col">
                <label htmlFor="">
                  Name of the Baby <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  placeholder="Enter the Name of the Baby"
                  {...register("babyName", {
                    required: "Baby name is required",
                  })}
                />
                {errors?.babyName && (
                  <p className="errorMessages">{errors.babyName.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">
                  Date of Birth<span className="text-red-600">*</span>
                </label>
                {/* <input type="date" className="inputStyle" />
                 */}
                <NepaliDatePicker
                  inputClassName="form-control  focus:outline-none"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e)}
                  options={{ calenderLocale: "en", valueLocale: "en" }}
                  className="inputStyle"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">
                  GestationalAge <span className="text-red-600">*</span>
                </label>

                <select
                  className="inputStyle"
                  {...register("gestationalAge", {
                    required: "Gestaional Age is required",
                  })}
                >
                  <option selected disabled value={""}>
                    --Select Gestational Age--
                  </option>
                  {gestationalAgeTwoOptions}
                </select>
                {errors?.gestationalAge && (
                  <p className="text-red-600">
                    {errors.gestationalAge.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label>
                  Gender <span className="text-red-600">*</span>
                </label>
                <select
                  className="inputStyle"
                  {...register("gender", { required: "Gender Required" })}
                >
                  <option selected disabled value={""}>
                    --Select Gender--
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                {errors.gender && (
                  <p className="errorMessages">{errors.gender.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">
                  Parity <span className="text-red-600">*</span>
                </label>
                <select
                  className="inputStyle"
                  {...register("parity", { required: "Parity is Required" })}
                >
                  <option selected disabled value={""}>
                    -- Select Parity --
                  </option>
                  {parityOptions}
                </select>

                {errors.parity && (
                  <p className="errorMessages">{errors.parity.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>
                  Mode of Delivery <span className="text-red-600">*</span>
                </label>
                <select
                  className="inputStyle"
                  {...register("mod", {
                    required: "Mode of Delivery Required",
                  })}
                >
                  <option selected disabled value={""}>
                    --Select Mode of Delivery--
                  </option>
                  {modeOfDeliveryList?.map((items, index) => {
                    return <option key={index}>{items?.deliveryName}</option>;
                  })}
                </select>
                {errors.mod && (
                  <p className="errorMessages">{errors.mod.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">
                  IP Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  placeholder="Enter IP Number"
                  {...register("ipNumber", {
                    required: "IP number is required",
                  })}
                />
                {errors?.ipNumber && (
                  <p className="errorMessages">{errors.ipNumber.message}</p>
                )}
                {ip?.includes(watch("ipNumber")) ? (
                  <p className="errorMessages">Baby already exist</p>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">
                  Birth Weight (Gram) <span className="text-red-600">*</span>
                </label>
                <input
                  type="Number"
                  className="inputStyle"
                  placeholder="Enter Birth Weight"
                  {...register("babyWeight", {
                    required: "Birth weight required",
                    min: { value: 0, message: "Weight cannot be negative" },
                  })}
                />
                {errors?.babyWeight && (
                  <p className="errorMessages">{errors.babyWeight.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">
                  Diagnosis of recipient <span className="text-red-600">*</span>
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
                >
                  {diagnosis.map((name) => (
                    <MenuItem key={name?.id} value={name?.name}>
                      <Checkbox checked={personName.indexOf(name?.name) > -1} />
                      <ListItemText primary={name?.name} />
                    </MenuItem>
                  ))}
                </Select>

                {errors?.diagnosis && (
                  <p className="errorMessages">{errors.diagnosis.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">
                  Indications <span className="text-red-600">*</span>
                </label>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={indicationName}
                  onChange={handleIndicationChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {indications.map((name) => (
                    <MenuItem key={name?.id} value={name?.name}>
                      <Checkbox
                        checked={indicationName.indexOf(name?.name) > -1}
                      />
                      <ListItemText primary={name?.name} />
                    </MenuItem>
                  ))}
                </Select>
                {errors?.indications && (
                  <p className="errorMessages">{errors.indications.message}</p>
                )}
              </div>
              <div className="grid">
                <label htmlFor="">
                  Baby Status <span className="text-red-600">*</span>
                </label>
                {watchFields.babyStatus === "Other" ? (
                  <input
                    type="text"
                    className="inputStyle"
                    placeholder="Baby Status"
                    {...register("babyStatusOther", {
                      required: "Baby status is required",
                    })}
                  />
                ) : (
                  <select
                    className="inputStyle"
                    {...register("babyStatus", {
                      required: "Baby status is required",
                    })}
                  >
                    <option selected disabled value={""}>
                      --Select Baby Status--
                    </option>
                    {babyStatusOptions}
                  </select>
                )}
                {errors?.babyStatus && (
                  <p className="errorMessages">{errors.babyStatus.message}</p>
                )}
              </div>
            </div>
            <div className="my-5 font-bold text-xl">
              <Button
                isSubmitting={isSubmitting}
                date={birthDate}
                aa={aa}
                ip={ip?.includes(watch("ipNumber")) ? true : false}
              >
                {isSubmitting ? "Submiting ..." : "Submit"}
              </Button>
            </div>
          </FormBorder>
        </form>
      </div>
    </>
  );
}
