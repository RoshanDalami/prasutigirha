import mongoose,{Schema} from 'mongoose';

const gestationalSchema = new Schema({
    gestationalId:{
        type:Number,
        required:true
    },
    gestationalName:{
        type:String,
        required:true
    }
});

const Gestational = mongoose.models.Gestational || mongoose.model('Gestational',gestationalSchema)

export {Gestational}
