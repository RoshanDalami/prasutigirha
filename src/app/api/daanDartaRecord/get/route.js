import { DaanDarta } from "src/Model/donorDetails.model";
import {NextResponse,NextRequest} from 'next/server'

export async function GET(){
    try {
        const response = await DaanDarta.find({},{__v:0});
        return NextResponse.json(response,{status:200},{message:'Donor list generated Successfully'})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}