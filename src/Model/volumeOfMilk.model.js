import mongoose, { Schema } from "mongoose";

const collectedMilk = new Schema(
  {
    time: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    temp: {
      type: Number,
      required: true,
    },
    storedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const volumeOfMilkSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DaanDarta",
    },
    donorName: {
      type: String,
      required: true,
    },
    gestationalAge: {
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
    remaining: {
      type: Number,
      required: true,
    },
    totalMilkCollected:{
      type:Number,
      required:true
    },
    collectedMilk:[collectedMilk]
  },
  { timestamps: true }
);
const MilkVolume =
  mongoose.models.MilkVolume ||
  mongoose.model("MilkVolume", volumeOfMilkSchema);
export { MilkVolume };
