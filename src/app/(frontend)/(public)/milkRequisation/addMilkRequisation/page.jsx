import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";

export default function AddMilkReq() {
  return (
    <>
      <div className="mx-10">
        <div className="flex justify-end mt-10">
          <Button>External</Button>
        </div>
        <form>
          <FormBorder title={"Milk Requisition Form"}>
            <p className="text-xl font-bold py-6">1. Baby Entry Form:</p>
            <div className="grid md:grid-cols-2 grid-cols-1 text-lg gap-4">
              <div className="grid">
                <label htmlFor="">
                  Name of the Baby <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  placeholder="Enter the Name of the Baby"
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  Date of Birth<span className="text-red-600">*</span>
                </label>
                <input type="date" className="inputStyle" />
              </div>
              <div className="grid">
                <label htmlFor="">
                  GestationalAge <span className="text-red-600">*</span>
                </label>
                <select className="inputStyle">
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                </select>
              </div>
              <div className="grid">
                <label htmlFor="">
                  IP Number<span className="text-red-600">*</span>
                </label>
                <input
                  type="Number"
                  className="inputStyle"
                  placeholder="Enter IP Number"
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  Birth Weight<span className="text-red-600">*</span>
                </label>
                <input
                  type="Number"
                  className="inputStyle"
                  placeholder="Enter Birth Weight"
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  Diagnosis of recipient <span className="text-red-600">*</span>
                </label>
                <select className="inputStyle">
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                </select>
              </div>
              <div className="grid">
                <label htmlFor="">
                  Indications <span className="text-red-600">*</span>
                </label>
                <select className="inputStyle">
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                </select>
              </div>
            </div>
            <p className="text-xl font-bold py-6">2. Baby Status:</p>
            <div className="grid md:grid-cols-2 grid-cols-1 text-lg">
              <div className="grid">
                <label htmlFor="">
                  Baby Status <span className="text-red-600">*</span>
                </label>
                <select className="inputStyle">
                  <option>NICU</option>
                  <option>SNCU</option>
                  <option>KMC</option>
                </select>
              </div>
            </div>
            <p className="text-xl font-bold py-6">3. Feeding Details:</p>
            <div className="grid md:grid-cols-2 grid-cols-1 text-lg gap-4">
              <div className="grid">
                <label htmlFor="">
                  Batch Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="Number"
                  className="inputStyle"
                  placeholder="Enter Batch Number"
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  Unique Bottle Number<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  placeholder="Enter Unique Bottle Number"
                />
              </div>

              <div className="grid">
                <label htmlFor="">
                  Bottle Name<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  placeholder="Enter Bottle Name"
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  Feeding Date<span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  className="inputStyle"
                  placeholder="Enter Birth Weight"
                />
              </div>
              <div className="grid">
                <label htmlFor="">
                  ML<span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  className="inputStyle"
                  placeholder="Enter ML"
                />
              </div>
            </div>
            <div className="my-5 font-bold text-xl">
              <Button>Submit</Button>
            </div>
          </FormBorder>
        </form>
      </div>
    </>
  );
}
