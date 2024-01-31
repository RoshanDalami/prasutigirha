import { useRef } from "react";
import RadioInput from "./radioInput";
import FormBorder from "./reusableForm";

export default function Stepper4() {
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    // Trigger a click on the hidden file input
    fileInputRef.current.click();
  };
  return (
    <>
      <form>
        <FormBorder title={"Add Donor Physical Examination"}>
          <div className="grid grid-cols-2 gap-10 text-lg my-4 mx-4">
            <RadioInput label={"Mastitis :"} />
            <RadioInput label={"Local Lesions :"} />
            <RadioInput label={"Fugal in Nipple and Areola :"} />
            <RadioInput label={"Herpes Zoster :"} />
            <RadioInput label={"Others :"} />
          </div>

          <div
            className="flex justify-center items-center border border-gray-400 w-[250px] h-[150px]"
            onClick={handleButtonClick}
          >
            Upload your Signature
            <input ref={fileInputRef} type="file" style={{ display: "none" }} />
          </div>
          <div className="grid grid-cols-2 mt-5">
            <input
              className="inputStyle"
              placeholder="Breast Feeding Helper Employee Name"
            />
          </div>
        </FormBorder>
      </form>
    </>
  );
}
