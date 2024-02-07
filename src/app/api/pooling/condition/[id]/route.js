import { NextResponse, NextRequest } from "next/server";
import { MilkVolume } from "src/Model/volumeOfMilk.model";
import { DaanDarta } from "src/Model/donorDetails.model";

export async function GET(req, { params }) {
  const id = params.id;
  try {
    const response = await MilkVolume.find({});

    const filteredData = response.filter((item) => item.gestationalAge == id);

    console.log("filteredData", filteredData);
    const extractedData = filteredData.map((item) => ({
      donarId: item.donorId,
      donorName: item.donorName,
      quantity: item.quantity,
    }));

    return NextResponse.json(extractedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Erro vyo" },
      { status: 500 }
    );
  }
}
