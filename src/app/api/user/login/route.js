import { connect } from "@/dbConfig/dbConfig";
import User from "@/Model/user.model";
import {NextResponse,NextRequest} from 'next/server';
import { asyncHandler } from "@/utils/asyncHandler";
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
connect()

export async function POST(req,res){
    const JWT_SECRET = "sjanxdskc";
    try {
        const {email,password} = await req.json();
        const user = await User.findOne({email:email});
        if(!user){
            return NextResponse.json({message:"Email or password is Invalid"},{status:201})
        }

        const matchedPassword = await bcryptjs.compare(password,user.password);
        if(!matchedPassword){
            return NextResponse.json({message:"Password Invalid"},{status:201})
        }
        const token = jwt.sign(
            {userId:user._id,email:user.email},
            JWT_SECRET,{expiresIn:'1d'}
        )
        return NextResponse.json(token,{message:"User Logged In Successfully"},{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}