import mongoose from "mongoose";

const AbsenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      ref: "User",
      required: true,
    },
    // location: {
    //   type: {
    //     type: String,
    //     enum: ["Point"],
    //     required: true,
    //   },
    //   coordinates: {
    //     type: [Number],
    //     required: true,
    //   },
    // },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    // image: {
    //   type: Buffer,
    //   required: true,
    // },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Absen", AbsenSchema);
