import mongoose , {Schema} from 'mongoose';

const BabyStatusSchema = new Schema({
    babyStatusId:{
        type:Number,
        required:true
    },
    babyStatusName:{
        type:String,
        required:true
    }
});

const BabyStatus = mongoose.models.BabyStatus || mongoose.model('BabyStatus',BabyStatusSchema)

export {BabyStatus}

