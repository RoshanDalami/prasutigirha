import mongoose , {Schema} from 'mongoose';

const StateSchema = new Schema({
    stateId:{
        type:Number
    },
    stateName:{
        type:String,
        required:true
    },
    stateNameNep:{
        type:String,
        required:true
    },
    stateCode:{
        type:Number
    }
})

const State = mongoose.models.State || mongoose.model('State',StateSchema);
export {State}