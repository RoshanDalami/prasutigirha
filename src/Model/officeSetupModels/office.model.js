
      
import mongoose from "mongoose";

const officeSchema = new mongoose.Schema({
  office_name: {
    type: String,
    required: true,
  },
  officeId:{
    type:Number,
    required:true
  },
  office_code: {
    type: Number,
    required: true,
  },
  office_address: {
    type: String,
    required: true,
  },
  office_phone: {
    type: Number,
  },
  office_email: {
    type: String,
    required: true,
  },
  stateId: {
    type: Number,
    required: true,
  },
  districtId: {
    type: Number,
    required: true,
  },
  palikaId: {
    type: Number,
    required: true,
  },
});
 const Office = mongoose.models.Office || mongoose.model("Office", officeSchema);

 export {Office}