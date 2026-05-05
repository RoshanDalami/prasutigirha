'use client'
import React from "react";
import TableBorder from "src/components/TableDesign";
import {useForm} from 'react-hook-form'
import {giveAccess} from '../../../../../../services/apiService/officeService/office'
export default function AccessManager() {
    const {register , handleSubmit,formState:{isSubmitting}}=useForm({})
    const onSubmit = async(data)=>{
        const response = await giveAccess(data);
        console.log(response)
    }
  return (
    <div className="mx-10">
      <TableBorder title={"Access Manager"}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-4 mt-12">
            <div className="flex gap-3 items-center">
              <label htmlFor="" className="text-2xl ">
                Office
              </label>
              <input
                type="checkbox"
                name=""
                id=""
                value={"office"}
                className=" h-6 w-6"
                {...register("assignedModule")}
              />
            </div>
            <div className="flex gap-3 items-center">
              <label htmlFor="" className="text-2xl">
                Donor Records
              </label>
              <input
                type="checkbox"
                name=""
                id=""
                value={"donor"}
                className="h-6 w-6"
                {...register("assignedModule")}
              />
            </div>
            <div className="flex gap-3 items-center">
              <label htmlFor="" className="text-2xl">
                Volume of Milk
              </label>
              <input
                type="checkbox"
                name=""
                id=""
                value={"volume"}
                className="h-6 w-6"
                {...register("assignedModule")}
              />
            </div>
            <div className="flex gap-3 items-center">
              <label htmlFor="" className="text-2xl">
                Pasteurization
              </label>
              <input
                type="checkbox"
                name=""
                id=""
                value={"pasteurization"}
                className="h-6 w-6"
                {...register("assignedModule")}
              />
            </div>
            <div className="flex gap-3 items-center">
              <label htmlFor="" className="text-2xl">
                Milk Requisition
              </label>
              <input
                type="checkbox"
                name=""
                id=""
                value={"requisition"}
                className="h-6 w-6"
                {...register("assignedModule")}
              />
            </div>
            <div className="flex gap-3 items-center">
              <label htmlFor="" className="text-2xl ">
                Report
              </label>
              <input
                type="checkbox"
                name=""
                id=""
                value={"report"}
                className="h-6 w-6"
                {...register("assignedModule")}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-green-600 text-white rounded-md shadow-md px-4 py-2" type="submit" >
              Grant Access
            </button>
          </div>
        </form>
      </TableBorder>
    </div>
  );
}
