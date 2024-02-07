import mongoose from "mongoose";

const AbsenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      ref: "User",
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Absen", AbsenSchema);
