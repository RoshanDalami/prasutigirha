import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";

export default function Office() {
  return (
    <>
      <form className="mx-10">
        <FormBorder title={"Office Setup"}>
          <div className="grid grid-cols-1 md:grid-cols-2 text-lg gap-4">
            <div className="grid">
              <label htmlFor="">
                Name <span className="text-red-600">*</span>
              </label>
              <input type="text" className="inputStyle" placeholder="ID" />
            </div>
            <div className="grid">
              <label htmlFor="">
                Code <span className="text-red-600">*</span>
              </label>
              <input type="number" className="inputStyle" placeholder="ID" />
            </div>
            <div className="grid">
              <label htmlFor="">
                Address <span className="text-red-600">*</span>
              </label>
              <input type="text" className="inputStyle" placeholder="ID" />
            </div>
            <div className="grid">
              <label htmlFor="">
                Phone <span className="text-red-600">*</span>
              </label>
              <input type="text" className="inputStyle" placeholder="ID" />
            </div>
            <div className="grid">
              <label htmlFor="">
                Email <span className="text-red-600">*</span>
              </label>
              <input type="text" className="inputStyle" placeholder="ID" />
            </div>
            <div className="grid">
              <label htmlFor="">
                State <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option></option>
              </select>
            </div>
            <div className="grid">
              <label htmlFor="">
                District <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option></option>
              </select>
            </div>
            <div className="grid">
              <label htmlFor="">
                Palika <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option></option>
              </select>
            </div>
          </div>
          <div className="my-5 font-bold text-lg">
            <Button>Submit</Button>
          </div>
        </FormBorder>
      </form>
    </>
  );
}
