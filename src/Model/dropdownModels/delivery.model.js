import mongoose,{Schema} from 'mongoose';

const deliverySchema = new Schema({
    deliveryId:{
        type:Number,
        required:true
    },
    deliveryName:{
        type:String,
        required:true
    }
});

const Delivery = mongoose.models.Delivery || mongoose.model('Delivery',deliverySchema,'deliverys')

export {Delivery}

