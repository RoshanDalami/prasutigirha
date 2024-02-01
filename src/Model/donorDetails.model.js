import mongoose, { Schema } from "mongoose";
import { Gestational } from "../Model/dropdownModels/gestational.model.js";
import { BabyStatus } from "../Model/dropdownModels/babyStatus.model.js";
import { Parity } from "../Model/dropdownModels/parity.model.js";
import { Delivery } from "../Model/dropdownModels/delivery.model.js";

const daanDartaSchema = new mongoose.Schema({
  hosRegNo: {
    type: String,
  },
  donorRegNo: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  donor_FullName: {
    type: String,
  },
  education: {
    type: String,
  },
  ethnicity: {
    type: String,
  },
  address: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  ageOfChild: {
    type: Number,
  },
  gestationalAge: {
    type: Schema.Types.ObjectId,
    ref: Gestational,
  },
  modeOfDelivery: {
    type: Schema.Types.ObjectId,
    ref: Delivery,
  },
  parity: {
    type: Schema.Types.ObjectId,
    ref: Parity,
  },

  babyStatus: {
    type: Schema.Types.ObjectId,
    ref: BabyStatus,
  },

  // serologyRecords: serologyScreeningSchema,

  // verbalExamination: {
  //   type: verbalExaminationSchema,
  // },

  // donorPhysicalExamination: donorPhysicalExaminationSchema,
});

export const DaanDarta =
  mongoose.models.DaanDarta || mongoose.model("DaanDarta", daanDartaSchema);
