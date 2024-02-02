import { connect } from "src/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { DaanDarta } from "src/Model/donorDetails.model";
connect();

export async function POST(req, res) {
  const body = await req.json();
  try {
  } catch (error) {}
}
