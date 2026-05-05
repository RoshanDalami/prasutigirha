import mongoose from "mongoose";
const palikaSchema = new mongoose.Schema({
  palikaId: {
    type: Number,
    required: true,
  },
  districtId: {
    type: Number,
    required: true,
  },
  palikaName: {
    type: String,
  },
  palikaNameNep: {
    type: String,
    required: true,
  },
  palikaCode: {
    type: Number,
  },
});
const Palika = mongoose.models.Palika || mongoose.model("Palika", palikaSchema, "palika");
export  {Palika};