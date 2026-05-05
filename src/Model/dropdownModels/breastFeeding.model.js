import mongoose , {Schema} from 'mongoose'

const breastFeedingSchema = new Schema({
    feedingId:{
        type:Number,
        required:true
    },
    feedingName:{
        type:String,
        required:true
    }
})

const BreastFeeding = mongoose.models.BreastFeeding || mongoose.model('BreastFeeding',breastFeedingSchema)
export {BreastFeeding}

[
    {feedingId:1,feedingName:'Exclusive Breast Feeding'},
    {feedingId:2,feedingName:'Partial Breast Feeding'},
    {feedingId:3,feedingName:'Formula Milk only'},
    {feedingId:4,feedingName:'Both'},
    {feedingId:5,feedingName:'N.P.O.'},
    {feedingId:6,feedingName:'PDHM'},
]