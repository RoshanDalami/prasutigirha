import FormBorder from "@/components/reusableForm";
export default function Storagedetail() {
  return (
    <>
      <form className="mx-10">
        <FormBorder title={"Storage Detail"}>
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2">
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
            
          </div>
          <button className="bg-red-600 text-white my-4 text-lg rounded-md py-2 px-6 hover:bg-[#052c65]">
            Submit
          </button>
        </FormBorder>
      </form>
    </>
  );
}
