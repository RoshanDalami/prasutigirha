import { Bottle } from "src/Model/bottle.model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req) {
  try {
    const { poolingId, poolingCondition, expireDate, totalVolume } =
      await req.json();

    const totalMilk = totalVolume;
    const bottleSize = 150;

    let remainingMilk = totalMilk;
    let bottleNumber = "001";

    const bottles = [];
    let bottleTag = "";
    if (poolingCondition == 4) {
      bottleTag = "CA:CA";
    } else if (poolingCondition == 1) {
      bottleTag = "EPA:EPA";
    } else if (poolingCondition == 2) {
      bottleTag = "PA:PA";
    } else {
      bottleTag = "TA:TA";
    }

    while (remainingMilk >= bottleSize) {
      const bottleName =
        typeof bottleNumber == "string"
          ? `${bottleTag}${bottleNumber}`
          : `${bottleTag}${"00"}${bottleNumber}`;
      const bottle = {
        poolingId: poolingId,
        poolingCondition: poolingCondition,
        name: bottleName,
        volume: bottleSize,
        expireDate: expireDate,
      };
      bottles.push(bottle);

      remainingMilk -= bottleSize;
      bottleNumber = parseInt(bottleNumber, 10) + 1;
    }

    // If there is any remaining milk less than the bottle size, add it to the last bottle
    if (remainingMilk > 0) {
      //   const lastBottleName = `${bottleTag}${bottleNumber}`;
      const lastBottleName =
        typeof bottleNumber == "string"
          ? `${bottleTag}${bottleNumber}`
          : `${bottleTag}${"00"}${bottleNumber}`;
      const lastBottle = {
        poolingId: poolingId,
        poolingCondition: poolingCondition,
        name: lastBottleName,
        volume: remainingMilk,
        expireDate: expireDate,
      };
      bottles.push(lastBottle);
    }

    // Output the array of bottles
    const newBottle = new Bottle({
      poolingId,
      poolingCondition,
      expireDate,
      totalVolume,
      bottleList : bottles
    });
    const savedBottle = await newBottle.save()
    return NextResponse.json(savedBottle, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
