import { connect } from "@/dbConfig/dbConfig";
import { NextResponse,NextRequest } from 'next/server'
import { Delivery } from "@/Model/dropdownModels/delivery.model";
connect();

export async function GET(){
    try {
        const deliveryList = await Delivery.find({});
        return NextResponse.json(deliveryList,{status:200})
    } catch (error) {
       return NextResponse.json({message:"Internal Server Error"},{status:500}) 
    }
}