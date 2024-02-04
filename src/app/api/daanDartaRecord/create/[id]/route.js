import {NextResponse} from 'next/server';

export async function PATCH(req,{ params }){
   const id = params.id
   
   return NextResponse.json(id,{status:200})
}