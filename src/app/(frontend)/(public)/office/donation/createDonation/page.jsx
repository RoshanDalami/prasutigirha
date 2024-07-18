"use client";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import FormBorder from "src/components/reusableForm";
import {CreateDonaton} from "../../../../../../services/apiService/officeService/office";
import {useRouter} from "next/navigation";

function CreateDonation({clickedDataId}) {
    const router = useRouter();
    console.log(clickedDataId.name, 'response');
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setValue
    } = useForm({});
    const onSubmit = async (data) => {
        try {
            const response = await CreateDonaton(data);
            console.log(response, 'response');
            if (response.status === 200) {
                router.push("/office/donation");
            }
        } catch (error) {
        }
    };
    useEffect(() => {
        if (clickedDataId) {
            setValue('id', clickedDataId?._id);
            setValue('name', clickedDataId.name);
        }
    }, [clickedDataId, setValue]);
    return (
        <div className="mx-5">
            <FormBorder title={"Create Donation"}>
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <div>
                        <div className="grid md:grid-cols-3">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className="text-lg">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    {...register("name", {required: "Name is required !!!"})}
                                    className="inputStyle text-lg"
                                    placeholder="Donataion place name"
                                />
                                {errors?.name && <p className={'text-red-600'}>{errors?.name?.message}</p>}
                            </div>
                        </div>
                        <div className="mt-3">
                            <button className="bg-red-600 px-6 py-2 rounded-md text-white hover:bg-blue-900"
                                    type={"submit"}>
                                {isSubmitting ? "Submitting" : "Submit"}
                            </button>
                        </div>
                    </div>
                </form>
            </FormBorder>
        </div>
    );
}

export default CreateDonation;
