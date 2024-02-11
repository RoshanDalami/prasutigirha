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
export default function AddMilkReq({clickedIdData}) {
  const router= useRouter();
  const {id} = useParams();
  const [birthDate, setBirthDate] = useState("");
  const [feedingDate, setFeedingDate] = useState("");
  const userInfo =
  typeof localStorage !== "undefined"
    ? JSON.parse(localStorage.getItem("userInfo"))
    : "";
  const engBirthDate = new BikramSambat(birthDate, "BS").toAD();
  const engFeedingDate = new BikramSambat(feedingDate, "BS").toAD();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue
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

  useEffect(()=>{
    if(clickedIdData || id ){
      setValue('_id',clickedIdData?._id);
      setValue('babyStatus',clickedIdData?.babyStatus);
      setValue('babyName',clickedIdData?.babyEntry?.babyName);
      setValue('gestationalAge',clickedIdData?.babyEntry?.gestationalAge);
      setValue('ipNumber',clickedIdData?.babyEntry?.ipNumber);
      setValue('babyWeight',clickedIdData?.babyEntry?.babyWeight);
      setValue('diagnosis',clickedIdData?.babyEntry?.diagnosis);
      setValue('indications',clickedIdData?.babyEntry?.indications);
      setBirthDate(clickedIdData?.babyEntry?.dateOfBaby);
      setValue('batchNumber',clickedIdData?.feedingDetails?.batchNumber)
      setValue('uniqueBottleNumber',clickedIdData?.feedingDetails?.uniqueBottleNumber)
      setValue('bottleName',clickedIdData?.feedingDetails?.bottleName)
      setValue('quantity',clickedIdData?.feedingDetails?.quantity)
      setFeedingDate(clickedIdData?.feedingDetails?.feedingDate)
    
    }
  },[clickedIdData, id , setValue])

  const onSubmit = async (data) => {
    data = {
      babyStatus: data.babyStatus,
      userId: userInfo._id,
      babyEntry: {
        babyName: data.babyName,
        dateOfBaby: birthDate,
        engDateOfBaby: engBirthDate,
        gestationalAge: data.gestationalAge,
        ipNumber: data.ipNumber,
        babyWeight: data.babyWeight,
        diagnosis: data.diagnosis,
        indications: data.indications,
      },
      feedingDetails: {
        batchNumber: data.batchNumber,
        uniqueBottleNumber: data.uniqueBottleNumber,
        bottleName: data.bottleName,
        feedingDate: feedingDate,
        engFeedingDate: engFeedingDate,
        quantity: data.quantity,
      },
    };
    try {
      const {status} = await axios.post(`${urls.createMilkRequistion}`, data);
      if(status === 200){
        router.push('/milkRequisation/listOfMilkRequisation')
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
          <FormBorder title={"Milk Requisition Form"}>
            <p className="text-xl font-bold py-6">1. Baby Entry Form:</p>
            <div className="grid md:grid-cols-2 grid-cols-1 text-lg gap-4">
              <div className="grid">
                <label htmlFor="">
                  Name of the Baby <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  placeholder="Enter the Name of the Baby"
                  {...register("babyName")}
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  Date of Birth<span className="text-red-600">*</span>
                </label>
                {/* <input type="date" className="inputStyle" />
                 */}
                <NepaliDatePicker
                  inputClassName="form-control  focus:outline-none"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                  className="inputStyle"
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  GestationalAge <span className="text-red-600">*</span>
                </label>
                <select className="inputStyle" {...register("gestationalAge")}>
                  <option selected disabled value={""}>
                    --Select Gestational Age--
                  </option>
                  {gestationalOption}
                </select>
              </div>
              <div className="grid">
                <label htmlFor="">
                  IP Number<span className="text-red-600">*</span>
                </label>
                <input
                  type="Number"
                  className="inputStyle"
                  placeholder="Enter IP Number"
                  {...register("ipNumber")}
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  Birth Weight<span className="text-red-600">*</span>
                </label>
                <input
                  type="Number"
                  className="inputStyle"
                  placeholder="Enter Birth Weight"
                  {...register("babyWeight")}
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  Diagnosis of recipient <span className="text-red-600">*</span>
                </label>
                <select className="inputStyle" {...register("diagnosis")}>
                  <option selected disabled value={""}>
                    --Select Diagnosis--
                  </option>
                  {diagnosisOptions}
                </select>
              </div>
              <div className="grid">
                <label htmlFor="">
                  Indications <span className="text-red-600">*</span>
                </label>
                <select className="inputStyle" {...register("indications")}>
                  <option selected disabled value={""}>
                    --Select Indications--
                  </option>
                  {indicationOption}
                </select>
              </div>
            </div>
            <p className="text-xl font-bold py-6">2. Baby Status:</p>
            <div className="grid md:grid-cols-2 grid-cols-1 text-lg">
              <div className="grid">
                <label htmlFor="">
                  Baby Status <span className="text-red-600">*</span>
                </label>
                <select className="inputStyle" {...register("babyStatus")}>
                  <option selected disabled value={""}>
                    --Select Baby Status--
                  </option>
                  {babyStatusOptions}
                </select>
              </div>
            </div>
            <p className="text-xl font-bold py-6">3. Feeding Details:</p>
            <div className="grid md:grid-cols-2 grid-cols-1 text-lg gap-4">
              <div className="grid">
                <label htmlFor="">
                  Batch Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="Number"
                  className="inputStyle"
                  placeholder="Enter Batch Number"
                  {...register("batchNumber")}
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  Unique Bottle Number<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  placeholder="Enter Unique Bottle Number"
                  {...register("uniqueBottleNumber")}
                />
              </div>

              <div className="grid">
                <label htmlFor="">
                  Bottle Name<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  placeholder="Enter Bottle Name"
                  {...register("bottleName")}
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  Feeding Date<span className="text-red-600">*</span>
                </label>
                <NepaliDatePicker
                  inputClassName="form-control  focus:outline-none"
                  value={feedingDate}
                  onChange={(e) => setFeedingDate(e)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
                  className="inputStyle"
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  ML<span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  className="inputStyle"
                  placeholder="Enter ML"
                  {...register("quantity")}
                />
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
