import User from "../model/User.js";
import { createError } from "../utils/error.js";
// import Jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User Tidak ditemukan"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Password atau Username anda Salah"));
    // const token = Jwt.sign(
    //   { id: user._id, isAdmin: user.isAdmin },
    //   process.env.JWT
    // );
    // const { password, isAdmin, ...otherDetails } = user._doc;

    res
      // .cookie("access token ", token, {
      //   httpOnly: true,
      // })
      .status(201)
      .send("Login succses");
  } catch (error) {
    next(error);
  }
};
