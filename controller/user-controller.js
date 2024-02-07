import User from "../model/User.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import Patrol from "../model/Patrol.js";
import path from "path";

// Create User
export const createUser = async (req, res, next) => {
  try {
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(req.body.password, salt);
    const imagePath = path.join("public/profil", req.file.filename);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      no_hp: req.body.no_hp,
      image: imagePath,
    });
    await newUser.save();
    if (!newUser) {
      res.status(404).json({ message: "Something wrong!" });
    }
    res.status(201).json({ message: "Success add user!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    next(error);
  }
};

// Get user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json({ message: "User not found!" });
    res.status(200).json({ message: "Success get", user });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Get users
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "Data not found or empty!" });
    } else {
      return res.status(200).json({ message: "Success get", users });
    }
  } catch (error) {
    res.status(404).json({ message: "Internal server error!" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User telah dihapus");
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Update User

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role, image, no_hp } = req.body;
    const updatedData = { username, email, role, image, password, no_hp };
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
