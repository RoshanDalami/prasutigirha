import { NextResponse } from "next/server";
import { DaanDarta } from "src/Model/donorDetails.model";
import { MilkVolume } from "src/Model/volumeOfMilk.model";
export async function GET() {
  try {
    let filteredDonarData = [];
    const DonarData = await DaanDarta.find({});
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

          const volume = await MilkVolume.findOne({ donorId: donarId });
          if (volume !== null) {
            filteredDonarData.push(volume);
          }
        }
      }
    }

    return NextResponse.json(filteredDonarData, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
