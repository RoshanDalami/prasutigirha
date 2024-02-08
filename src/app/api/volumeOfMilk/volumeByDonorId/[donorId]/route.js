import { MilkVolume } from "src/Model/volumeOfMilk.model";
import { connect } from "src/dbConfig/dbConfig";
import {NextResponse} from 'next/server';
connect()

export async function GET(req,{params}){
    try{
        const donorId = params.donorId;
        const response = await MilkVolume.findOne({donorId:donorId});
        return NextResponse.json(response.remaining,{status:200})
         
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}