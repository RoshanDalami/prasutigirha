import mongoose , {Schema} from 'mongoose';

const babyEntrySchema = new Schema({
    babyName:{
        type:String,
        required:true
    },
    dateOfBaby:{
        type:String,
        required:[true,'Baby birth date is required']
    },
    engDateOfBaby:{
        type:String,
        required:[true,'Baby english date is requied']
    },
    gestationalAge:{
        type:Number,
        required:[true,'Gestational Age is requied']
    },
    ipNumber:{
        type: String,
        required:[true,'Ip number is required']
    },
    babyWeight:{
        type:String,
        required:[true,'Baby weight is required']
    },
    diagnosis:{
        type:String,
        required:[true,'Diagnosis recipient is required']
    },
    indications:{
        type:String,
        required:[true,"Indications is required"]
    }
},{timestamps:true})

const feedingDetailsSchema = new Schema({
    batchNumber:{
        type:String,
        required:[true,'Batch number is required']
    },
    uniqueBottleNumber :{
        type:String,
        required:[true,'Unique Bottle Number is required']
    },
    bottleName:{
        type:String,
        required:true
    },
    feedingDate:{
        type:String,
        required:true
    },
    engFeedingDate:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
},{timestamps:true})

const milkRequsitionSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    babyEntry: babyEntrySchema,
    babyStatus:{
        type:String,
        required:true
    },
    feedingDetails:feedingDetailsSchema
},{timestamps:true})

const MilkRequsition = mongoose.models.MilkRequsition || mongoose.model('MilkRequsition',milkRequsitionSchema)

export{MilkRequsition}