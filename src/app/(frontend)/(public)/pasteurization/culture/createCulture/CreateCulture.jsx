"use client";
import React, { useEffect, useState } from "react";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
const aa = new BikramSambat(new Date()).toBS();
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import FormBorder from "src/components/reusableForm";
import { useForm, useFieldArray } from "react-hook-form";
import { getPooling } from "src/services/apiService/pasteurization/pasteurization";
import { FaTrashAlt } from "react-icons/fa";
import { getBottle } from "src/services/apiService/bottle/bottleServices";
import { createCulture } from "src/services/apiService/culture/cultureService";
import { useRouter } from "next/navigation";
export default function CreateCulture() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      cultureBottleList: [
        {
          bottleId: "",
          cultureResult: null,
          cultureRemark: "",
        },
      ],
    },
  });
  const watchFields = watch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cultureBottleList",
  });
  const [date, setDate] = useState(aa);
  const engDate = new BikramSambat(date, "BS").toAD();
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const { status, data } = await getPooling();
        if (status === 200) {
          setApiData(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const removeHandler = (e, index) => {
    e.preventDefault();
    remove(index);
  };
  const [bottleList, setBottleList] = useState([]);
  useEffect(() => {
    if (watchFields?.batchId != undefined) {
      async function getBottleList() {
        const { data, status } = await getBottle(watchFields?.batchId);
        if (status === 200) {
          setBottleList(data?.bottleList);
        }
      }

      getBottleList();
    }
  }, [watchFields?.batchId]);
  const onSubmit = async (data) => {
    data = {
      ...data,
      cultureDate: date,
      cultureEngDate: engDate,
    };
    try {
      const response = await createCulture(data);
      if (response?.status === 200) {
        router.push("/pasteurization/pasteurizationList");
      }
    } catch (error) {}
  };

  return (
    <div className="mx-4">
      <FormBorder title={"Create Culture"}>
        <form
          action="
      "
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <div className="grid grid-cols-2 gap-4">
          
            <div className="flex flex-col">
              <label htmlFor="">
                Culture Date<span className="text-red-600">*</span>
              </label>

              <NepaliDatePicker
                inputClassName="form-control  focus:outline-none"
                value={date}
                onChange={(e) => setDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
          </div>
          <div className="flex items-end justify-end mt-4">
            <button
              className="bg-indigo-600 rounded-md shadow-md px-3 py-2 text-white font-bold"
              onClick={(e) => {
                e.preventDefault();
                append({
                  bottleId: "",
                  cultureResult: null,
                  cultureRemark: "",
                });
              }}
            >
              Add
            </button>
          </div>
          {fields.map((field, index) => {
            const watchResult = watch(
              `cultureBottleList.${index}.cultureResult`
            );
            return (
              <div key={field.id} className="flex items-center gap-3 w-full">
                <div className="flex flex-col w-2/4">
                  <label htmlFor="">Batch</label>
                  <select
                    name=""
                    id=""
                    className="inputStyle"
                    {...register(`cultureBottleList.${index}.batchId`)}
                  >
                    <option value="" disabled selected>
                      --Select Batch--
                    </option>
                    {apiData?.map((item, index) => {
                      if(item.culture === null){
                        return (
                          <option key={index} value={item._id}>
                            {item.batchName} {`(${item.date})`}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="flex flex-col w-2/4">
                  <label>Culture Result</label>

                  <select
                    name=""
                    id=""
                    className="inputStyle text-sm"
                    {...register(`cultureBottleList.${index}.cultureResult`)}
                  >
                    <option value="" className="text-md" selected disabled>
                      --Update Culture--
                    </option>
                    <option value={true}>Positive</option>
                    <option value={false}>Negative</option>
                    {/* <option value={"Other"}>Other</option> */}
                  </select>
                </div>
                {fields?.length > 1 ? (
                  <div className="flex items-center justify-center mt-6 ">
                    <div
                      className="bg-red-600 text-white p-4 rounded-md shadow-md cursor-pointer"
                      onClick={(e) => removeHandler(e, index)}
                    >
                      <FaTrashAlt />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
          <button
            className="bg-red-600 text-white my-4 text-lg rounded-md py-2 px-5 hover:bg-[#052c65] disabled:cursor-not-allowed disabled:bg-gray-200"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting ..." : "Submit"}
          </button>
        </form>
      </FormBorder>
    </div>
  );
}
