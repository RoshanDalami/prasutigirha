import { DaanDarta } from "src/Model/donorDetails.model";
import {NextResponse} from 'next/server';

export async function GET(req,{params}){
    const id = params.id;
    try {
        const response = await DaanDarta.findOne({_id:id},{__v:0});
        return NextResponse.json(response,{status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}

export async function DELETE(req,{params}){
    const id = params.id;
    try {
        const response = await DaanDarta.deleteOne({_id:id});
        console.log(response);
        return NextResponse.json(response,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}