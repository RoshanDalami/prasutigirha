import mongoose , {Schema} from 'mongoose'


export const DaanDarta = mongoose.models.DaanDarta || mongoose.model("DaanDarta", daanDartaSchema);