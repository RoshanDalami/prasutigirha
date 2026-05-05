import { Post } from "src/Model/officeSetupModels/post.model";
import {NextRequest,NextResponse} from 'next/server';

export async function GET(){
    try {
        const response = await Post.find({},{__v:0})
        return NextResponse.json(response,{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}