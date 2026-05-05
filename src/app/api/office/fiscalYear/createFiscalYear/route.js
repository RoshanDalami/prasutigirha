import { Fiscalyear } from "src/Model/officeSetupModels/fiscalYear.model.js";
import { connect } from "src/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(req, res) {
  const { fiscalYearId, fiscalYearName } = await req.json();

  try {
    const newFiscalyear = new Fiscalyear({
      fiscalYearId,
      fiscalYearName,
    });
    await newFiscalyear.save();
    return NextResponse.json(
      { message: "Fiscal Year Created SuccessFully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
