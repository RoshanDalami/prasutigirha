import { DaanDarta } from "src/Model/donorDetails.model";
import {NextResponse} from 'next/server';

export async function GET(req,{params}){
    try {
        const id = params.id;
        const response = await DaanDarta.findOne({_id:id},{__v:0});
        return NextResponse.json(response,{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}