"use client";
import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { urls } from "src/services/apiHelpers";
import { useParams } from "next/navigation";
const aa = new BikramSambat(new Date()).toBS();
export default function AddBabyDetails({ clickedIdData }) {
  const router = useRouter();
  const { id } = useParams();
  const [birthDate, setBirthDate] = useState(aa);

  const userInfo =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : "";
  const engBirthDate = new BikramSambat(birthDate, "BS").toAD();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm();

  //gestationalAge
  const [gestationalAge, setGestationalAge] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await axios.get(`${urls.getGestational}`);
      if (status === 200) {
        setGestationalAge(data);
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

  const diagnosis = [
    { name: "Preterm delivery", id: 1 },
    { name: "Premature delivery", id: 2 },
    { name: "Perinatal Asphyxia", id: 3 },
    { name: "Respiratory Distress syndrome", id: 4 },
    { name: "Sepsis", id: 5 },
    { name: "Neonatal Jaundice", id: 6 },
    { name: "Seizure disorders", id: 7 },
    { name: "IUGR", id: 8 },
    { name: "Congenital anomalies", id: 9 },
    { name: "Hypoglycemia", id: 10 },
    { name: "Other", id: 11 },
  ];
  const diagnosisOptions = diagnosis?.map((item, index) => {
    return (
      <option key={index} value={item.name}>
        {item.name}
      </option>
    );
  });
  const indications = [
    { id: 1, name: "Select Indication" },
    { id: 2, name: "Preterm" },
    { id: 3, name: "Low Birth weight" },
    { id: 4, name: "IUGR" },
    { id: 5, name: "Post-surgical" },
    { id: 6, name: "Lactation failure" },
    { id: 7, name: "NICU" },
    { id: 8, name: "Other" },
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
  ];
  const babyStatusOptions = babyStatus?.map((item, index) => {
    return (
      <option key={index} value={item.name}>
        {item.name}
      </option>
    );
  });

  const onSubmit = async (data) => {
    data = {
      ...data,
      _id: data?._id,
      dateOfBaby: birthDate,
      engDateOfBaby: engBirthDate,
      userId: userInfo._id,
    };

    try {
      const { status } = await axios.post(`${urls.createBaby}`, data);
      if (status === 200) {
        router.push("/");
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
                    required: "Gestational Age required",
                  })}
                >
                  <option selected disabled value={""}>
                    --Select Gestational Age--
                  </option>
                  {gestationalOption}
                </select>
                {errors?.gestationalAge && (
                  <p className="errorMessages">
                    {errors.gestationalAge.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">
                  IP Number<span className="text-red-600">*</span>
                </label>
                <input
                  type="Number"
                  className="inputStyle"
                  placeholder="Enter IP Number"
                  {...register("ipNumber", {
                    required: "IP number is required",
                  })}
                />
                {errors?.ipNumber && (
                  <p className="errorMessages">{errors.ipNumber.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">
                  Birth Weight<span className="text-red-600">*</span>
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
                <select
                  className="inputStyle"
                  {...register("diagnosis", {
                    required: "Diagnosis is required",
                  })}
                >
                  <option selected disabled value={""}>
                    --Select Diagnosis--
                  </option>
                  {diagnosisOptions}
                </select>
                {errors?.diagnosis && (
                  <p className="errorMessages">{errors.diagnosis.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">
                  Indications <span className="text-red-600">*</span>
                </label>
                <select
                  className="inputStyle"
                  {...register("indications", {
                    required: "Inidcations is required",
                  })}
                >
                  <option selected disabled value={""}>
                    --Select Indications--
                  </option>
                  {indicationOption}
                </select>
                {errors?.indications && (
                  <p className="errorMessages">{errors.indications.message}</p>
                )}
              </div>
              <div className="grid">
                <label htmlFor="">
                  Baby Status <span className="text-red-600">*</span>
                </label>
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
                {errors?.babyStatus && (
                  <p className="errorMessages">{errors.babyStatus.message}</p>
                )}
              </div>
            </div>
            <div className="my-5 font-bold text-xl">
              <Button>{isSubmitting ? "Submiting ..." : "Submit"}</Button>
            </div>
          </FormBorder>
        </form>
      </div>
    </>
  );
}
