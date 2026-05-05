import { connect } from "src/dbConfig/dbConfig";
import {NextResponse,NextRequest} from 'next/server'
import { BreastFeeding } from "src/Model/dropdownModels/breastFeeding.model";
connect();

export async function GET(){
    try {
        const breastFeedingOptions = await BreastFeeding.find({});
        return NextResponse.json(breastFeedingOptions,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}