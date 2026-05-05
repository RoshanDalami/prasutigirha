import { connect  } from "@/dbConfig/dbConfig";
import {NextResponse,NextRequest} from 'next/server';
import { Parity } from "@/Model/dropdownModels/parity.model";
connect();

export async function GET(){
    try {
        const parity = await Parity.find({})
        return NextResponse.json(parity,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}