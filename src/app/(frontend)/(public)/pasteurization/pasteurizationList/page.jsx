"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
export default function ListVolume() {
  const FormBorder = dynamic(() => import("@/components/reusableForm"), {
    ssr: false,
  });
  return (
    <>
      <div>
        <form className="my-5 mx-10 ">
          <p htmlFor="" className="text-red-600 text-2xl font-bold my-5 ">
            Volume of Milk
          </p>
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              className="border px-4 border-gray-300 rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
              placeholder="Search by ID..."
            />
            <input
              type="text"
              placeholder="Search by Donor Name..."
              className="border px-4 border-gray-300 rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
            />
            <input
              type="date"
              placeholder="Search by ID..."
              className="border px-4 border-gray-300 rounded-lg  focus:outline-none focus:ring focus:border-blue-300 hover:ring-2 hover:ring-blue-300 transition duration-300 ease-in-out"
            />
            <div>
              <button className="text-white bg-red-600 hover:bg-[#004a89] px-7 py-3 rounded-lg ">
                SEARCH
              </button>
            </div>
          </div>
        </form>
        <div className="mx-10">
          <FormBorder title={"List of Volume of Milk"}>
            <div className="flex flex-col   ">
              <div className=" flex justify-end">
                <Link href={"/pasteurization/addPasteurization"}>
                  <button className="text-white bg-red-600 hover:bg-[#004a89] px-4 py-3 rounded-lg font-bold ">
                    + Add
                  </button>
                </Link>
              </div>
            </div>
            <div className=" my-5">
              <table className="w-full">
                <tr className="bg-[#004a89] text-white text-lg text-center">
                  <td className="py-3 px-2">
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td className="py-3 px-2">Id</td>
                  <td className="py-3 px-2">Number of Donor </td>
                  <td className="py-3 px-2">Pooling Date</td>
                  <td className="py-3 px-2">Pooling Condition</td>
                  <td className="py-3 px-2">Batch Name</td>
                  <td className="py-3 px-2">Bottle Name</td>
                  <td className="py-3 px-2">Expiry Date</td>
                  <td className="py-3 px-2">Action</td>
                </tr>
              </table>
            </div>
          </FormBorder>
        </div>
      </div>
    </>
  );
}
