import mongoose from "mongoose"

const HealthProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    age: { type: Number },
    gender: { type: String },
    height: { type: Number },
    weight: { type: Number },
    bloodGroup: { type: String },
    medicalConditions: [{ type: String }], // array of strings
  allergies: [{ type: String }],
  medications: [{ type: String }],
  emergencyContact: {
    name: String,
    phone: String,
  },
  lastCheckup: { type: Date },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("HealthProfile",HealthProfileSchema);