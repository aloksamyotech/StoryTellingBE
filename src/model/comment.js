import mongoose from "mongoose";
const Schema = mongoose.Schema;
const schema = mongoose.Schema({
  post_id: { type: Schema.ObjectId, required: true },
  comment: { type: String, required: true },
  user: { type: String, required: false , default:"Anonymous" },
  created_at: { type: Date, default: new Date() },

});

export const commentModel = mongoose.model("comment", schema);
