import mongoose from "mongoose";

const AbsenSchema = new mongoose.Schema(
  {
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
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Absen", AbsenSchema);
