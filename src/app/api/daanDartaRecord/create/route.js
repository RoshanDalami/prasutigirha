import { connect } from "src/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { DaanDarta } from "src/Model/donorDetails.model";
connect();

export async function POST(req, res) {
  const body = await req.json();
  try {
    const latestDaanDarta = await DaanDarta.findOne(
      {},
      {},
      { sort: { donorRegNo: -1 } }
    );

    let newDonorRegNo = "001";
    if (latestDaanDarta) {
      const lastDonorRegNo = latestDaanDarta.donorRegNo;
      const numericPart = parseInt(lastDonorRegNo, 10);
      newDonorRegNo = (numericPart + 1).toString().padStart(3, "0");
    }

    const newDaanDarta = new DaanDarta({
      ...body,
      donorRegNo: newDonorRegNo,
    });

    if (newDaanDarta.serologyRecords.hiv === true) {
      newDaanDarta.isSerologyPositive = true;
    } else if (newDaanDarta.serologyRecords.hbsag === true) {
      newDaanDarta.isSerologyPositive = true;
    }
    if (newDaanDarta.serologyRecords.vdrl === true) {
      newDaanDarta.isSerologyPositive = true;
    }

    if (
      newDaanDarta.verbalExamination === true &&
      newDaanDarta.donorPhysicalExamination === true
    ) {
      newDaanDarta.isDonorActive = true;
    } else {
      newDaanDarta.isDonorActive = false;
    }

    console.log(newDaanDarta.isSerologyPositive);

    if (newDaanDarta.isSerologyPositive === true) {
      return NextResponse.json(
        { message: "Serology Positive she can't donate milk" },
        { status: 200 }
      );
    }
    const savedDaanDarta = await newDaanDarta.save();

    return NextResponse.json(
      savedDaanDarta,
      { message: "daanDarta created successfully" },
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
