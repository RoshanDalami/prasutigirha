import mongoose from "mongoose";
const departmentSchema = new mongoose.Schema({
  dep_id: {
    type: Number,
    required: true,
  },
  dep_name: {
    type: String,
    required: true,
  },
});
const Department = mongoose.models.Department || mongoose.model("Department", departmentSchema);
export  {Department};