import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from 'next/server'
import { Palika } from "@/Model/officeSetupModels/palika.model";
connect();

export async function GET(req,res){
    const districtId = req.nextUrl.searchParams.get('districtId')
    // districtId:districtId
    try {
        const palikaList = await Palika.find({districtId:districtId})
        return NextResponse.json(palikaList,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}