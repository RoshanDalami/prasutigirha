import { MilkRequsition } from "src/Model/requistion.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const id = params.id;
  try {
    if (!id) {
      return NextResponse.json({ message: "Id is undefined" }, { status: 400 });
    }
    const response = await MilkRequsition.findOne({ _id: id });
    return NextResponse.json(
      response,
      { message: "List Created Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const id = params.id;
  try {
    if (!id) {
      return NextResponse.json({ message: "Id is undefined" }, { status: 400 });
    }
    const response = await MilkRequsition.deleteOne({ _id: id });
    return NextResponse.json(
      response,
      { message: "List Created Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
