import { connect } from "src/dbConfig/dbConfig";
import {NextResponse,NextRequest} from 'next/server';
import { Gestational } from "src/Model/dropdownModels/gestational.model";

export async function GET(req,res){
    const gestationalId = req.nextUrl.searchParams.get('gestationalId')
    try {
        const response = await Gestational.findOne({gestationalId:gestationalId})
        return NextResponse.json(response,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}