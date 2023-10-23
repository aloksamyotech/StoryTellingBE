import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const schema = mongoose.Schema({
  user_id: { type: Schema.ObjectId, required: true },
  title: { type: String, required: true },
  story: { type: String, required: true },
  tags: { type: String, required: false, default: "story" },
  category: {
    type: Schema.ObjectId,
    required: false,
    default: "6533ea51279251ddc53293ee",
  },
  like: { type: Number, required: false, default: 0 },
  rating_count: { type: Number, required: false, default: 0 },
  rating_avg: { type: Number, required: false, default: 1 }, // Avg Rating
  views: { type: Number, required: false, default: 0 },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: null },
});

export const postModel = mongoose.model("post", schema);
