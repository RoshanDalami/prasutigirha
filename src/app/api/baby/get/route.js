import { BabyDetail } from "src/Model/baby.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await BabyDetail.find({}, { __v: 0 });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
