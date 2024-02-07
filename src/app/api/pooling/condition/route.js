import { NextResponse, NextRequest } from "next/server";
import { MilkVolume } from "src/Model/volumeOfMilk.model";

export async function GET() {
  try {
    const response = await MilkVolume.find({});

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
