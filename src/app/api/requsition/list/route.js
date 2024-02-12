import { MilkRequsition } from "src/Model/requistion.model";
import {NextResponse} from 'next/server';
export async function GET(){
    try {
        const response = await MilkRequsition.find({},{__v:0,createdAt:0,updatedAt:0})
        return NextResponse.json(response,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}