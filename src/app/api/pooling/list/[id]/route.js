import { Pasteurization } from "src/Model/pasteurization.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const id = params.id;

  try {
    if (!id) {
      return new NextResponse.json({ message: "Id not found" }, { status: 400 });
    }
    const response = await Pasteurization.findOne({ _id: id });
    return new NextResponse.json(
      response,
      { message: "Record found successfully" },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const id = params.id;
  try {
    if (!id) {
      return new NextResponse.json({ message: "Id not found" }, { status: 400 });
    }
    const response = await Pasteurization.deleteOne({ _id: id });
    return new NextResponse.json(
      response,
      { messsage: "Record deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
