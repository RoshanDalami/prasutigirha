"use client";
import React, {useEffect, useState} from "react";
import {getPoolingById} from "@/services/apiService/pasteurization/pasteurization";
import {NepaliDatePicker} from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import "nepali-datepicker-reactjs/dist/index.css";
import {useRouter, useParams} from "next/navigation";
import FormBorder from "src/components/reusableForm";
import {Controller, useForm} from "react-hook-form";
import {
    updateOther, Discard,
} from "../../../../../../../services/apiService/pasteurization/pasteurization";

const aa = new BikramSambat(new Date()).toBS();
import {useFieldArray} from "react-hook-form";

export default function OtherReport() {
    const {id} = useParams();
    const router = useRouter();
    const [apiData, setApiData] = useState({});
    const [date, setDate] = useState(aa);
    const {
        register, handleSubmit, formState: {isSubmitting, errors}, control,
    } = useForm({
        defaultValues: {
            other: [{testName: "", testResult: ""}],
        },
    });
    useEffect(() => {
        async function fetchData() {
            const response = await getPoolingById(id);
            console.log(response);
        }

        fetchData();
    }, [id]);
    const {fields, append, remove} = useFieldArray({
        control, name: "other",
    });
    const onSubmit = async (data) => {
        data = {
            ...data, id: id,
        };
        console.log(data);
        const response = await updateOther(data);
        if (response?.status === 200) {
            router.push("/donorRecord/viewDonorRecord");
        }
    };
    const handleDiscard = async () => {
        const response = await Discard(id);
        if (response?.status === 200) {
            router.push("/pasteurization/pasteurizationList");
        }
    };

    const handleAppend = (e) => {
        e.preventDefault();
        append({testName: "", testResult: ""});
    };

    return (<div className="mx-4">
        <FormBorder title={"Test Result"}>
            <form action="" onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className=" flex  flex-col gap-3">
                    <div className="flex justify-end my-3">
                        <button
                            className="bg-indigo-600 text-white rounded-md px-4 py-2"
                            onClick={(e) => handleAppend(e)}
                        >
                            Add
                        </button>
                    </div>

                    {fields?.map((field, index) => {
                        return (<div
                            key={field.id}
                            className="flex items-center gap-3 justify-between"
                        >
                            <div className="flex flex-col">
                                <label>
                                    Test Date<span className="text-red-600">*</span>
                                </label>
                                <Controller
                                    control={control}
                                    name={`other.${index}.testDate`}
                                    render={({field: {onChange, value}}) => (<NepaliDatePicker
                                        inputClassName="form-control focus:outline-none"
                                        value={value}
                                        onChange={onChange}
                                        options={{calenderLocale: "en", valueLocale: "en"}}
                                        className="inputStyle"
                                    />)}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="">
                                    Test Name <span className="text-red-600">*</span>{" "}
                                </label>
                                <input
                                    type="text"
                                    className="inputStyle"
                                    {...register(`other.${index}.testName`, {
                                        required: "Test Name is required",
                                    })}
                                    placeholder="Test Name"
                                />
                                {errors?.other?.[index]?.testName && (<p className="text-red-600">
                                    {errors?.other?.[index]?.testName.message}
                                </p>)}
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="">
                                    Other Test Result <span className="text-red-600">*</span>{" "}
                                </label>
                                <select
                                    className="inputStyle"
                                    {...register(`other.${index}.testResult`, {
                                        required: "Test result is required",
                                    })}
                                >
                                    <option value="" selected disabled>
                                        --Select Result--
                                    </option>
                                    <option value={true}>Positive</option>
                                    <option value={false}>Negative</option>
                                </select>
                                {errors?.other?.[index]?.testResult && (<p className="text-red-600">
                                    {errors?.other?.[index]?.testResult.message}
                                </p>)}
                            </div>
                            {fields?.length > 1 && (<div>
                                <button
                                    className="bg-red-600 text-white rounded-md shadow-md px-3 py-2"
                                    onClick={() => remove(index)}
                                >
                                    Remove
                                </button>
                            </div>)}
                        </div>);
                    })}
                </div>
                <div className="flex justify-end gap-5 my-2">
                    <button className={`bg-gray-300 rounded-lg px-6 py-2 font-bold text-white`}
                            onClick={() => router.push("/donorRecord/viewDonorRecord")}
                            type={'button'}>
                        Cancel
                    </button>
                    <button
                        className={`text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg disabled:bg-gray-300  disabled:cursor-not-allowed `}
                        disabled={isSubmitting || date > aa ? true : false}
                        type="submit"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </FormBorder>
    </div>);
}
