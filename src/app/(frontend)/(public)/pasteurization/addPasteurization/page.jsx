"use client";
import FormBorder from "@/components/reusableForm";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { urls } from "src/services/apiHelpers";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat, { ADToBS, BSToAD } from "bikram-sambat-js";
import toast from "react-hot-toast";
const aa = new BikramSambat(new Date()).toBS();

export default function AddPasteurization({ clickedIdData }) {
  const userInfo =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : "";

  const [date, setDate] = useState(aa);

  const engDate = new BikramSambat(date, "BS").toAD();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      donorDetailsForPooling: [{ donorId: "", volumeOfMilkPooled: 0 }],
    },
  });
  const watchFields = watch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "donorDetailsForPooling",
  });
  const removeHandler = (e, index) => {
    e.preventDefault();
    remove(index);
  };
  const watchArray = watchFields?.donorDetailsForPooling;
  const sum = (array) =>
    array.reduce((acc, currentValue) => acc + currentValue, 0);
  const watchVolume = watchArray.map((item, index) => {
    return item?.volumeOfMilkPooled;
  });
  let milkVolume = sum(watchVolume);

  useEffect(() => {
    if (router?.query?.id || clickedIdData) {
      setValue("_id", clickedIdData?._id);
      setValue("gestationalAge", clickedIdData?.poolingCondition);
      setDate(clickedIdData?.date);
      clickedIdData?.donorDetailsForPooling?.forEach((item, index) => {
        setValue("_id", item._id);
        setValue(`donorDetailsForPooling.${index}.donorId`, item.donorId);
        setValue(
          `donorDetailsForPooling.${index}.collectedDate`,
          item.collectedDate
        );
        setValue(
          `donorDetailsForPooling.${index}.volumeOfMilkPooled`,
          item.volumeOfMilkPooled
        );
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
      collectedDate: item.donorId.split("/")[1],
      donorName: item.donorId.split("/")[2],
    }));
    data = {
      ...data,
      poolingCondition: data.gestationalAge,
      userId: userInfo._id,
      date,
      engDate,
      collectedVolume: milkVolume,
      donorDetailsForPooling: newArray,
    };

    try {
      const response = await axios.post(`${urls.createPooling}`, data);
      if (response.status === 200) {
        toast.success("Polling Created Successfully");
        router.push("/pasteurization/pasteurizationList");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Pooling Creation Failed");
    }
  };

  //  useEffect(()=>{
  //    for(let i = 0;i<=watchFields?.donorDetailsForPooling.length;i++ ){
  //     console.log(watchFields?.donorDetailsForPooling[i]?.volumeOfMilkPooled,'response')
  //    }
  //  },[watchFields?.donorDetailsForPooling])

  const [donorList, setDonorList] = useState([]);

  useEffect(() => {
    if (watchFields?.gestationalAge) {
      async function fetchData() {
        const { status, data } =
          watchFields?.gestationalAge != 4
            ? await axios.get(
                `${urls.getGestationalPooling}/${watchFields?.gestationalAge}`
              )
            : await axios.get(`${urls.getColostrum}`);
        if (status === 200) {
          setDonorList(data);
        }
      }
      fetchData();
    }
  }, [watchFields?.gestationalAge]);

  useEffect(() => {
    watchArray.forEach((item, index) => {
      donorList.forEach((donor, index) => {
        if (item.donorId === donor.donorId) {
          setValue(
            `donorDetailsForPooling.${index}.remaining`,
            donor.remaining
          );
        }
      });
    });
  }, [donorList, setValue, watchArray]);

  const [gestationalAgeList, setGestationalAgeList] = useState([]);
  // const [selectedGestationalId, setSelectedGestationalId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await axios.get(`${urls.getGestational}`);
      if (status === 200) {
        setGestationalAgeList(data);
      }
    };
    fetchData();
  }, []);
  const gestationalOptions = gestationalAgeList?.map((item, index) => {
    return (
      <option key={index} value={item.gestationalId}>
        {item.gestationalName}
      </option>
    );
  });
  return (
    <>
      <div className="mx-10">
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <FormBorder title={"Pasteurization Process (Pooling Process)"}>
            <div className="grid grid-cols-2 my-5 gap-8">
              <div className="flex flex-col ">
                <label htmlFor="">
                  Pooling Condition<span className="text-red-600">*</span>
                </label>
                <select
                  className="inputStyle"
                  {...register("gestationalAge", {
                    required: " Gestational Age Required",
                  })}
                >
                  <option selected disabled value={""}>
                    --Select Condition--
                  </option>
                  <option value={4}>Colostrum</option>
                  {gestationalOptions}
                </select>
                {errors?.gestationalAge && (
                  <p className="errorMessages">
                    {errors.gestationalAge.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">
                  Pooling Date<span className="text-red-600">*</span>
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
            <div>
              {fields?.length < 6 ? (
                <div className=" flex justify-end">
                  <button
                    className="bg-indigo-600 rounded-md shadow-md px-6 py-2 font-bold text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      append({
                        donorId: "",
                        volumeOfMilkPooled: 0,
                      });
                    }}
                  >
                    add donor
                  </button>
                </div>
              ) : (
                <></>
              )}

              {fields.map((field, index) => {
                return (
                  <div
                    key={field.id}
                    className="flex items-center gap-3 justify-between"
                  >
                    <div className="flex flex-col w-2/4">
                      <label htmlFor="">
                        Donor Name<span className="text-red-600">*</span>
                      </label>
                      <select
                        className={`inputStyle`}
                        required
                        {...register(
                          `donorDetailsForPooling.${index}.donorId`,
                          { required: "Donor Name required" }
                        )}
                      >
                        <option selected disabled value={""}>
                          --Select Donor--
                        </option>
                        {donorList?.map((item, index) => {
                          const combinedValue = `${item.donorId}/${item.date}/${item.donorName}`;
                          // console.log(item,'response')

                          return (
                            <option key={index} value={combinedValue}>
                              {item.donorName} (Remaining Volume:
                              {item.remaining}ml)
                            </option>
                          );
                        })}
                      </select>
                      {errors?.donorId && <p>{errors.donorId.messsage}</p>}
                    </div>
                    <div className="flex flex-col w-2/4 ">
                      <label htmlFor="">
                        Volume of milk<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="inputStyle"
                        placeholder="Volume of Milk"
                        required
                        {...register(
                          `donorDetailsForPooling.${index}.volumeOfMilkPooled`,
                          {
                            valueAsNumber: true,
                            min: 0, // Ensure the value is not negative
                          }
                        )}
                      />
                      {errors &&
                        errors[
                          `donorDetailsForPooling.${index}.volumeOfMilkPooled`
                        ] && (
                          <p className="errorMessages">
                            Volume of milk is required.
                          </p>
                        )}
                    </div>

                    {fields?.length <= 1 ? (
                      <></>
                    ) : (
                      <div className="flex items-center mt-5 ">
                        <button
                          className="bg-red-600 rounded-md shadow-md px-6 py-2 font-bold text-white"
                          onClick={(e) => removeHandler(e, index)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="my-3">
              <button
                className={`text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg disabled:bg-gray-300  disabled:cursor-not-allowed `}
                disabled={milkVolume > 1500 ? true : false || fields.length < 2}
                type="submit"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
            <div>Pooled Volume : {milkVolume}</div>
          </FormBorder>
        </form>
      </div>
    </>
  );
}
