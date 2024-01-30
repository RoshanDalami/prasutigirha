import mongoose,{Schema} from 'mongoose';

const userSchema = new Schema({
    username:{
        type:String,
        required:[true,'Username is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    contactNo:{
        type:String,
        required:[true,'Contact Number is required']
    },
    password:{
        type:String,
        required:[true,'Password is required field']
    },
    confirmPassword:{
        type:String,
        required:[true,'ConfirmPassword is required']
    }
},{timestamps:true})

const User = mongoose.models.users || mongoose.model('User',userSchema);

export default User;