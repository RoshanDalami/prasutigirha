"use client";
import React, {useState} from "react";
import {useParams} from "next/navigation";
import {NepaliDatePicker} from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import FormBorder from "src/components/reusableForm";

const aa = new BikramSambat(new Date()).toBS();
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {updateSerology} from "../../../../../../../services/apiService/donorRecord/donor";
import {useRouter} from "next/navigation";

function SerologyUpdatePage() {
    const router = useRouter();
    const {id} = useParams();
    const {
        register, handleSubmit, formState: {errors, isSubmitting},
    } = useForm();
    //Nepali date
    const [testDate, setTestDate] = useState(aa);
    const [hivTestDate, setHivTestDate] = useState(aa);
    const [hbsagTestDate, setHbsagTestDate] = useState(aa);

    const engTestDate = new BikramSambat(testDate, "BS").toAD();

    const onSubmit = async (data) => {
        const finalData = {
            hiv: JSON.parse(data.hiv),
            hbsag: JSON.parse(data.hbsag),
            vdrl: JSON.parse(data.vdrl),
            dateOfTest: testDate,
            engDateTest: engTestDate,
            dateOfHivTest: hivTestDate,
            dateofHbsagTest: hbsagTestDate,
            donorId: id,
        };
        try {
            const response = await updateSerology(finalData);
            if (response?.status === 200) {
                toast.success(response?.message);
                router.push("/donorRecord/viewDonorRecord");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (<div className="mx-5">
        <FormBorder title={" Serology Records Update"}>
            <p className="font-bold text-xl py-5 ">Serology Screening Records:</p>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="grid grid-cols-2 gap-4 text-lg">
                    <div className="grid">
                        <label>
                            {" "}
                            HIV Test
                            <span className="text-red-600">*</span>
                        </label>
                        <select
                            className="inputStyle"
                            {...register("hiv", {
                                required: "Yes/No Required",
                            })}
                        >
                            {" "}
                            <option selected disabled value={""}>
                                --select HIV Status--
                            </option>
                            <option value={true}>Reactive</option>
                            <option value={false}>Non-Reactive</option>
                        </select>
                        {errors.hiv && (<p className="errorMessages">{errors.hiv.message}</p>)}
                    </div>
                    <div className="flex flex-col">
                        <label>
                            {" "}
                            Date of HIV Test
                            <span className="text-red-600">*</span>
                        </label>

                        <NepaliDatePicker
                            inputClassName="form-control  focus:outline-none"
                            value={hivTestDate}
                            onChange={(e) => setHivTestDate(e)}
                            options={{calenderLocale: "en", valueLocale: "en"}}
                            className="inputStyle"
                            // {...register("dateOfBirth", { required: true })}
                        />
                        {errors.dateOfTest && (<p className="errorMessages">{errors.dateOfTest.message}</p>)}
                    </div>
                    <div className="flex flex-col">
                        <label>
                            {" "}
                            HBSAG Test
                            <span className="text-red-600">*</span>
                        </label>
                        <select
                            className="inputStyle"
                            {...register("hbsag", {
                                required: "Yes/No Required",
                            })}
                        >
                            {" "}
                            <option selected disabled value={""}>
                                --select HBSAG Status--
                            </option>
                            <option value={true}>Reactive</option>
                            <option value={false}>Non-Reactive</option>
                        </select>
                        {errors.hbsag && (<p className="errorMessages">{errors.hbsag.message}</p>)}
                    </div>
                    <div className="flex flex-col">
                        <label>
                            {" "}
                            Date of HBSAG Test
                            <span className="text-red-600">*</span>
                        </label>

                        <NepaliDatePicker
                            inputClassName="form-control  focus:outline-none"
                            value={hbsagTestDate}
                            onChange={(e) => setHbsagTestDate(e)}
                            options={{calenderLocale: "en", valueLocale: "en"}}
                            className="inputStyle"
                            // {...register("dateOfBirth", { required: true })}
                        />
                        {errors.dateOfTest && (<p className="errorMessages">{errors.dateOfTest.message}</p>)}
                    </div>
                    <div className="flex flex-col">
                        <label>
                            {" "}
                            VDRL Test
                            <span className="text-red-600">*</span>
                        </label>
                        <select
                            className="inputStyle"
                            {...register("vdrl", {
                                required: "Yes/No Required",
                            })}
                        >
                            {" "}
                            <option selected disabled value={""}>
                                --select VDRL Status--
                            </option>
                            <option value={true}>Reactive</option>
                            <option value={false}>Non-Reactive</option>
                        </select>
                        {errors.vdrl && (<p className="errorMessages">{errors.vdrl.message}</p>)}
                    </div>
                    <div className="flex flex-col">
                        <label>
                            {" "}
                            Date of VDRL Test
                            <span className="text-red-600">*</span>
                        </label>

                        <NepaliDatePicker
                            inputClassName="form-control  focus:outline-none"
                            value={testDate}
                            onChange={(e) => setTestDate(e)}
                            options={{calenderLocale: "en", valueLocale: "en"}}
                            className="inputStyle"
                            // {...register("dateOfBirth", { required: true })}
                        />
                        {errors.dateOfTest && (<p className="errorMessages">{errors.dateOfTest.message}</p>)}
                    </div>
                </div>
                <div className="py-5 flex justify-end gap-5">
                    <button onClick={() => router.push(`/donorRecord/viewDonorRecord`)} type={"button"}
                            className={"bg-gray-300 rounded-lg px-6 py-2 text-white font-bold "}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 rounded-lg px-6 py-2 text-white disabled:bg-gray-200 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "submitting" : "Submit"}
                    </button>
                </div>
            </form>
        </FormBorder>
    </div>);
}

export default SerologyUpdatePage;
