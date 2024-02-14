import { Pasteurization } from "src/Model/pasteurization.model";
import { MilkVolume } from "src/Model/volumeOfMilk.model";
import { NextResponse } from "next/server";
import { connect } from "src/dbConfig/dbConfig";
connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const donorList = body?.donorDetailsForPooling;
    let batchName = "";
    if (body.poolingCondition == 4) {
      batchName = "CA";
    } else if (body.poolingCondition == 1) {
      batchName = "EPA";
    } else if (body.poolingCondition == 2) {
      batchName = "PA";
    } else {
      batchName = "TA";
    }
    donorList.sort(
      (a, b) => new Date(a.collectedDate) - new Date(b.collectedDate)
    );
    const currentDate = new Date(donorList[0].collectedDate);
    let expireDate = new Date(currentDate);
    expireDate.setMonth(currentDate?.getMonth() + 6);
    expireDate = JSON.stringify(expireDate).split("T")[0].slice(1);

    const newPooling = new Pasteurization({
      ...body,
      batchName: batchName,
      expireDate: expireDate,
    });

    // if(savedData){
    // donorList.forEach(async (item) => {
    //   const donor = await MilkVolume.findOne({ donorId: item.donorId });
    //   if(donor?.remaining < item.volumeOfMilkPooled){
    //     throw new Error
    //   }
    //   const newRemaining = donor?.remaining - item.volumeOfMilkPooled;
    //   await MilkVolume.findOne({ donorId: item.donorId }).then((doc) => {
    //     // if (newRemaining < 0) {
    //     //   return NextResponse.json(
    //     //     { message: "Invalid Milk volume" },
    //     //     { status: 400 }
    //     //   );
    //     // }
    //     doc.remaining = newRemaining;
    //     doc.save();
    //   });
    // });
    // }
    for (const item of donorList) {
      const donor = await MilkVolume.findOne({ donorId: item.donorId });

      if (donor?.remaining < item.volumeOfMilkPooled) {
        throw new Error("Invalid Milk volume");
      }
      const newRemaining = donor?.remaining - item.volumeOfMilkPooled;
      await MilkVolume.findOneAndUpdate(
        { donorId: item.donorId },
        { $set: { remaining: newRemaining } }
      );
    }
    if(body._id){
      const response = await Pasteurization.findByIdAndUpdate(body._id,{...body,
        batchName: batchName,
        expireDate: expireDate},{new:true});
        return NextResponse.json(response,{status:200})
    }
    const savedData = await newPooling.save();
    
    

    return NextResponse.json(savedData, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function POST(req) {
//   const body = await req.json();
//   const donorDetailsForPooling = body?.donorDetailsForPooling
//   try {
//     const newPasteurization = new Pasteurization(body);
//     const savedData = await newPasteurization.save();
//     if(savedData){
//         for(let i = 0; i<= donorDetailsForPooling.length;i++){
//             console.log(donorDetailsForPooling[i].donorId)
//         }
//     }
//     return NextResponse.json(savedData, { status: 200 });
//   } catch (error) {
//     console.log(error,'Error From here');
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// for (let i = 0; i <= body?.donorDetailsForPooling.length; i++) {
//     //   const response = await MilkVolume.findOne({
//     //     donorId: body?.donorDetailsForPooling[i].donorId,
//     //   });
//     //   console.log(response.quantity,response.donorName);
//   //   let donorId = body?.donorDetailsForPooling[i].donorId;
//       const donor = await MilkVolume.aggregate([
//         {
//           $match: {
//             donorId: new mongoose.Types.ObjectId(body?.donorDetailsForPooling[i].donorId),
//           },
//         },
//       ]);
//   //   const donor = await MilkVolume.findOne({ donorId: donorId });
//     if (donor) {
//       const remaining =
//         donor[0].remaining -
//         parseInt(body?.donorDetailsForPooling[i].volumeOfMilkPooled);

//       console.log(`Donor ID: ${body?.donorDetailsForPooling[i].donorId}, Updated Remaining: ${remaining}`);

//       // Update the remaining property in the MilkVolume collection
//       await MilkVolume.findOne({ donorId: body?.donorDetailsForPooling[i].donorId }).then((doc) => {
//         doc.remaining = remaining;
//         doc.save();
//       });
//     } else {
//       console.log(`Donor with ID ${body?.donorDetailsForPooling[i].donorId} not found.`);
//     }

//     //   console.log(donor)
//     //  const remaining =  parseInt(donor[0].remaining,10)-parseInt(body?.donorDetailsForPooling[i].volumeOfMilkPooled)
//     //   console.log(remaining)
//   }
