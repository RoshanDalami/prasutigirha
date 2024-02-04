import { Department } from 'src/Model/officeSetupModels/department.model';
import {NextRequest,NextResponse} from 'next/server';
import { connect } from "src/dbConfig/dbConfig";
connect()
export async function GET(){
    try {
        const response = await Department.find({},{__v:0});
        return NextResponse.json(response,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}