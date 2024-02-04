import { MilkVolume } from "src/Model/volumeOfMilk.model";
import {NextResponse} from 'next/server';

export async function PATCH(req,{params}){
    const body = await req.json()
    try {
        const id = params.id
        const response = await MilkVolume.updateOne({_id:id},body)
        if(response.modifiedCount !== 1){
            return NextResponse.json({message:"Update Failed"},{status:500})
        }
        return NextResponse.json(response,{status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}   