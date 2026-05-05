import mongoose from "mongoose";

const ethnicitySchema = new mongoose.Schema({
  ethnicityId: {
    type: Number,
    unique: true,
    required: true,
  },
  ethnicityName: {
    type: String,
    required: true,
  },
});

const Ethnicity = mongoose.models.Ethnicity || mongoose.model(
  "Ethnicity",
  ethnicitySchema,
  "ethnicitys"
);
export  {Ethnicity};