import mongoose from "mongoose";

var NewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  createTime: { type: Date, default: Date.now },
});

mongoose.model("News", NewsSchema);
