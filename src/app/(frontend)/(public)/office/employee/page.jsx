import Button from "src/components/button";
import FormBorder from "src/components/reusableForm";

export default function Employee() {
  return (
    <>
      <form className="mx-10">
        <FormBorder title={"Employee"}>
          <div className="md:grid-cols-2 grid grid-cols-1 gap-4 text-lg">
            <div className="grid">
              <label htmlFor="">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Employee Name"
                className="inputStyle"
              />
            </div>
            <div className="grid">
              <label htmlFor="">
                Department <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option>--Select Department--</option>
              </select>
            </div>
            <div className="grid">
              <label htmlFor="">
                Post <span className="text-red-600">*</span>
              </label>
              <select className="inputStyle">
                <option>test</option>
              </select>
            </div>
            <div className="grid">
              <label htmlFor="">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Employee Email"
                className="inputStyle"
              />
            </div>
            <div className="grid">
              <label htmlFor="">
                Phone <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Employee Phone"
                className="inputStyle"
              />
            </div>
          </div>
          <div className="text-lg font-bold my-5">
            <Button>Submit</Button>
          </div>
        </FormBorder>
      </form>
    </>
  );
}
