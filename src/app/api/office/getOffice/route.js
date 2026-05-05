import { Office } from "src/Model/officeSetupModels/office.model";
import {NextResponse,NextRequest} from 'next/server';
import { connect } from "src/dbConfig/dbConfig";
connect()
export async function GET(){
    try {
        const response = await Office.find({});
        return NextResponse.json(response,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Office Fetching Failed"},{status:500})
    }
}