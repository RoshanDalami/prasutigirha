import FormBorder from "@/components/reusableForm";
export default function AddPasteurization() {
  return (
    <>
      <div className="mx-10">
        <form>
          <FormBorder title={"Pasteurization Process (Pooling Process)"}>
            <div className="grid grid-cols-2 my-5 gap-8">
              <div className="grid">
                <label htmlFor="">
                  Pooling Condition<span className="text-red-600">*</span>
                </label>
                <select className="inputStyle">
                  <option>test</option>
                  <option>test</option>
                  <option>test</option>
                  <option>test</option>
                </select>
              </div>
              <div className="grid">
                <label htmlFor="">
                  Donor Name<span className="text-red-600">*</span>
                </label>
                <select className="inputStyle">
                  <option>test</option>
                  <option>test</option>
                  <option>test</option>
                  <option>test</option>
                </select>
              </div>
              <div className="grid">
                <label htmlFor="">
                  Pooling Date<span className="text-red-600">*</span>
                </label>
                <input type="date" className="inputStyle" />
              </div>
            </div>
            <div>
              <button className="text-white bg-red-600 hover:bg-[#004a89] px-8 py-2 rounded-lg ">
                Submit
              </button>
            </div>
          </FormBorder>
        </form>
      </div>
    </>
  );
}
