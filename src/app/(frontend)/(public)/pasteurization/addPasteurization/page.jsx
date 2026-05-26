"use client";
import React, { useState, useEffect } from "react";
import FormBorder from "@/components/reusableForm";
import { useFieldArray, useForm } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { createPooling, getColostrum, getDonorByGestationalAge } from "src/services/apiService/pasteurization/pasteurization";
import { getMilkListByDonor } from "src/services/apiService/milkVolume/milkVolume";
import { useGestational } from "src/hooks/useDropdown";
import { useQuery } from "@tanstack/react-query";

const aa = new BikramSambat(new Date()).toBS();

export default function AddPasteurization({ clickedIdData }) {
  const userInfo = typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem("userInfo")) : "";
  const [date, setDate] = useState(aa);
  const engDate = new BikramSambat(date, "BS").toAD();
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { isSubmitting, errors }, setValue, control, getValues } = useForm({
    defaultValues: {
      donorDetailsForPooling: [{ donorId: "", milkvolumeId: "", volumeOfMilkPooled: 0, remainingVol: 0 }],
    },
  });

  const watchFields = watch();
  const { fields, append, remove } = useFieldArray({ control, name: "donorDetailsForPooling" });
  const removeHandler = (e, index) => { e.preventDefault(); remove(index); };

  const watchArray = watchFields?.donorDetailsForPooling;
  const sum = (array) => array.reduce((acc, currentValue) => acc + currentValue, 0);
  const milkVolume = sum(watchArray.map((item) => item?.volumeOfMilkPooled));

  const { data: gestationalAgeList = [] } = useGestational();

  const selectedGestationalAge = watchFields?.gestationalAge;
  const { data: donorList = [] } = useQuery({
    queryKey: ["pasteurization", "donorList", selectedGestationalAge],
    queryFn: async () => {
      const { data } = selectedGestationalAge != 4
        ? await getDonorByGestationalAge(selectedGestationalAge)
        : await getColostrum();
      return data ?? [];
    },
    enabled: !!selectedGestationalAge,
  });

  const [milkList, setMilkList] = useState([]);
  const [tryArray, setTryArray] = useState([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (router?.query?.id || clickedIdData) {
      setValue("_id", clickedIdData?._id);
      setValue("gestationalAge", clickedIdData?.poolingCondition);
      setDate(clickedIdData?.date);
      clickedIdData?.donorDetailsForPooling?.forEach((item, index) => {
        setValue("_id", item._id);
        setValue(`donorDetailsForPooling.${index}.donorId`, item.donorId);
        setValue(`donorDetailsForPooling.${index}.collectedDate`, item.collectedDate);
        setValue(`donorDetailsForPooling.${index}.volumeOfMilkPooled`, item.volumeOfMilkPooled);
      });
      setValue("expireDate", clickedIdData?.expireDate);
      setValue("collectedVolume", clickedIdData?.collectedVolume);
      setValue("batchName", clickedIdData?.batchName);
    }
  }, [clickedIdData, router?.query?.id, setValue]);

  const onSubmit = async (data) => {
    const newArray = watchArray.map((item) => ({
      ...item,
      donorId: item.donorId.split("/")[0],
      milkvolumeId: item.milkvolumeId.split("/")[0],
      collectedDate: item.milkvolumeId.split("/")[2],
      donorName: item.donorId.split("/")[2],
    }));
    data = {
      ...data,
      poolingCondition: data.gestationalAge,
      userId: userInfo?.userDetail?._id,
      date,
      engDate,
      collectedVolume: milkVolume,
      donorDetailsForPooling: newArray,
    };
    try {
      const response = await createPooling(data);
      if (response?.status === 200) {
        toast.success("Polling Created Successfully");
        router.push("/pasteurization/pasteurizationList");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Pooling Creation Failed");
    }
  };

  const gestationalOptions = gestationalAgeList?.map((item, index) => (
    <option key={index} value={item.gestationalId}>{item.gestationalName}</option>
  ));

  let remVol, poolVol;

  return (
    <div className="mx-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormBorder title={"Pasteurization Process (Pooling Process)"}>
          <div className="grid grid-cols-2 my-5 gap-8">
            <div className="flex flex-col">
              <label>Pooling Condition<span className="text-red-600">*</span></label>
              <select className="inputStyle" {...register("gestationalAge", { required: "Gestational Age Required" })}>
                <option disabled value="">--Select Condition--</option>
                <option value={4}>Colostrum</option>
                {gestationalOptions}
              </select>
              {errors?.gestationalAge && <p className="errorMessages">{errors.gestationalAge.message}</p>}
            </div>
            <div className="flex flex-col">
              <label>Pooling Date<span className="text-red-600">*</span></label>
              <NepaliDatePicker
                inputClassName="form-control focus:outline-none"
                value={date}
                onChange={(e) => setDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className="inputStyle"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-end">
              <button
                className="bg-indigo-600 rounded-md shadow-md px-6 py-2 font-bold text-white"
                onClick={(e) => { e.preventDefault(); append({ donorId: "", milkvolumeId: "", volumeOfMilkPooled: 0, remainingVol: 0 }); }}
              >
                add donor
              </button>
            </div>
            {fields.map((field, index) => {
              remVol = getValues(`donorDetailsForPooling.${index}.remainingVol`);
              poolVol = getValues(`donorDetailsForPooling.${index}.volumeOfMilkPooled`);
              return (
                <div key={field.id} className="flex items-center gap-3 justify-between">
                  <div className="flex flex-col w-2/4">
                    <label>Donor Name<span className="text-red-600">*</span></label>
                    <select
                      className="inputStyle"
                      required
                      {...register(`donorDetailsForPooling.${index}.donorId`, { required: "Donor Name required" })}
                      onChange={async (e) => {
                        const currentId = e.target.value;
                        const response = await getMilkListByDonor(currentId.split("/")[0]);
                        if (response?.status === 200) {
                          setMilkList((prevData) => [...prevData.slice(0, index), response?.data, ...prevData.slice(index + 1)]);
                        } else {
                          setMilkList([]);
                        }
                      }}
                    >
                      <option disabled value="">--Select Donor--</option>
                      {donorList?.map((item, i) => {
                        const combinedValue = `${item.donorId}/${item.date}/${item.donorName}`;
                        if (item.remaining != 0) {
                          return (
                            <option key={i} value={combinedValue}>
                              {item.donorName} ({item.donorRegNo}) {item.is28Days ? item.gestationalId == 2 ? "PT" : "" : ""}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col w-2/4">
                    <label>Milk List<span className="text-red-600">*</span></label>
                    <select
                      className="inputStyle"
                      required
                      {...register(`donorDetailsForPooling.${index}.milkvolumeId`, { required: "Milk required" })}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        setTryArray((prevData) => [...prevData.slice(0, index), selectedValue.split("/")[0], ...prevData.slice(index + 1)]);
                        setValue(`donorDetailsForPooling.${index}.remainingVol`, selectedValue.split("/")[1]);
                        setIsValid(tryArray.includes(selectedValue.split("/")[0]));
                      }}
                    >
                      <option disabled value="">--Select Milk--</option>
                      {milkList?.map((item, index0) => (
                        <React.Fragment key={index}>
                          {index0 === index && item?.map((subItem, subIndex) => {
                            const bottleCombValue = `${subItem?._id}/${subItem?.remaining}/${subItem?.date}`;
                            return (
                              <option key={subIndex} value={bottleCombValue}>
                                {subItem?.date} {subItem?.isColostrum ? "(Colostrum)" : ""}
                              </option>
                            );
                          })}
                        </React.Fragment>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Remaining Volume<span className="text-red-600">*</span></label>
                    <input type="text" className="inputStyle" readOnly {...register(`donorDetailsForPooling.${index}.remainingVol`, { valueAsNumber: true })} />
                  </div>
                  <div className="flex flex-col w-2/4">
                    <label>Volume of milk <span className="text-red-600">*</span></label>
                    <input
                      type="number" min="0"
                      className={`inputStyle ${remVol < poolVol ? "bg-red-600/50" : ""}`}
                      placeholder="Volume of Milk"
                      required
                      {...register(`donorDetailsForPooling.${index}.volumeOfMilkPooled`, { valueAsNumber: true, min: 0 })}
                    />
                  </div>
                  {fields?.length > 1 && (
                    <div className="flex items-center mt-5">
                      <button className="bg-red-600 rounded-md shadow-md px-6 py-2 font-bold text-white" onClick={(e) => removeHandler(e, index)}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="my-3">
            <button
              className="text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={milkVolume > 2500 || isSubmitting || isValid || remVol < poolVol}
              type="submit"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
          <div>Pooled Volume : {milkVolume}</div>
        </FormBorder>
      </form>
    </div>
  );
}
