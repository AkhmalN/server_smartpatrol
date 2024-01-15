import mongoose from "mongoose";

const Pos = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  title: String,
});

export default mongoose.model("Pos", Pos);
