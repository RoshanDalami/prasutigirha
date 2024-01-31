import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  districtId: {
    type: Number,
    required: true,
  },
  stateId: {
    type: Number,
    required: true,
  },
  districtName: {
    type: String,
  },
  districtNameNep: {
    type: String,
    required: true,
  },
  districtCode: {
    type: Number,
  },
  state: {
    type: String,
  },
});

const District = mongoose.models.District || mongoose.model("District", districtSchema);
export  {District};