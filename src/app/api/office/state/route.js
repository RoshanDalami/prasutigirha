import { connect } from "@/dbConfig/dbConfig";
import {NextResponse,NextRequest} from 'next/server';
import { State } from "@/Model/officeSetupModels/state.model";

connect();

export async function GET(){
    try {
        const stateList = await State.find({});
        return NextResponse.json(stateList,{status:200})
    } catch (error) {
        return NextResponse.json({message:'Internal Server Error'},{status:500})
    }
}