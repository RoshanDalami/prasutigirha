import { DaanDarta } from "src/Model/donorDetails.model";
import {NextResponse,NextRequest} from 'next/server'

export async function GET(){
    try {
        const response = await DaanDarta.find({},{__v:0});
        return new NextResponse.json(response,{status:200},{message:'Donor list generated Successfully'})
    } catch (error) {
        console.log(error)
        return new NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}