import {NextResponse} from 'next/server';
import { DaanDarta } from 'src/Model/donorDetails.model';
import { connect } from 'src/dbConfig/dbConfig';
connect();
export async function PATCH(req,{ params }){
   const id = params.id
   const body = await req.json();
   try {
      const response = await DaanDarta.updateOne({_id:id},body)
      return NextResponse.json(response,{status:200})
   } catch (error) {
      return NextResponse.json({message:"Internal Server Error"},{status:500})
   }
   
}