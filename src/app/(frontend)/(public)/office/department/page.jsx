"use client";
import { useState } from "react";
import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";
import { IoClose } from "react-icons/io5";

export default function Department() {
  const [openModel, setOpenModel] = useState(false);
  const handleModel = (e) => {
    e.preventDefault();
    setOpenModel(!openModel);
  };
  const handleClose = (e) => {
    setOpenModel(false);
  };
  return (
    <>
      <div>
        <div className="">
          {openModel && (
            <div className="absolute z-50 inset-0 bg-black/40 w-[100%]   min-h-screen flex md:items-center py-20 justify-center">
              <div className="w-full md:px-0 md:w-2/4 px-5">
                <div className=" bg-white rounded-md shadow-md relative ">
                  <IoClose
                    className=" absolute hover:scale-125 right-2 text-2xl top-1 rounded-full "
                    onClick={handleClose}
                  />
                  <form className="flex items-center justify-center ">
                    <div className="grid w-full mx-5 my-4 gap-4">
                      <div className="grid gap-2">
                        <label className="text-lg font-bold"> Post Name</label>
                        <input
                          type="text"
                          placeholder="Enter Post Names"
                          className="inputStyle"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button>Add</Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
        <form className="mx-10 relative">
          <FormBorder title={"Department"}>
            <div className="flex justify-end  ">
              <div className=" absolute -top-4 right-8 ">
                <button
                  className="bg-[#004a89] hover:bg-red-600 py-2 px-2 rounded-md text-white font-bold"
                  onClick={handleModel}
                >
                  Add Post
                </button>
              </div>
            </div>
            <div className="md:grid-cols-2 grid grid-cols-1 gap-4 text-lg">
              <div className="grid">
                <label htmlFor="">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Department Name"
                  className="inputStyle"
                />
              </div>
            </div>
            <div className="text-lg font-bold my-5">
              <Button>Submit</Button>
            </div>
          </FormBorder>
        </form>
      </div>
    </>
  );
}
