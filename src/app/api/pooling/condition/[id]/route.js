import { NextResponse, NextRequest } from "next/server";
import { MilkVolume } from "src/Model/volumeOfMilk.model";
import { DaanDarta } from "src/Model/donorDetails.model";

export async function GET(req, { params }) {
  const id = params.id;
  try {

    const response = await MilkVolume.find(
      { gestationalAge: id , remaining: { $gt: 0 } }
    );

    const extractedData = response.map((item) => ({
      donorId: item.donorId,
      donorName: item.donorName,
      quantity: item.quantity,
      engDate: item.engDate,
      storedBy: item.storedBy,
      remaining: item.remaining,
      date: item.date,
    }));

    return NextResponse.json(extractedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error vyo" },
      { status: 500 }
    );
  }
}
