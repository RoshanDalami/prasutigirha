import mongoose, { Schema } from "mongoose";

const donorDetailsForPooling = new Schema(
  {
    donorId: { type: Schema.Types.ObjectId, ref: "DaanDarta" },
    volumeOfMilkPooled:{type:Number,required:true},
  },
  { timestamps: true }
);

const pasteurizatonSchema = new Schema(
  {
    userId:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    poolingCondition: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    engDate:{
      type:String,
      required:true
    },
    donorDetailsForPooling: [donorDetailsForPooling],
  },
  { timestamps: true }
);

const Pasteurization =
  mongoose.models.Pasteurization ||
  mongoose.model("Pasteurization", pasteurizatonSchema);

export { Pasteurization };
