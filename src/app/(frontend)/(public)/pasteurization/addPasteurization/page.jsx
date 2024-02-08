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
export default function AddPasteurization() {
  const [date, setDate] = useState("");
  const engDate = new BikramSambat(date, "BS").toAD();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      donorDetailsForPooling: [
        { donorId: "", volumeOfMilkPooled: 0, remaining: 0 },
      ],
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
  const onSubmit = async (data) => {
    data = {
      ...data,
      date,
      engDate,
    };
    console.log(data, "response");
    // try {
    //   const response = await axios.post(`${urls.createPooling}`, data);
    //   if (response.status === 200) {
    //     router.push("/pasteurization/pasteurizationList");
    //   }
    // } catch (error) {}
  };

  const poolingCondition = [
    { id: 1, name: "condition 1" },
    { id: 2, name: "condition 2" },
    { id: 3, name: "condition 3" },
    { id: 4, name: "condition 4" },
  ];
  //  useEffect(()=>{
  //    for(let i = 0;i<=watchFields?.donorDetailsForPooling.length;i++ ){
  //     console.log(watchFields?.donorDetailsForPooling[i]?.volumeOfMilkPooled,'response')
  //    }
  //  },[watchFields?.donorDetailsForPooling])

  const [donorList, setDonorList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { status, data } = await axios.get(`${urls.getVolumeOfMilk}`);
      if (status === 200) {
        setDonorList(data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    watchArray.forEach((item, index) => {
      donorList.forEach((donor, index) => {
        if(item.donorId === donor.donorId){
          setValue(`donorDetailsForPooling.${index}.remaining`,donor.remaining)
          
        }
      });
    });
  }, [donorList, setValue, watchArray]);

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
                  {...register("poolingCondition")}
                  required
                >
                  <option selected disabled value={""}>
                    --Select Condition--
                  </option>
                  {poolingCondition?.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="">
                  Pooling Date<span className="text-red-600">*</span>
                </label>

                <NepaliDatePicker
                  inputClassName="form-control  focus:outline-none"
                  value={date}
                  onChange={(e) => setDate(e)}
                  options={{ calenderLocale: "ne", valueLocale: "en" }}
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
                        remaining: 0,
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
                const watchInput = watch(
                  `donorDetailsForPooling.${index}.volumeOfMilkPooled`
                );

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
                        {...register(`donorDetailsForPooling.${index}.donorId`)}
                      >
                        <option selected disabled value={""}>
                          --Select Donor--
                        </option>
                        {donorList?.map((item, index) => {
                          const combinedValue = `${item.donorId}`;
                          
                          return (
                            <option key={index} value={combinedValue}>
                              {item.donorName} (Remaining Volume:
                              {item.remaining}ml)
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="flex flex-col w-2/4 ">
                      <label htmlFor="">
                        Volume of milk<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        className="inputStyle"
                        placeholder="Volume of Milk"
                        required
                        {...register(
                          `donorDetailsForPooling.${index}.volumeOfMilkPooled`,
                          { valueAsNumber: true }
                        )}
                      />
                    </div>
                    {/* remaining  */}
                    {/* <div>
                      <label htmlFor="">Remaining</label>
                      <input
                        type="text"
                        className="inputStyle"
                        {...register(
                          `donorDetailsForPooling.${index}.remaining`
                        )}
                      />
                    </div> */}

                    {/* <div key={index}>
                          <label htmlFor="" className="text-xs">
                            Remaining Volume
                          </label>
                          <input
                            type="number"
                            readOnly
                            className="inputStyle"
                            {...register(`donorDetailsForPooling.${index}.remaining`)}
                           
                          />
                        </div> */}

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
                disabled={milkVolume > 1500 ? true : false}
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
