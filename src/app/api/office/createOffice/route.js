import { connect } from "src/dbConfig/dbConfig";
import {NextResponse,NextRequest} from 'next/server'
import { Office } from "src/Model/officeSetupModels/office.model";

connect();

export async function POST(req,res){
    try {
      let officeId = 1
      const latestOffice = await Office.findOne({},{},{sort:{officeId:-1}})
      if(latestOffice){
        const latestOfficeId = latestOffice?.officeId;
         officeId = latestOfficeId + 1
      }
     const {
         office_name,
         office_code,
         office_address,
         office_phone,
         office_email,
         stateId,
         districtId,
         palikaId
      } = await req.json()
      if(!office_name || !office_code || !office_address || !office_phone || !office_email|| !stateId || !stateId || !districtId || !palikaId){
        return NextResponse.json({message:"Fields are required"},{status:400})
      }
      const newOffice = new Office({
        office_name,
        office_code,
        office_address,
        office_phone,
        office_email,
        stateId,
        districtId,
        palikaId,
        officeId
      })
      await newOffice.save()
      return NextResponse.json({message:"Office Created Successfully"},{status:200})
     
 } catch (error) {
    return NextResponse.json({message:"Internal Server Error"},{status:500})
 }
}