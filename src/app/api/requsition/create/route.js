import { MilkRequsition } from "src/Model/requistion.model";
import { NextResponse } from "next/server";
import { connect } from "src/dbConfig/dbConfig";
import { BabyDetail } from "src/Model/baby.model";
import { Bottle } from "src/Model/bottle.model";
connect();

export async function POST(req) {
  const body = await req.json();
  // console.log(body,'response')

  try {
    const { _id } = body;
    if (_id) {
      const response = await MilkRequsition.findByIdAndUpdate(
        _id,
        { ...body },
        { new: true }
      );
      return NextResponse.json(response, { status: 200 });
    }
    body?.requisitedMilk?.forEach(async(items)=>{
      const poolingId = items.batchNumber.split('/')?.[0]
      const response = await Bottle.findOne({poolingId:poolingId}).then((doc)=>{
        const item = doc.bottleList.id(items.bottleName.split('/')?.[0])
        item.remainingVoluem = item.volume - items.quantity;
        doc.save()
      })
      
    })
    const babyDetail = await BabyDetail.findOne({_id:body?.babyId})
    const consumnedMilk = body?.requisitedMilk?.map((item)=>{return parseInt(item?.quantity)}).reduce((acc,amount)=>acc + amount ,0) + babyDetail?.milkConsumed
    const newMilkRequsition = new MilkRequsition(body);
    const response = await newMilkRequsition.save();
     await BabyDetail.findOneAndUpdate({_id:body?.babyId},{
      $set:{milkConsumed:consumnedMilk}
    });
    
    
    return NextResponse.json(body, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await MilkRequsition.find(
      {},
      { __v: 0, createdAt: 0, updatedAt: 0 }
    );
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
