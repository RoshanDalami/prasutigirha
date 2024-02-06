"use client";
import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function AddMilkReq() {
  const [birthDate, setBirthDate] = useState("");
  const [feedingDate, setFeedingDate] = useState("");

  const { register, handleSubmit } = useForm();
  const engBirthDate = new BikramSambat(birthDate, "BS").toAD();
  const engFeedingDate = new BikramSambat(feedingDate, "BS").toAD();

  const onSubmit = () => {
    console.log(birthDate, "response");
    console.log(engBirthDate, "engDate");
  };
  return (
    <>
      <div className="mx-10">
        <div className="flex justify-end mt-10">
          <Button>External</Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  // {...register("dateOfBirth", { required: true })}
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  GestationalAge <span className="text-red-600">*</span>
                </label>
                <select className="inputStyle">
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
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
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  Diagnosis of recipient <span className="text-red-600">*</span>
                </label>
                <select className="inputStyle">
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                </select>
              </div>
              <div className="grid">
                <label htmlFor="">
                  Indications <span className="text-red-600">*</span>
                </label>
                <select className="inputStyle">
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                </select>
              </div>
            </div>
            <p className="text-xl font-bold py-6">2. Baby Status:</p>
            <div className="grid md:grid-cols-2 grid-cols-1 text-lg">
              <div className="grid">
                <label htmlFor="">
                  Baby Status <span className="text-red-600">*</span>
                </label>
                <select className="inputStyle">
                  <option>NICU</option>
                  <option>SNCU</option>
                  <option>KMC</option>
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
                />
              </div>
            </div>
            <div className="my-5 font-bold text-xl">
              <Button>Submit</Button>
            </div>
          </FormBorder>
        </form>
      </div>
    </>
  );
}
