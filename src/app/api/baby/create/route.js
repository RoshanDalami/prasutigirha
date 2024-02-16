import { BabyDetail } from "src/Model/baby.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    
    if (!body) {
      return NextResponse.json({ message: "Bad Request" }, { status: 404 });
    }

    const newBaby = new BabyDetail({
      ...body,
      milkConsumed:0,
      milkConsumedToday:0
    });
    const savedBaby = await newBaby.save();
    return NextResponse.json(savedBaby, { status: 200 });
  } catch (error) {

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
