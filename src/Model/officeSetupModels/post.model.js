import mongoose,{Schema} from 'mongoose';
const postSchema = new Schema({
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
    postName:{
        type:String,
        required:true
    }
},{timestamps:true})
const Post = mongoose.models.Post || mongoose.model('Post',postSchema)
export {Post}