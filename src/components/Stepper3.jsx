import RadioInput from "./radioInput";
import FormBorder from "./reusableForm";

export default function Stepper3() {
  return (
    <>
      <form>
        <FormBorder title={"Add Donor Verbal Examination"}>
          <div className="grid grid-cols-2 gap-10 text-lg my-4 mx-4">
            <RadioInput label={"Acute Infection"} />
            <RadioInput label={"Chronic Infection"} />
            <RadioInput
              label={"Leukemia/Lymphoma/Cancer treatment within 3 Years :"}
            />
            <RadioInput
              label={
                "Auto Emun Disease (RA,Lupus,GBS,Multiple Sclerosis,Type 1 DM):"
              }
            />
            <RadioInput label={"Cough more than 2 weeks :"} />
            <RadioInput
              label={"Chicken Fox from one month to any person from home :"}
            />
            <RadioInput
              label={
                "Sexually Transmitted Disease to your sexual partner from last 1 years :"
              }
            />
            <RadioInput
              label={
                "Any Medicine ( Cancer, Antisicotik, Radioactive, Thyroid) :"
              }
            />
            <RadioInput
              label={"Transplant or Blood Taken from last 1 years :"}
            />
            <div className="grid gap-2">
              <label htmlFor=""> Life Style ( Smoking/Drinking/Drugs):</label>
              <div className="flex gap-4">
                <div className="flex gap-1">
                  <input type="radio" />
                  <label>Smoking</label>
                </div>
                <div className="flex gap-1">
                  <input type="radio" />
                  <label>Drinking</label>
                </div>
                <div className="flex gap-1">
                  <input type="radio" />
                  <label>Drugs</label>
                </div>
              </div>
            </div>
          </div>
        </FormBorder>
      </form>
    </>
  );
}
