'use client'
import React from "react";
import { serologyAtom,serologyAtom1,serologyAtom2 } from "src/recoil/serology/serologyAtom";
import { useRecoilValue } from "recoil";
import { submittingAtom } from "src/recoil/isSubmiting/submittingAtom";
const StepperControl = ({ handleClick, currentStep, steps }) => {
  const serologyStatus = useRecoilValue(serologyAtom)
  const serologyStatus1 = useRecoilValue(serologyAtom1)
  const serologyStatus2 = useRecoilValue(serologyAtom2)
  const isSubmitting = useRecoilValue(submittingAtom)

  return (
    <div className="container flex justify-around mb-8">
      {/* back button */}
      <button
        onClick={() => handleClick()}
        className={`bg-gray-400 text-black uppercase py-2 px-4 rounded-xl font-semibold cursor-pinter boder-2 border-slate-500  hover:bg-[#004a89] hover:text-white transition  duration-200 ease-in-out ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
        } `}
      >
        Back
      </button>
      {/* next button */}
      {(serologyStatus == "false" || serologyStatus1 == 'false' || serologyStatus2 == 'false' )? (
         <button
         // onClick={() => handleNext()}
         className="bg-red-600 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pinter boder-2 border-slate-300  hover:bg-[#004a89] hover:text-white transition  duration-200 ease-in-out"
       >
         {currentStep === steps.length ? ( isSubmitting?" Submitting ... ":  "Submit") : "Next"}
       </button>
      ) : (
        <button
         // onClick={() => handleNext()}
         className="bg-red-600 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pinter boder-2 border-slate-300  hover:bg-[#004a89] hover:text-white transition  duration-200 ease-in-out"
       >
         { "Submit"}
       </button>
      ) }
     
     
    </div>
  );
};

export default StepperControl;
