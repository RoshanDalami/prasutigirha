import mongoose from "mongoose";
const fiscalYearSchema = new mongoose.Schema({
  fiscalYearId: {
    type: Number,
    required: true,
  },
  fiscalYearName: {
    type: String,
    required: true,
  },
});
const Fiscalyear =
  mongoose.models.Palika || mongoose.model("Fiscalyear", fiscalYearSchema);
export { Fiscalyear };
