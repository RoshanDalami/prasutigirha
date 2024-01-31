"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stepper1 from "src/components/stepper1";
import Stepper2 from "src/components/stepper2";
import Stepper3 from "src/components/Stepper3";
import Stepper4 from "src/components/stepper4";
import Stepper5 from "src/components/Stepper5";

const steps = [
  "Add Donor Records",
  "Baby Status",
  "Verbal Examination Record",
  "Physical Examination Record ",
  "Submit Information",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  //mycode

  return (
    <div className="mx-10">
      <Box sx={{ width: "100%", mt: 5 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="">
              {activeStep === 0 && <Stepper1 />}
              {activeStep === 1 && <Stepper2 />}
              {activeStep === 2 && <Stepper3 />}
              {activeStep === 3 && <Stepper4 />}
              {activeStep === 4 && <Stepper5 />}
            </div>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}

            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                pt: 2,
              }}
            >
              <div className="flex justify-between  w-full ">
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <div className="flex justify-between">
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) && (
                    <Button
                      color="inherit"
                      onClick={handleSkip}
                      sx={{ mr: 1, border: 1, borderColor: "#004a89" }}
                    >
                      Skip
                    </Button>
                  )}

                  <Button
                    onClick={handleNext}
                    sx={{
                      border: 1,
                      borderColor: "#004a89",
                      "&:hover": {
                        borderColor: "skyblue",
                      },
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </div>
              </div>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
