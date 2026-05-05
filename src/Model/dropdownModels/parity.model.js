import mongoose,{Schema} from 'mongoose';

const paritySchema = new Schema({
    parityId:{
        type:Number,
        required:true
    },
    parityName:{
        type:String,
        required:true
    }
})
const Parity = mongoose.models.Parity || mongoose.model('Parity',paritySchema,'paritys');
export {Parity}

