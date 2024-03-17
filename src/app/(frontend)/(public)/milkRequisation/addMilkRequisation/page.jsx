"use client";
import React from "react";
import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { urls } from "src/services/apiHelpers";
import { useParams } from "next/navigation";
const aa = new BikramSambat(new Date()).toBS();

export default function AddMilkReq({ clickedIdData }) {
  const router = useRouter();
  const { id } = useParams();

  const [feedingDate, setFeedingDate] = useState(aa);
  const userInfo =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : "";
  const engFeedingDate = new BikramSambat(feedingDate, "BS").toAD();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    control,
    watch,
  } = useForm({
    defaultValues: {
      requisitedMilk: [
        {
          batchNumber: "",
          bottleName: "",
          quantity: 0,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "requisitedMilk",
  });
  const watchFields = watch();
  const watchArray = watch("requisitedMilk");

  // const watchArray = watchFields?.requisitedMilk

  const [bottleList, setBottleList] = useState([]);
  
  
  useEffect(() => {
    async function fetchBottleList() {
      watchArray?.forEach(async (item, index) => {
        if (item?.batchNumber != "") {
          const response = await axios.get(
            `${urls.getBottle}/${item.batchNumber.split("/")?.[0]}`
          );
          if (response.status === 200) {
            // console.log(response?.data,'response')
            setBottleList((prevData) => [
              ...prevData.slice(0, index),
              response?.data?.bottleList,
              ...prevData.slice(index + 1),
            ]);
          }
        }
      });
    }
    fetchBottleList();
  }, [watchArray])

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

  const [babyList, setBabyList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { status, data } = await axios.get(`${urls.getBaby}`);
      if (status === 200) {
        setBabyList(data);
      }
    }
    fetchData();
  }, []);
  //poolingList batchname
  const [poolingList, setPoolingList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axios.get(`${urls.getPooling}`);
      if (status === 200) {
        setPoolingList(data);
      }
    }
    fetchData();
  }, []);


  const onSubmit = async (data) => {
    data = {
      ...data,
      babyId: watchFields?.babyId.split("/")[0],
      babyName: watchFields?.babyId.split("/")[1],
      _id: data?._id,
      userId: userInfo._id,
      feedingDate: feedingDate,
      engFeedingDate: engFeedingDate,
    };
    console.log(data, "response");
    try {
      const { status } = await axios.post(`${urls.createMilkRequistion}`, data);
      if (status === 200) {
        router.push("/milkRequisation/listOfMilkRequisation");
      }
    } catch (error) {
      console.log(error, "response");
    }
  };

  const validVolume =
    watchArray
      ?.map((item) => {
        return item.quantity;
      })
      ?.reduce((acc, amount) => acc + amount, 0) / watchArray?.length;


  return (
    <>
      <div className="mx-10">
        {/* <div className="flex justify-end mt-10">
          <Button>External</Button>
        </div> */}
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <FormBorder title={"Milk Requisition Form"}>
            <div className="flex justify-between mt-6">
              <p className="text-xl font-bold ">Feeding Details:</p>
              <div className="font-bold text-lg flex justify-end">
                <button
                  className="text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg "
                  onClick={(e) => {
                    e.preventDefault();
                    append({
                      batchNumber: "",
                      bottleName: "",
                      quantity: 0,
                    });
                  }}
                >
                  Add More +
                </button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 text-lg gap-4">
              <div className="grid">
                <label htmlFor="">
                  Baby <span className="text-red-600">*</span>
                </label>
                <select
                  name=""
                  id=""
                  className="inputStyle"
                  {...register("babyId")}
                >
                  <option value={""} selected disabled>
                    --Select Baby--
                  </option>
                  {babyList?.map((item, index) => {
                    const combinedValue = `${item._id}/${item.babyName}`;
                    return (
                      <option key={index} value={combinedValue}>
                        {item.babyName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="">
                  Feeding Date<span className="text-red-600">*</span>
                </label>
                <NepaliDatePicker
                  inputClassName="form-control  focus:outline-none"
                  value={feedingDate}
                  onChange={(e) => setFeedingDate(e)}
                  options={{ calenderLocale: "en", valueLocale: "en" }}
                  className="inputStyle"
                />
              </div>
            </div>
            {fields.map((field, index) => {
              const ml = watch(`requisitedMilk.${index}.quantity`)
              return (
                <div
                  key={field.id}
                  className="grid md:grid-cols-2 grid-cols-1 text-lg gap-4 pt-4"
                >
                  <div className="grid">
                    <label htmlFor="">
                      Batch Number <span className="text-red-600">*</span>
                    </label>
                    {/* <Select options={newPoolingList} placeholder={'-- Select Batch Number --'} value={{...register(`requisitedMilk.${index}.batchNumber`, {
                        required: "Batch number is required",
                      })}}  /> */}
                    <select
                      type="Number"
                      className="inputStyle"
                      placeholder="Enter Batch Number"
                      {...register(`requisitedMilk.${index}.batchNumber`, {
                        required: "Batch number is required",
                      })}

                    >
                      <option value={""} selected disabled>
                        --Select Batch Number--
                      </option>
                      {poolingList?.map((items, index) => {
                        const combinedValue = `${items._id}/${items.batchName}`;
                        return (
                          <option key={index} value={combinedValue}>
                            {items?.batchName}({items?.date})
                          </option>
                        );
                      })}
                    </select>
                    {errors?.batchNumber && (
                      <p className="errorMessages">
                        {errors.batchNumber.message}
                      </p>
                    )}
                  </div>
                  {/* <div className="grid">
                    <label htmlFor="">
                      Unique Bottle Number
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      placeholder="Enter Unique Bottle Number"
                      {...register(
                        `requisitedMilk.${index}.uniqueBottleNumber`,
                        {
                          required: "Bottle number is required",
                        }
                      )}
                    />
                    {errors?.uniqueBottleNumber && (
                      <p className="errorMessages">
                        {errors.uniqueBottleNumber.message}
                      </p>
                    )}
                  </div> */}

                  <div className="flex flex-col">
                    <label htmlFor="">
                      Bottle Name<span className="text-red-600">*</span>
                    </label>
                    <select
                      className="inputStyle"
                      {...register(`requisitedMilk.${index}.bottleName`, {
                        required: "Bottle name is required",
                      })}
                    >
                      <option value="" selected disabled>
                        -- select bottle --
                      </option>
                      {bottleList?.map((item, index0) => (
                        <React.Fragment key={index}>
                          {index0 === index &&
                            item.map((subItem, subIndex) => {
                              if(subItem.remainingVoluem > 0){

                                const bottleCombValue = `${subItem._id}/${subItem.name}`;
                                return (
                                  <option key={subIndex} value={bottleCombValue}>
                                    {subItem.name}({'Remaining Volume'}({subItem.remainingVoluem}{'ml'}))
                                  </option>
                                );
                              }
                            })}
                        </React.Fragment>
                      ))}
                    </select>
                    {/* <input
                      type="text"
                      className="inputStyle"
                      placeholder="Enter Bottle Name"
                      {...register(`requisitedMilk.${index}.bottleName`, {
                        required: "Bottle name is required",
                      })}
                    /> */}
                    {errors?.bottleName && (
                      <p className="errorMessages">
                        {errors.bottleName.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="">
                      ML<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      className={`${ml>150 ? 'border-2 border-red-600 inputStyleError':'inputStyle'}`}
                      placeholder="Enter ML"
                      {...register(`requisitedMilk.${index}.quantity`, {
                        valueAsNumber: true,
                        required: "Quantity is required",
                      })}

                    />
                    {errors?.quantity && (
                      <p className="errorMessages">{errors.quantity.message}</p>
                    )}
                  </div>
                  <div></div>
                  {fields.length > 1 && (
                    <div className="font-bold text-lg flex justify-end">
                      <button
                        className="text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg "
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="my-5 font-bold text-xl">
            <button
                className={`text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg disabled:bg-gray-300  disabled:cursor-not-allowed `}
                disabled={validVolume > 150  ? true : false  }
                type="submit"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              {/* <Button isSubmitting={isSubmitting} volume={validVolume > 150 ? false : true}  >{isSubmitting ? "Submiting ..." : "Submit"}</Button> */}
            </div>
          </FormBorder>
        </form>
      </div>
    </>
  );
}
