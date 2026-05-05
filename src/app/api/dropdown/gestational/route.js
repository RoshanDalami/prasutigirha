import { connect } from "@/dbConfig/dbConfig";
import {NextResponse,NextRequest} from 'next/server';
import { Gestational } from "@/Model/dropdownModels/gestational.model";
connect();

export async function GET(){
    try {
        const gestationalList = await Gestational.find({});
        
        return NextResponse.json(gestationalList,{status:200})
    } catch (error) {
            return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}