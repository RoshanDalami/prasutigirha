import mongoose , {Schema} from 'mongoose'
const departmentSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    officeId:{
        type:Number,
        required:true
    },
    departmentId : {
        type:Number,
        required:true
    },
    departmentName:{
        type:String,
        required:true
    }
},{timestamps:true})

const Department = mongoose.models.Department || mongoose.model('Department',departmentSchema);
export {Department}