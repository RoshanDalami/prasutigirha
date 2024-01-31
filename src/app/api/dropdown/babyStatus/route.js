
import { connect } from "@/dbConfig/dbConfig";
import {NextResponse,NextRequest} from 'next/server'
import { BabyStatus } from '@/Model/dropdownModels/babyStatus.model';
connect()

export async function GET(){
    try {
        const babyStatusList = await BabyStatus.find({})
        
        return NextResponse.json(babyStatusList,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}