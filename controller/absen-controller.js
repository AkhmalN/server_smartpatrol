import Absen from "../model/Absen.js";
import User from "../model/User.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Create Absen
export const createAbsen = async (req, res, next) => {
  try {
    const { userId, username, latitude, longitude } = req.body;
    const imagePath = path.join("public/absensi", req.file.filename);

    console.log(req.file.filename);
    const newAbsen = new Absen({
      userId,
      username,
      latitude,
      longitude,
      image: imagePath,
    });
    await newAbsen.save();
    res.status(201).json({
      message: "Success send data",
    });
  } catch (error) {
    res.status(404).json({ message: "Internal server error!" });
    next(error);
  }
};

// Get All Absen
export const getAllAbsen = async (req, res, next) => {
  try {
    const absen = await Absen.find();
    res.status(201).json({ message: "Success get", absen });
  } catch (error) {
    res.status(404).json({ message: "Internal server error!" });
    next(error);
  }
};

// Get Detail Absen

export const getDetailAbsen = async (req, res, next) => {
  try {
    const absen = await Absen.findById(req.params.id);
    res.status(201).json({ message: "Success get", absen });
  } catch (error) {
    res.status(404).json({ message: "Data no found!" });
    next(error);
  }
};

// Get User Absen
export const getUserAbsen = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const absen = await Absen.findOne({ userId });

    if (absen) {
      res.status(201).json({ message: "Success get", absen });
    } else {
      res.status(404).json({ message: "Data not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    next(error);
  }
};

// Update Absen

export const updateAbsen = async (req, res) => {};

// Delete Absen
export const deleteAbsen = async (req, res) => {
  try {
    await Absen.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Data has been deleted!" });
  } catch (error) {
    return res.status(404).json({ message: "Internal server error!" });
  }
};

// Show Image
export const showImage = async (req, res, next) => {
  try {
    const filename = req.params.filename;
    console.log(filename);
    const currentFileUrl = import.meta.url;
    const currentDirPath = dirname(fileURLToPath(currentFileUrl));
    const imagePath = path.join(currentDirPath, "uploads", filename);
    res.sendFile(imagePath);
  } catch (error) {
    next(error);
  }
};
