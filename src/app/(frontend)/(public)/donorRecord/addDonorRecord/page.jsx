"use client";
import { useEffect, useState } from "react";

import AddDonorRecord from "src/components/formFields/addDonorRecords";
import PhysicalExamination from "src/components/formFields/physicalExamination";
import SerelogyRecord from "src/components/formFields/serelogyRecord";
import StatusOfBaby from "src/components/formFields/statusOfBaby";
import VerbalExamination from "src/components/formFields/verbalExamination";
import { UseContextProvider } from "src/components/stepper/StepperContext";
import Stepper from "src/components/stepper/stepper";
import { serologyAtom } from "src/recoil/serology/serologyAtom";
import { useRecoilValue } from "recoil";

// import ListHeader from "../../reusableDesign/ListHeader";
export default function CreateAddDonor({ clickedIdData }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({});
  const serologyStatus = useRecoilValue(serologyAtom);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    setUserData(data);
  }, [currentStep]);

  const steps =
    serologyStatus == "false"
      ? [
          "Add Donor Records",
          "Baby Status",
          "Serelogy Record",
          "Verbal Examination Record",
          "Physical Examination Record ",
        ]
      : ["Add Donor Records", "Baby Status","Serelogy Record"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <AddDonorRecord
            handleClick={handleClick}
            currentStep={currentStep}
            clickedIdData={clickedIdData}
            steps={steps}
          />
        );
      case 2:
        return (
          <StatusOfBaby
            handleClick={handleClick}
            currentStep={currentStep}
            clickedIdData={clickedIdData}
            steps={steps}
          />
        );
      case 3:
        return (
          <SerelogyRecord
            handleClick={handleClick}
            currentStep={currentStep}
            clickedIdData={clickedIdData}
            steps={steps}
          />
        );
      case 4:
        return (
          <VerbalExamination
            handleClick={handleClick}
            currentStep={currentStep}
            clickedIdData={clickedIdData}
            steps={steps}
          />
        );
      case 5:
        return (
          <PhysicalExamination
            handleClick={handleClick}
            currentStep={currentStep}
            clickedIdData={clickedIdData}
            steps={steps}
          />
        );
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  return (
    <div
      className={`${
        userData
          ? "mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-full pt-4 "
          : "mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-full pt-4 "
      }`}
    >
      {/* form display part start */}
      <div className="w-[170vw] xl:w-full mx-auto  pb-2 shadow-xl">
        {/* Stepper */}
        <div className="horizontal container ">
          <Stepper steps={steps} currentStep={currentStep} />
          <div className="my-10 p-10 ">
            <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
          </div>
        </div>
      </div>
      {/* form display part end */}
      {/* next component start */}
      {/* {
                userData && (
                    <div className="w-full mx-auto rounded-2xl bg-gray-200 pb-2 shadow-xl">
                        <FormDetailCard currentStep={currentStep} />
                    </div>
                )
            } */}
      {/* next component end */}
    </div>
  );
}
