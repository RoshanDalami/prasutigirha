import { NextResponse } from "next/server";
import { MilkVolume } from "src/Model/volumeOfMilk.model";
import { DaanDarta } from "src/Model/donorDetails.model";
import { Delivery } from "src/Model/dropdownModels/delivery.model";
export async function GET(req, { params }) {
  const { id } = params;
  let voluemofMilk = [];
  let donorDetails = {};
  try {
    const response = await MilkVolume.find({ donorId: id },{createdAt:0,updatedAt:0});
    const individual = await DaanDarta.findOne({_id:id});

    const modeOfDelivery = await Delivery.find({});
    const modeName = modeOfDelivery.filter((item)=> item.deliveryId === individual?.modeOfDelivery )?.[0]?.deliveryName
    if(response.length <= 0){
      donorDetails={
        donorRegNo:individual?.donorRegNo,
        donorName:individual?.donorName,
        donorAge:individual?.donorAge,
        address:individual?.address,
        contactNo:individual?.contactNo,
        modeOfDelivery:modeName,
        donotedMilkList:[]
      }
    }
    response.forEach((items) => {
       const array =  items.collectedMilk.map((item) => {
        return {...item._doc,date:items.date }
        });
        voluemofMilk.push(...array);
        donorDetails={
          donorRegNo:individual?.donorRegNo,
          donorName:individual?.donorName,
          donorAge:individual?.donorAge,
          address:individual?.address,
          contactNo:individual?.contactNo,
          modeOfDelivery:modeName,
          donotedMilkList:voluemofMilk
        }
    });
    return NextResponse.json(donorDetails, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
