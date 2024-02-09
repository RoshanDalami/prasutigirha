import { NextResponse, NextRequest } from "next/server";
import { BiVolume } from "react-icons/bi";
import { DaanDarta } from "src/Model/donorDetails.model";
import { MilkVolume } from "src/Model/volumeOfMilk.model";
export async function GET() {
  try {


    const filteredDonarData = [];

    for (const donar of DonarData) {

      if (donar.babyStatus && donar.babyStatus.engDateBirth) {
        const currentDate = new Date();
        const dob = new Date(donar.babyStatus.engDateBirth);
        const diffTime = Math.abs(currentDate - dob);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        donar.updatedAgeOFChild = diffDays;

        await donar.save();

        if (donar.updatedAgeOFChild <= 3) {
          const donarId = donar._id;
          const milkVolume = await MilkVolume.find({ donorId: donarId });
          filteredDonarData.push({
            milkVolume,
          });
        }

      }
    }

    return NextResponse.json(filteredDonarData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
