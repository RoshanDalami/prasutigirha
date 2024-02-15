import { connect } from "src/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { DaanDarta } from "src/Model/donorDetails.model";
import { nanoid } from "nanoid";
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

    let newDaanDarta = new DaanDarta({
      
      ...body,
      donorRegNo: newDonorRegNo,
    });

    // ===============================================================================================
    // yadi serologyRecords positive aayo vane isSerologyPositive = true baschha
    if (newDaanDarta.serologyRecords.hiv === true) {
      newDaanDarta.isSerologyPositive = true;
      newDaanDarta.remarks = "HIV Positive";
    } else if (newDaanDarta.serologyRecords.hbsag === true) {
      newDaanDarta.isSerologyPositive = true;
    } else if (newDaanDarta.serologyRecords.vdrl === true) {
      newDaanDarta.isSerologyPositive = true;
    } else {
      // yadi serologyRecords negative  aayo vane isSerologyPositive = false baschha
      newDaanDarta.isSerologyPositive = false;
    }

    if (newDaanDarta.isSerologyPositive === true) {
      newDaanDarta.isDonorActive = false;
    } else {
      newDaanDarta.isDonorActive = true;
    }

    if (newDaanDarta.isSerologyPositive === true) {
      await newDaanDarta.save();
      return NextResponse.json(
        { message: "Serology Positive she can't donate milk" },
        { status: 200 }
      );
    }

    // ===============================================================================================

    if (
      newDaanDarta.verbalExamination.acuteInfection === true ||
      newDaanDarta.verbalExamination.chronicInfection === true ||
      newDaanDarta.verbalExamination.cancerTreatmentWithinThreeYears === true ||
      newDaanDarta.verbalExamination.autoImmuneDisease === true ||
      newDaanDarta.verbalExamination.coughMoreThanTwoWeeks === true ||
      newDaanDarta.verbalExamination.chickenpox === true ||
      newDaanDarta.verbalExamination.stdLastOneYear === true ||
      newDaanDarta.verbalExamination.medCancerAntisicotikRadioactiveThyroid ===
        true ||
      newDaanDarta.verbalExamination.transplantAndBloodTaken === true ||
      newDaanDarta.verbalExamination.BadLifeStyle === true
    ) {
      newDaanDarta.verbalStatus = true;
      newDaanDarta.remarks =
        "She can’t donation milk right now she has to take tests after ………………… Days ";
    } else {
      newDaanDarta.verbalStatus = false;
    }

    if (newDaanDarta.verbalStatus === true) {
      await newDaanDarta.save();
      return NextResponse.json(
        { message: "She can't milk right now" },
        { status: 200 }
      );
    }

    // ===============================================================================================

    if (
      newDaanDarta.donorPhysicalExamination.mastitis === true ||
      newDaanDarta.donorPhysicalExamination.localLesions === true ||
      newDaanDarta.donorPhysicalExamination.fugalInNippleAreola === true ||
      newDaanDarta.donorPhysicalExamination.herpesZoster === true
    ) {
      newDaanDarta.physicalStatus = true;
      newDaanDarta.remarks =
        " She can’t donation milk right now she has to take tests after ………………… Days";
    } else {
      newDaanDarta.physicalStatus = false;
    }

    if (newDaanDarta.physicalStatus === true) {
      await newDaanDarta.save();
      return NextResponse.json(
        { message: "she can't donate milk right now !" },
        { status: 200 }
      );
    }

    // ===============================================================================================	  if (newDaanDarta.serologyRecords.hiv === true) {
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
