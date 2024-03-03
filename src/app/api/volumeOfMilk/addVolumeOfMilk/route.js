import { NextResponse, NextRequest } from "next/server";
import { MilkVolume } from "src/Model/volumeOfMilk.model";
import { connect } from "src/dbConfig/dbConfig";
connect();
export async function POST(req, res) {
  const body = await req.json();
  
  const quantityArray = body.collectedMilk.map((item,index)=>{
    return(
      parseInt(item.quantity)
    )
  })
  const remaining = quantityArray.reduce((acc,value)=>acc+value,0)
  
  try {
    const isNewDocument = !body._id;
    const newMilkVolume = isNewDocument
      ? new MilkVolume({ ...body,remaining:remaining,totalMilkCollected:remaining })
      : await MilkVolume.findByIdAndUpdate(
          body._id,
          { ...body,remaining:remaining,totalMilkCollected:remaining},
          { new: true }
        );
    const savedMilkVolume = await newMilkVolume.save();
    return NextResponse.json(savedMilkVolume, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// export async function PATCH(req){
//     const body = await req.json()
//     try {

//         const response = await MilkVolume.updateOne({_id:body?._id},body)
//         if(response.modifiedCount !== 1){
//             return NextResponse.json({message:"Update Failed"},{status:500})
//         }
//         return NextResponse.json(response,{status:200})

//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({message:"Internal Server Error"},{status:500})
//     }
// }
