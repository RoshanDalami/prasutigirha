import { MilkRequsition } from "src/Model/requistion.model";
import { BabyDetail } from "src/Model/baby.model";
import { Gestational } from "src/Model/dropdownModels/gestational.model";
import {NextResponse} from 'next/server'

export async function GET(req,{params}){
    const {id} = params
    let babyList = {}
    const feedList = []
    try {
        const individual = await BabyDetail.findOne({_id:id});
        const response = await MilkRequsition.find({babyId:id});
        const gestational = await Gestational.find({});
        const gestationalName = gestational.filter((item)=>item.gestationalId === individual?.gestationalAge)?.[0]?.gestationalName
        if(response.length <= 0){
            babyList = {
                babyName:individual?.babyName,
                dateOfBaby:individual?.dateOfBaby,
                engDateOfBaby:individual?.engDateOfBaby,
                gestationalAge:gestationalName,
                babyWeight:individual?.babyWeight,
                milkComsumedDetail:[]
            }
        }
        response.forEach((items)=>{
            const array = items.requisitedMilk.map((item,index)=>{
                return {...item._doc,feedingDate:items.feedingDate}
            })
            feedList.push(...array)
            babyList = {
                babyName:individual?.babyName,
                dateOfBaby:individual?.dateOfBaby,
                engDateOfBaby:individual?.engDateOfBaby,
                gestationalAge:gestationalName,
                babyWeight:individual?.babyWeight,
                milkComsumedDetail:feedList
            }
        })
        return NextResponse.json(babyList,{status:200})
    } catch (error) {
            console.log(error);
            return NextResponse.json({message:"Internal Server Error"},{status:500});
    }
}