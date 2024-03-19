import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nik: {
      type: String,
      unique: true,
    },
    domisili: {
      type: String,
    },
    tempat_lahir: {
      type: String,
    },
    tanggal_lahir: {
      type: Date,
    },
    no_hp: {
      type: String,
    },
    role: {
      type: String,
    },
    unit_kerja: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
