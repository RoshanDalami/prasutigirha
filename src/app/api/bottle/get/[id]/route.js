import { Bottle } from "src/Model/bottle.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const id = params.id;
    const response = await Bottle.findOne({ poolingId: id });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
