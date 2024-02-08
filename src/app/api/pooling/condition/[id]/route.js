import { NextResponse, NextRequest } from "next/server";
import { MilkVolume } from "src/Model/volumeOfMilk.model";
import { DaanDarta } from "src/Model/donorDetails.model";

export async function GET(req, { params }) {
  const id = params.id;
  try {
    const response = await MilkVolume.find({});

    const filteredData = response.filter((item) => item.gestationalAge == id);

    const extractedData = filteredData.map((item) => ({
      donarId: item.donorId,
      donorName: item.donorName,
      quantity: item.quantity,
      engDate: item.engDate,
      storedBy: item.storedBy,
    }));

    return NextResponse.json(extractedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error vyo" },
      { status: 500 }
    );
  }
}
