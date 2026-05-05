import FormBorder from "./reusableForm";

export default function Stepper2() {
  return (
    <>
      <form>
        <FormBorder title={" Status of Baby"}>
          <p className="font-bold text-xl py-5 ">Add Status of Baby:</p>
          <div className="grid md:grid-cols-2 gap-4 text-lg">
            <div className="grid">
              <label>
                {" "}
                Date of Birth<span className="text-red-600">*</span>
              </label>
              <input type="date" placeholder="" className="inputStyle" />
            </div>
            <div className="grid">
              <label>
                {" "}
                Baby Breast Feeding Status
                <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option>Select Your Baby Status</option>
                <option>Normal</option>
                <option>Birth Asphylexia</option>
                <option>Preterm </option>
                <option>Sepsis</option>
                <option>Jaundice</option>
                <option>Other</option>
              </select>
            </div>
            <div className="grid">
              <label>
                {" "}
                Baby Transfer Status
                <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option>Select Your Baby Status</option>
                <option>NICU</option>
              </select>
            </div>
            <div className="grid">
              <label>
                {" "}
                Baby Breast Feeding Status
                <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option>Select Your Baby Status</option>
                <option>Exclusive Breast Feeding</option>
                <option>Partial Breast Feeding</option>
                <option>Formula Milk Only </option>
                <option>NPO</option>
                <option>PDHM</option>
              </select>
            </div>
          </div>
          <p className="font-bold text-xl py-5 ">Serology Screening Records:</p>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div className="grid">
              <label>
                {" "}
                HIV Test
                <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                {" "}
                <option></option>
              </select>
            </div>
            <div className="grid">
              <label>
                {" "}
                HBSAG Test
                <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                {" "}
                <option></option>
              </select>
            </div>
            <div className="grid">
              <label>
                {" "}
                VDRL Test
                <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                {" "}
                <option></option>
              </select>
            </div>
            <div className="grid">
              <label>
                {" "}
                Date of Test
                <span className="text-red-600">*</span>
              </label>
              <input type="date" className="inputStyle" />
            </div>
          </div>
        </FormBorder>
      </form>
    </>
  );
}
