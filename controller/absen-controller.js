import Absen from "../model/Absen.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Create Absen
export const createAbsen = async (req, res, next) => {
  try {
    const { userId, username, latitude, longitude } = req.body;
    const image = req.file.filename;
    const newAbsen = new Absen({
      userId,
      username,
      latitude,
      longitude,
      image: image,
    });
    const savedAbsen = await newAbsen.save();
    res.status(201).json({ message: "Berhasil Mengirim Absen", savedAbsen });
  } catch (error) {
    next(error);
  }
};

export const getDetailAbsen = async (req, res, next) => {
  try {
    const absen = await Absen.findById(req.params.id);
    res.status(201).json({ message: "detail absen for", absen });
  } catch (error) {
    res.status(404).json({ message: "Detail tidak ditemukan" });
    next(error);
  }
};

export const showImage = async (req, res, next) => {
  try {
    const filename = req.params.filename;
    const currentFileUrl = import.meta.url;
    const currentDirPath = dirname(fileURLToPath(currentFileUrl));
    const imagePath = path.join(currentDirPath, "..", "uploads", filename);
    res.sendFile(imagePath);
  } catch (error) {
    next(error);
  }
};

export const getAllAbsen = async (req, res, next) => {
  try {
    const absen = await Absen.find();
    res.status(201).json(absen);
  } catch (error) {
    res.status(404).json({ message: "Terjadi Kesalahan" });
    next(error);
  }
};
