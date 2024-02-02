import React from "react";

import FormBorder from "@/components/reusableForm";
export default function AddVolume() {
  return (
    <>
      <form className="md:mx-10  ">
        <FormBorder title={"Add Volume of Milk"}>
          <div className=" gap-5 px-5 rounded-md ">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-2">
              <div className="grid">
                <label className="text-lg">
                  Gestational Age (WOG)
                  <span className="text-lg text-red-600">*</span>
                </label>
                <select className="inputStyle">
                  <option>test1</option>
                  <option>test2</option>
                  <option>test2</option>
                  <option>test2</option>
                </select>
              </div>
              <div className="grid">
                <label className="text-lg">
                  Select Donor
                  <span className="text-lg text-red-600">*</span>
                </label>
                <select className="inputStyle">
                  <option>test1</option>
                  <option>test2</option>
                  <option>test2</option>
                  <option>test2</option>
                </select>
              </div>

              <div className="grid">
                <label className="text-lg">
                  Date
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input className="inputStyle" type="date" placeholder="." />
              </div>
              <div className="grid">
                <label className="text-lg">
                  Time
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input className="inputStyle" type="time" placeholder="." />
              </div>
              <div className="grid">
                <label className="text-lg">
                  ML
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input className="inputStyle" type="text" placeholder="." />
              </div>
              <div className="grid">
                <label className="text-lg">
                  Store By
                  <span className="text-lg text-red-600">*</span>
                </label>
                <input className="inputStyle" type="text" placeholder="." />
              </div>
            </div>
            <button className="bg-red-600 text-white my-4 text-lg rounded-md py-2 px-5 hover:bg-[#052c65]">
              Submit
            </button>
          </div>
        </FormBorder>
      </form>
    </>
  );
}
