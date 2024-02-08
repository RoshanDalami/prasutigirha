import { NextResponse, NextRequest } from "next/server";
import { DaanDarta } from "src/Model/donorDetails.model";
export async function GET() {
  try {
    const filteredDonarData = await DaanDarta.find();
    // const ObjectedFilteredDonarData = filteredDonarData.reduce(
    //   (accumulator, current, index) => {
    //     accumulator[`object${index + 1}`] = current;
    //     return accumulator;
    //   },
    //   {}
    // );

    const dateOfBirthList = filteredDonarData.reduce((accumulator, current) => {
      if (current.babyStatus && current.babyStatus.dateOfBirth) {
        const currentDate = new Date();
        const dob = new Date(current.babyStatus.dateOfBirth);
        const diffTime = Math.abs(currentDate - dob);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        accumulator.push(diffDays);
      }
      return accumulator;
    }, []);

    console.log("dateOfBirthList :", dateOfBirthList);

    return NextResponse.json(dateOfBirthList, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
