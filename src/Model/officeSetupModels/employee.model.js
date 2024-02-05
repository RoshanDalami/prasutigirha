import mongoose ,{Schema} from 'mongoose'

const employeeSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    departmentId:{
        type:Number,
        required:true
    },
    postId:{
        type:Number,
        required:true
    },
    employeeId:{
        type:Number,
        required:true
    },
    employeeName:{
        type:String,
        required:true
    },
    employeeEmail:{
        type:String,
        required:true
    },
    employeePhone:{
        type:String,
        required:true
    }

},{timestamps:true})

const Employee = mongoose.models.Employee || mongoose.model('Employee',employeeSchema);
export {Employee}