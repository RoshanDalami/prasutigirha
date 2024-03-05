import { BabyDetail } from "src/Model/baby.model";
import { NextResponse } from "next/server";
import { MilkRequsition } from "src/Model/requistion.model";
import { revalidatePath } from 'next/cache'

export async function GET(res) {
  const path = req.nextUrl.searchParams.get('path')
  try {
    if(path){
      revalidatePath(path)
      const response = await BabyDetail.find({}, { __v: 0 });
      const milkDetail = []
      const array = await Promise.all(response.map(async (items) => {
        const babyDetails = await MilkRequsition.find({ babyId:items._id });
        
       const finalArray =  babyDetails.map((item)=>{
        return{...items._doc,milkDetail:item?.requisitedMilk}
        })
        milkDetail.push(...finalArray)
        // return { ...item._doc, milkDetail: babyDetails?.requisitedMilk , milkConsumed: babyDetails?.requisitedMilk.map((item)=>{return item.quantity}).reduce((acc,amount)=>acc+amount,0) || 0  };
    }));
    return NextResponse.json(response, { status: 200 });
    }
    return NextResponse.json({data:false}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
