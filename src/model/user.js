import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: null },
  last_otp: { type: Number, default: null },
});

export const userModel = mongoose.model("user", schema);
