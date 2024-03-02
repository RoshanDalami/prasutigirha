import { NextResponse } from "next/server";
import { MilkVolume } from "src/Model/volumeOfMilk.model";

export async function GET(req, { params }) {
  const { id } = params;
  let voluemofMilk = [];
  try {
    const response = await MilkVolume.find({ donorId: id });
    response.forEach((items) => {
       const array =  items.collectedMilk.map((item) => {
        return {...item._doc,date:items.date }
        });
        voluemofMilk.push(...array)
    });
    return NextResponse.json(voluemofMilk, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
