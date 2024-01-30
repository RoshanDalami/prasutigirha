import { connect } from "@/dbConfig/dbConfig";
import User from "@/Model/user.model";
import { NextRequest,NextResponse}  from 'next/server'


connect()

export async function GET(){
    try {
        const response = await User.find({});
        return NextResponse.json(response,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
   
}