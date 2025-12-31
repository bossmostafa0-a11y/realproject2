import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },

  email: { type: String, unique: true, required: true },

  phone: { type: String, unique: true, required: true },

  address: { type: String, required: true },

  otp: { type: String }, // OTP مؤقت

  otpTime: { type: Date }, // وقت إرسال OTP

  isConfirmed: { type: Boolean, default: false },

  role: { type: String, enum: ["admin", "user"], default: "user" }

}, { timestamps: true });

export const usermodels = mongoose.model("User", userSchema);
