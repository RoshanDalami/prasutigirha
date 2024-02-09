import { NextResponse, NextRequest } from "next/server";
import { DaanDarta } from "src/Model/donorDetails.model";
import { MilkVolume } from "src/Model/volumeOfMilk.model";
export async function GET() {
  try {
    const DonarData = await DaanDarta.find();

    const filteredDonarData = DonarData.filter(async (donar) => {
      if (donar.babyStatus && donar.babyStatus.engDateBirth) {
        const currentDate = new Date();
        const dob = new Date(donar.babyStatus.engDateBirth);
        const diffTime = Math.abs(currentDate - dob);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        donar.updatedAgeOFChild = diffDays;
        donar.save();

        if (diffDays <= 3) {
          const donarId = donar._id;
          const milkVolume = await MilkVolume.find();
          const filteredMilkVolume = milkVolume.filter((milk) => {
            if (milk.donorId == donarId) {
              return milk.donorId == donarId;
            }
          });
          console.log("filteredMilkVolume", filteredMilkVolume);
          return filteredMilkVolume;
        }
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
