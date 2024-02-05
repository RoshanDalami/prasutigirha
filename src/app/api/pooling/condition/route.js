import { DaanDarta } from "src/Model/donorDetails.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  const colostrum = req.nextUrl.searchParams.get("colostrum");
  console.log(typeof JSON.parse(colostrum));
  try {
    const response = await DaanDarta.find({
        isColostrum: JSON.parse(colostrum),
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
