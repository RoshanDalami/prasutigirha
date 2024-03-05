import { connect } from "@/dbConfig/dbConfig";
import { NextResponse,NextRequest } from 'next/server'
import { District } from "@/Model/officeSetupModels/district.model";


connect();

export async function GET(req,res){
   const stateId = req.nextUrl.searchParams.get('stateId') 
//    stateId:stateId
    try {
        const districtList = await District.find({stateId:stateId})
        return NextResponse.json(districtList,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}