import User from "../model/User.js";
// import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";

// import Jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // next(createError(404, "User Tidak ditemukan"))
    if (!user) return res.status(400).json({ message: "User tidak ditemukan" });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Password atau username Salah" });

    res.status(200).send({ message: "Login succses", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Terjadi Kesalahan Saat Login" });
  }
};
