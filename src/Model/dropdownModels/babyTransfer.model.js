
import mongoose , {Schema} from 'mongoose'

const babyTransferSchema = new Schema({
    babyTransferId:{
        type:Number,
        required:true
    },
    babyTransferName:{
        type:String,
        required:true
    }
})

const BabyTransfer = mongoose.models.BabyTransfer || mongoose.model('BabyTransfer',babyTransferSchema)
export {BabyTransfer}

