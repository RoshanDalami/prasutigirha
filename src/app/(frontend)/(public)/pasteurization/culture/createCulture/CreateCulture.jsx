"use client";
import React, { useState } from "react";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
const aa = new BikramSambat(new Date()).toBS();
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import FormBorder from "src/components/reusableForm";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { getBottle } from "src/services/apiService/bottle/bottleServices";
import { createCulture } from "src/services/apiService/culture/cultureService";
import { useRouter } from "next/navigation";
import { usePasteurizationList } from "src/hooks/usePasteurization";
import { useQuery } from "@tanstack/react-query";

export default function CreateCulture() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { isSubmitting, errors }, setValue, control } = useForm({
    defaultValues: { cultureBottleList: [{ bottleId: "", cultureResult: null, cultureRemark: "" }] },
  });
  const watchFields = watch();
  const { fields, append, remove } = useFieldArray({ control, name: "cultureBottleList" });
  const [date, setDate] = useState(aa);
  const engDate = new BikramSambat(date, "BS").toAD();

  const { data: pastResult = {} } = usePasteurizationList(1, 500);
  const apiData = pastResult.data ?? [];

  const batchId = watchFields?.batchId;
  const { data: bottleList = [] } = useQuery({
    queryKey: ["bottle", "list", batchId],
    queryFn: async () => {
      const { data } = await getBottle(batchId);
      return data?.bottleList ?? [];
    },
    enabled: !!batchId,
  });

  const removeHandler = (e, index) => { e.preventDefault(); remove(index); };

  const onSubmit = async (data) => {
    data = { ...data, cultureDate: date, cultureEngDate: engDate };
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label>Culture Date<span className="text-red-600">*</span></label>
              <NepaliDatePicker
                inputClassName="form-control focus:outline-none"
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
              onClick={(e) => { e.preventDefault(); append({ bottleId: "", cultureResult: null, cultureRemark: "" }); }}
            >
              Add
            </button>
          </div>
          {fields.map((field, index) => {
            const watchResult = watch(`cultureBottleList.${index}.cultureResult`);
            return (
              <div key={field.id} className="flex items-center gap-3 w-full">
                <div className="flex flex-col w-2/4">
                  <label>Batch</label>
                  <select className="inputStyle" {...register(`cultureBottleList.${index}.batchId`)}>
                    <option value="" disabled>--Select Batch--</option>
                    {apiData?.map((item, i) => {
                      if (item.culture === null) {
                        return <option key={i} value={item._id}>{item.batchName} {`(${item.date})`}</option>;
                      }
                    })}
                  </select>
                </div>
                <div className="flex flex-col w-2/4">
                  <label>Culture Result</label>
                  <select className="inputStyle text-sm" {...register(`cultureBottleList.${index}.cultureResult`)}>
                    <option value="" disabled>--Update Culture--</option>
                    <option value={true}>Positive</option>
                    <option value={false}>Negative</option>
                  </select>
                </div>
                {fields?.length > 1 && (
                  <div className="flex items-center justify-center mt-6">
                    <div className="bg-red-600 text-white p-4 rounded-md shadow-md cursor-pointer" onClick={(e) => removeHandler(e, index)}>
                      <FaTrashAlt />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <button
            className="bg-red-600 text-white my-4 text-lg rounded-md py-2 px-5 hover:bg-[#052c65] disabled:cursor-not-allowed disabled:bg-gray-200"
            type="submit"
            disabled={isSubmitting || date > aa}
          >
            {isSubmitting ? "Submitting ..." : "Submit"}
          </button>
        </form>
      </FormBorder>
    </div>
  );
}
