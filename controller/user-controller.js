import User from "../model/User.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import Patrol from "../model/Patrol.js";

// Create User

export const createUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    });
    await newUser.save();
    if (!newUser) {
      return res.json({ message: "terjadi Kesalahan" });
    }
    res.status(201).json({ message: "User Ditambahkan" });
  } catch (error) {
    next(error);
  }
};

// Get Specific
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(200).json({ message: "User Tidak Ditemukan" });
    res.status(200).json({ message: "Berhasil mendapat user", user });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Get all
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Delete
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User telah dihapus");
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Update Users

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, newPassword, role, image } = req.body;
    const updatedData = { username, email, role, image };
    if (newPassword) {
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ message: "password kurang dari 6 karakter" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      updatedData.password = hashedPassword;
    }
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!user) {
      return res.status(404).json({ message: "Gagal dalam Mengubah Data" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// !Patrol

export const getUserPatrol = async (req, res, next) => {
  try {
    const patrols = await Patrol.find({ createdBy: createdBy });

    if (!patrols || patrols.length === 0) {
      return res.status(404).json({ message: "Tidak ada patroli ditemukan" });
    }
    res.status(200).json(patrols);
  } catch (error) {
    next(error);
  }
};

// export const getUserPatrol = async (req, res, next) => {
//   const patrols = await Patrol.findById(req.params.createdBy);
//   res.status(201).json(patrols);
//   // res.send("User patrol endpoint");
// };
