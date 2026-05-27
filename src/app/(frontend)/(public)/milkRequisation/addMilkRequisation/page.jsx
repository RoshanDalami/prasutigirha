"use client";
import React from "react";
import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { FaTrashAlt } from "react-icons/fa";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { getBottle } from "src/services/apiService/bottle/bottleServices";
const aa = new BikramSambat(new Date()).toBS();
import { createMilkRequistion } from "src/services/apiService/milkRequistion/requistionService";
import toast from "react-hot-toast";
import Select from "react-select";
import { useBabyList } from "src/hooks/useBaby";
import { usePasteurizationList } from "src/hooks/usePasteurization";
export default function AddMilkReq({ clickedIdData }) {
  const router = useRouter();
  const { id } = useParams();

  const [feedingDate, setFeedingDate] = useState(aa);
  const userInfo =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : "";
  const engFeedingDate = new BikramSambat(feedingDate, "BS").toAD();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    control,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      requisitedMilk: [
        {
          batchNumber: "",
          bottleName: "",
          remainingVol: 0,
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

  const [bottleList, setBottleList] = useState([]);
  const [bottleLoading, setBottleLoading] = useState([]);
  useEffect(() => {
    setBottleList((prev) => {
      const copy = Array.isArray(prev) ? [...prev] : [];
      while (copy.length < fields.length) copy.push(undefined);
      if (copy.length > fields.length) copy.splice(fields.length);
      return copy;
    });
    setBottleLoading((prev) => {
      const copy = Array.isArray(prev) ? [...prev] : [];
      while (copy.length < fields.length) copy.push(false);
      if (copy.length > fields.length) copy.splice(fields.length);
      return copy;
    });
  }, [fields.length]);

  const { data: babyResult = {}, isLoading: babyLoading } = useBabyList(
    1,
    500,
    "true",
  );
  const { data: poolingResult = {}, isLoading: poolingLoading } =
    usePasteurizationList(1, 500);
  const babyList = babyResult.data ?? [];
  const poolingList = poolingResult.data ?? [];

  const babyOptions = babyList?.map((item) => {
    return {
      label: `${item.babyName} (${item.ipNumber})`,
      value: `${item._id}/${item.babyName}`,
    };
  });

  const poolingOptions =
    poolingList
      ?.filter((items) => items.culture === false && items.remaining > 0)
      ?.map((items) => ({
        label: `${items?.batchName} (${items?.date})`,
        value: `${items._id}/${items.batchName}/${items.date}`,
      })) || [];
  const [babyId, setBabyId] = useState("");
  const onSubmit = async (data) => {
    data = {
      ...data,
      babyId: babyId.split("/")[0],
      babyName: babyId.split("/")[1],
      _id: data?._id,
      userId: userInfo?.userDetail?._id,
      feedingDate: feedingDate,
      engFeedingDate: engFeedingDate,
    };
    console.log(data, "data");
    try {
      const response = await createMilkRequistion(data);
      if (response?.status === 200) {
        router.push("/milkRequisation/listOfMilkRequisation");
      }
    } catch (error) {
      console.log(error, "response");
      toast.error("Invalid Milk Volume");
    }
  };

  const validVolume =
    watchArray
      ?.map((item) => {
        return item.quantity;
      })
      ?.reduce((acc, amount) => acc + amount, 0) / watchArray?.length;

  const [watchBottle, setWatchBottle] = useState([]);
  const [isValid, setIsValid] = useState(false);
  let remvol;
  let quantity;
  const [someArray, setSomeArray] = useState(false);
  const removeHandler = (index) => {
    remove(index);
    setWatchBottle((prev) => {
      const copy = Array.isArray(prev) ? [...prev] : [];
      copy.splice(index, 1);
      return copy;
    });
    setBottleList((prev) =>
      Array.isArray(prev) ? prev.filter((_, i) => i !== index) : [],
    );
    setBottleLoading((prev) =>
      Array.isArray(prev) ? prev.filter((_, i) => i !== index) : [],
    );
  };

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
                      remainingVol: 0,
                      quantity: 0,
                    });
                    setBottleList((prev) => [
                      ...(Array.isArray(prev) ? prev : []),
                      undefined,
                    ]);
                    setBottleLoading((prev) => [
                      ...(Array.isArray(prev) ? prev : []),
                      false,
                    ]);
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
                {babyLoading ? (
                  <div className="inputStyle flex items-center text-gray-500">
                    Loading babies...
                  </div>
                ) : (
                  <Select
                    options={babyOptions}
                    placeholder="Select Baby"
                    isDisabled={babyLoading}
                    onChange={(e) => {
                      setBabyId(e.value);
                    }}
                  />
                )}
                {errors.babyId && (
                  <p className="text-red-600">{errors.babyId.message}</p>
                )}
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
              remvol = getValues(`requisitedMilk.${index}.remainingVol`);
              quantity = getValues(`requisitedMilk.${index}.quantity`);

              return (
                <div
                  key={field.id}
                  className=" flex items-center gap-3 justify-between  text-lg  pt-4"
                >
                  <div className="grid">
                    <label htmlFor="">
                      Batch Number <span className="text-red-600">*</span>
                    </label>
                    <Select
                      options={poolingOptions}
                      placeholder="-- Select Batch Number --"
                      isLoading={poolingLoading}
                      isClearable
                      isSearchable
                      onChange={async (option) => {
                        if (option) {
                          setValue(
                            `requisitedMilk.${index}.batchNumber`,
                            option.value,
                          );
                          const selectedId = option.value;
                          setBottleLoading((prev) => {
                            const copy = Array.isArray(prev) ? [...prev] : [];
                            copy[index] = true;
                            return copy;
                          });
                          try {
                            const response = await getBottle(
                              selectedId.split("/")?.[0],
                            );
                            if (response?.status === 200) {
                              setBottleList((prevData) => {
                                const copy = Array.isArray(prevData)
                                  ? [...prevData]
                                  : [];
                                copy[index] = response?.data?.bottleList;
                                return copy;
                              });
                            } else {
                              setBottleList((prevData) => {
                                const copy = Array.isArray(prevData)
                                  ? [...prevData]
                                  : [];
                                copy[index] = undefined;
                                return copy;
                              });
                            }
                          } catch (err) {
                            setBottleList((prevData) => {
                              const copy = Array.isArray(prevData)
                                ? [...prevData]
                                : [];
                              copy[index] = undefined;
                              return copy;
                            });
                          } finally {
                            setBottleLoading((prev) => {
                              const copy = Array.isArray(prev) ? [...prev] : [];
                              copy[index] = false;
                              return copy;
                            });
                          }
                        } else {
                          setValue(`requisitedMilk.${index}.batchNumber`, "");
                          setBottleList((prevData) => {
                            const copy = Array.isArray(prevData)
                              ? [...prevData]
                              : [];
                            copy[index] = undefined;
                            return copy;
                          });
                        }
                      }}
                    />
                    {errors?.requisitedMilk?.[index]?.batchNumber && (
                      <p className="errorMessages">
                        {errors.requisitedMilk[index].batchNumber.message}
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
                    <Select
                      options={
                        bottleList[index]
                          ?.filter((item) => item?.isActive === true)
                          ?.filter((item) => item?.remainingVoluem > 0)
                          ?.map((subItem) => ({
                            label: `${subItem?.name}`,
                            value: `${subItem?._id}/${subItem?.name}/${subItem?.remainingVoluem}`,
                          })) || []
                      }
                      placeholder={
                        bottleLoading?.[index]
                          ? "Loading bottles..."
                          : bottleList[index]
                            ? "-- Select bottle --"
                            : "Select batch first"
                      }
                      isClearable
                      isSearchable
                      isDisabled={!bottleList[index] && !bottleLoading?.[index]}
                      isLoading={!!bottleLoading?.[index]}
                      onChange={(option) => {
                        if (option) {
                          const selectedValue = option.value;
                          setValue(
                            `requisitedMilk.${index}.bottleName`,
                            selectedValue,
                          );
                          setWatchBottle((prevData) => [
                            ...prevData.slice(0, index),
                            selectedValue?.split("/")[0],
                            ...prevData.slice(index + 1),
                          ]);
                          setValue(
                            `requisitedMilk.${index}.remainingVol`,
                            selectedValue?.split("/")[2],
                          );
                          setIsValid(
                            watchBottle.includes(selectedValue?.split("/")[0]),
                          );
                        } else {
                          setValue(`requisitedMilk.${index}.bottleName`, "");
                          setValue(`requisitedMilk.${index}.remainingVol`, "");
                        }
                      }}
                    />
                    {errors?.requisitedMilk?.[index]?.bottleName && (
                      <p className="errorMessages">
                        {errors.requisitedMilk[index].bottleName.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Remaining Volume</label>
                    <input
                      type="text"
                      className="inputStyle"
                      readOnly
                      {...register(`requisitedMilk.${index}.remainingVol`)}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="">
                      ML<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      className={`inputStyle ${
                        remvol < quantity ? "bg-red-600/50" : ""
                      }`}
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
                    <div className="font-bold text-lg flex items-center justify-center">
                      <button
                        className="text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg "
                        onClick={() => removeHandler(index)}
                      >
                        {/* Remove */}
                        <FaTrashAlt />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="my-5 font-bold text-xl">
              <button
                className={`text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg disabled:bg-gray-300  disabled:cursor-not-allowed `}
                disabled={
                  validVolume > 150
                    ? true
                    : false || isSubmitting || feedingDate > aa
                      ? true
                      : false || remvol < quantity
                        ? true
                        : false
                }
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
