import { MilkVolume } from "src/Model/volumeOfMilk.model";
import {NextResponse} from 'next/server';

export async function GET(req,{params}){
    const id = params.id
    try {
        const response = await MilkVolume.findOne({_id:id},{__v:0});
        return NextResponse.json(response,{status:200})

    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}


export async function DELETE(req,{params}){
    const id = params.id
    try {
        const response = await MilkVolume.deleteOne({_id:id});
        return NextResponse.json(response,{status:200})
    } catch (error) {
     return NextResponse.json({message:"Internal Server Error"},{status:500})   
    }
}