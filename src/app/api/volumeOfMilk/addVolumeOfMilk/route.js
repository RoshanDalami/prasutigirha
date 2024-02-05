import { NextResponse, NextRequest } from "next/server";
import { MilkVolume } from "src/Model/volumeOfMilk.model";
import { connect } from "src/dbConfig/dbConfig";
connect();
export async function POST(req, res) {
  const body = await req.json();

  try {
    const newMilkVolume = new MilkVolume(body);
    const savedMilkVolume = await newMilkVolume.save();
    return NextResponse.json(savedMilkVolume, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
