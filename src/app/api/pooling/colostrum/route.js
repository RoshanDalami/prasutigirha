import { NextResponse, NextRequest } from "next/server";
import { DaanDarta } from "src/Model/donorDetails.model";
import { MilkVolume } from "src/Model/volumeOfMilk.model";
export async function GET() {
  try {
    const DonarData = await DaanDarta.find();
    const filteredDonarData = DonarData.filter((donar) => {
      if (donar.babyStatus && donar.babyStatus.dateOfBirth) {
        const currentDate = new Date();
        const dob = new Date(donar.babyStatus.dateOfBirth);
        const diffTime = Math.abs(currentDate - dob);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        donar.updatedAgeOFChild = diffDays;
        console.log(donar.updatedAgeOFChild, "<======");
        return diffDays <= 3;
      }
      return false;
    });

    return NextResponse.json(filteredDonarData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
