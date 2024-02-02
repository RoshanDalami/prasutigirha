import { connect } from "src/dbConfig/dbConfig";
import {NextResponse,NextRequest} from 'next/server';
import { BabyTransfer } from "src/Model/dropdownModels/babyTransfer.model";
connect();

export async function GET(){
    try {
        const transferOptions= await BabyTransfer.find({})
        return NextResponse.json(transferOptions,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}