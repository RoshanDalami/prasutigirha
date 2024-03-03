import mongoose, { Schema } from "mongoose";

const requisitedMilk = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  batchNumber: {
    type: String,
    required: [true, "Batch number is required"],
  },
  uniqueBottleNumber: {
    type: String,
    required: [true, "Unique Bottle Number is required"],
  },
  bottleName: {
    type: String,
    required: true,
  },
},{timestamps:true})

const milkRequsitionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    babyId:{
        type:Schema.Types.ObjectId,
        ref:"BabyDetail"
    },
    babyName:{
        type:String,
        required:true
    },
    
    feedingDate: {
      type: String,
      required: true,
    },
    engFeedingDate: {
      type: String,
      required: true,
    },
    requisitedMilk:[requisitedMilk]
  },
  { timestamps: true }
);

const MilkRequsition =
  mongoose.models.MilkRequsition ||
  mongoose.model("MilkRequsition", milkRequsitionSchema);

export { MilkRequsition };
