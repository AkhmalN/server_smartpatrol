import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      type: String,
    },
    notes_activity: {
      type: String,
    },
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Activity", ActivitySchema);
