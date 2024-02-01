
"use client";
import { useState } from "react";
import Button from "./button";
import FormBorder from "./reusableForm";
export default function Stepper1() {
  const [isExternal, setIsExternal] = useState(false);
  function handleExternal(e) {
    setIsExternal(!isExternal);
    e.preventDefault(false);
  }

  return (
    <>
      <form>
        {isExternal ? (
          <div
            className="font-bold text-xl flex justify-end"
            onClick={handleExternal}
          >
            <Button>Internal</Button>
          </div>
        ) : (
          <div
            className="font-bold text-xl flex justify-end"
            onClick={handleExternal}
          >
            <Button>External</Button>
          </div>
        )}

        <FormBorder title={"Add Donor Records"}>
          <div className="md:grid-cols-2 grid text-lg gap-4">
            {/* <div className="grid"> */}
            <div className={`grid ${isExternal ? "hidden" : "block"}`}>
              <label>
                {" "}
                Hospital Registration Number
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Hospital Registration Number"
                className="inputStyle"
              />
            </div>
            <div className="grid">
              <label>
                {" "}
                Date<span className="text-red-600">*</span>
              </label>
              <input type="date" placeholder="" className="inputStyle" />
            </div>
            <div className="grid">
              <label>
                {" "}
                Time<span className="text-red-600">*</span>
              </label>
              <input type="time" placeholder="" className="inputStyle" />
            </div>
            <div className="grid">
              <label>
                {" "}
                Donor Full Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Donar Full Name"
                className="inputStyle"
              />
            </div>
            <div className="grid">
              <label>
                {" "}
                Donor Age<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Donar Age"
                className="inputStyle"
              />
            </div>
            <div className="grid">
              <label>
                {" "}
                Education<span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option selected disabled>--Select Education--</option>
                {educationOptions}
              </select>
            </div>
            <div className="grid">
              <label>
                {" "}
                Ethnicity<span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option selected disabled>--Select Ethnicity--</option>
                {ethnicityOptions}
              </select>
            </div>
            <div className="grid">
              <label>
                {" "}
                Address<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Address"
                className="inputStyle"
              />
            </div>
            <div className="grid">
              <label>
                {" "}
                Contact Number<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Contact Number"
                className="inputStyle"
              />
            </div>
            <div className="grid">
              <label>
                {" "}
                Present Age of Child (DOL)
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Present Age of Child"
                className="inputStyle"
              />
            </div>
            <div className="grid">
              <label>
                {" "}
                Gestational Age ( WOG)<span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option selected disabled>
                  -- Select Gestiational --
                </option>
                {gestiationlData?.map((item, index) => {
                  return (
                    <option key={index} value={item.gestationalId}>
                      {item.gestationalName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="grid">
              <label>
                {" "}
                Mode Of Delivery<span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option selected disabled>--Select Mode of Delivery--</option>
                {deliveryOptions}
              </select>
            </div>
            <div className="grid">
              <label>
                {" "}
                Parity<span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option>--Select Parity--</option>
                {parityOptions}
              </select>
            </div>
          </div>
        </FormBorder>
      </form>
    </>
  );
}


