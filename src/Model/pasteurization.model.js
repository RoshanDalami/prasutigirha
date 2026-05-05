import mongoose, { Schema } from "mongoose";

const donorDetailsForPooling = new Schema(
  {
    donorId: { type: Schema.Types.ObjectId, ref: "DaanDarta" },
    collectedDate: {
      type: String,
    },
    volumeOfMilkPooled: { type: Number, required: true },
    donorName:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

const pasteurizatonSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    poolingCondition: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    engDate: {
      type: String,
      required: true,
    },
    donorDetailsForPooling: [donorDetailsForPooling],
    expireDate: {
      type: String,
      required: true,
    },
    collectedVolume: {
      type: Number,
      required: true,
    },
    batchName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Pasteurization =
  mongoose.models.Pasteurization ||
  mongoose.model("Pasteurization", pasteurizatonSchema);

export { Pasteurization };
