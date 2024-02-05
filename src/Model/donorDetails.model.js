import mongoose, { Collection, Schema } from "mongoose";

const babyStatusSchema = new mongoose.Schema({
  dateOfBirth: {
    type: Date,
  },
  babyStatus: {
    type: Number,
  },
  babyTransfer: {
    type: Number,
  },
  babyFeeding: {
    type: Number,
  },
});
const serologyScreeningSchema = new mongoose.Schema({
  hiv: {
    type: Boolean,
  },
  hbsag: {
    type: Boolean,
  },
  vdrl: {
    type: Boolean,
  },
  dateOfTest: {
    type: Date,
  },

  // helperName: {
  //   type: String,
  // },

  // helperSignature: {},
});
const verbalExaminationSchema = new mongoose.Schema({
  acuteInfection: {
    type: Boolean,
  },
  chronicInfection: {
    type: Boolean,
  },
  cancerTreatmentWithinThreeYears: {
    type: Boolean,
  },
  autoImmuneDisease: {
    type: Boolean,
  },
  coughMoreThanTwoWeeks: {
    type: Boolean,
  },
  chickenpox: {
    type: Boolean,
  },
  stdLastOneYear: {
    type: Boolean,
  },
  medCancerAntisicotikRadioactiveThyroid: {
    type: Boolean,
  },
  transplantAndBloodTaken: {
    type: Boolean,
  },
  BadLifeStyle: {
    type: String,
  },
  examinationDocName: {
    type: String,
  },
  examDate: {
    type: Date,
  },

  testAfterSomeDays: {
    type: Number,
  },
});

const donorPhysicalExaminationSchema = new mongoose.Schema({
  mastitis: {
    type: Boolean,
  },
  localLesions: {
    type: Boolean,
  },
  fugalInNippleAreola: {
    type: Boolean,
  },
  herpesZoster: {
    type: Boolean,
  },
  doctorName: {
    type: String,
  },
  examinationDate: {
    type: Date,
  },
});

const daanDartaSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
  donorAge: {
    type: Number,
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
    type: Number,
  },
  modeOfDelivery: {
    type: Number,
  },
  parity: {
    type: Number,
  },
  isDonorActive: {
    type: Boolean,
    default: true,
  },
  isSerologyPositive: {
    type: Boolean,
  },
  verbalStatus: {
    type: Boolean,
  },
  physicalStatus: {
    type: Boolean,
  },
  colostrumStatus: {
    type: Boolean,
  },
  remarks: {
    type: String,
  },
  isExternal: {
    type: Boolean,
  },

  babyStatus: babyStatusSchema,
  serologyRecords: serologyScreeningSchema,
  verbalExamination: verbalExaminationSchema,
  donorPhysicalExamination: donorPhysicalExaminationSchema,
});

const DaanDarta =
  mongoose.models.DaanDarta || mongoose.model("DaanDarta", daanDartaSchema);

export { DaanDarta };
