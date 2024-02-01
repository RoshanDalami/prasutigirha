import mongoose ,{Schema} from 'mongoose'

const volumeOfMilkSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    donorId:{
        type:Schema.Types.ObjectId,
        ref:'DaanDarta'
    },
    gestationalAge:{
        type: Number ,
    },
    data:{
        type:String,
    },
    time:{
        type:String,
    },
    quantity:{
        type:String,
    },
    storedBy:{
        type:String
    },
    temp:{
        type:String
    }
},{timestamps:true})
const MilkVolume = mongoose.models.MilkVolume || mongoose.model('MilkVolume',volumeOfMilkSchema)
export {MilkVolume}