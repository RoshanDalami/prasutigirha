import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { DaanDarta } from "./../../../../Model/donorDetails.model.js";
// import { Gestational } from "../../../Model/dropdownModels/gestational.model.js";
// import { NextResponseolve } from "url";

connect();

export async function POST(req, res) {
  try {
    const latestDaanDarta = await DaanDarta.findOne(
      {},
      {},
      { sort: { donorRegNo: -1 } }
    );

    console.log("latestDaanDarta", latestDaanDarta);

    let newDonorRegNo = "001";

    if (latestDaanDarta) {
      const lastDonorRegNo = latestDaanDarta.donorRegNo;
      const numericPart = parseInt(lastDonorRegNo, 10);
      newDonorRegNo = (numericPart + 1).toString().padStart(3, "0");
    }

    console.log("newDonorRegNo", newDonorRegNo);

    const {
      donor_FullName,
      hosRegNo,
      date,
      time,
      education,
      ethnicity,
      address,
      contactNo,
      ageOfChild,
      gestationalAge,
      modeOfDelivery,
      parity,
      babyStatus,
      // serologyRecords,
      // verbalExamination,
    } = await req.json();

    const newDaanDarta = new DaanDarta({
      donorRegNo: newDonorRegNo,
      hosRegNo,
      date,
      time,
      donor_FullName,
      education,
      ethnicity,
      address,
      contactNo,
      ageOfChild,
      gestationalAge,
      modeOfDelivery,
      parity,
      babyStatus,
      // serologyRecords,
    });
    await newDaanDarta.save().then((savedDaanDarta) => {
      const serologyPositive =
        savedDaanDarta.serologyRecords.hiv === "Positive" ||
        savedDaanDarta.serologyRecords.hbsag === "Positive" ||
        savedDaanDarta.serologyRecords.vdrl === "Positive";

      const serologyUnknown =
        savedDaanDarta.serologyRecords.hiv === "Unknown" ||
        savedDaanDarta.serologyRecords.hbsag === "Unknown" ||
        savedDaanDarta.serologyRecords.vdrl === "Unknown";

      if (serologyPositive) {
        return NextResponse.status(200).json({
          message: "You can't proceed because the serology test is positive.",
        });
      } else if (serologyUnknown) {
        return NextResponse.status(200).json({
          message: "Please perform Serology Test again and proceed again",
        });
      } else {
        req.session.donorId = savedDaanDarta._id;
        console.log("The user id is", req.session.donorId);

        NextResponse.status(200).json({
          message:
            "User Information saved Successfully Please Proceed to Verbal Examination Section",
        });
      }
    });

    return NextResponse.json(
      { message: "DaanDarta created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
