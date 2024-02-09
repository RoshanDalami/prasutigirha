import { Pasteurization } from "src/Model/pasteurization.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await Pasteurization.find(
      {},
      { __v: 0, createdAt: 0, updatedAt: 0 }
    );
    if (!response) {
      return NextResponse.json(
        { message: "List generation failed" },
        { status: 405 }
      );
    }
    return NextResponse.json(
      response,
      { message: "List generated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
