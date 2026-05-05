import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function GET(){
    try {
        cookies().delete('token')
        const response =  NextResponse.json({
            message : 'Logout Successfully',
            success: true,
        });
        
        return response
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
}