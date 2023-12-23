import Absen from "../model/Absen.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
// Create Absen
export const createAbsen = async (req, res, next) => {
  try {
    const { username, latitude, longitude } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    const imageBuffer = fs.readFileSync(
      path.join("public/uploads", req.file.filename)
    );
    // const image =
    //   req.protocol + "://" + req.get("host") + "/absen/" + req.file.filename;
    console.log(req.file.filename);
    const newAbsen = new Absen({
      username,
      latitude,
      longitude,
      image: {
        data: imageBuffer,
        contentType: "image/png", // Sesuaikan dengan tipe gambar yang diunggah
      },
    });
    const savedAbsen = await newAbsen.save();
    res.status(201).json({
      message: "Berhasil Mengirim Absen",
      savedAbsen: { ...savedAbsen._doc, image: undefined },
    });
  } catch (error) {
    next(error);
  }
};

// Get Absen

export const getDetailAbsen = async (req, res, next) => {
  try {
    const absen = await Absen.findById(req.params.id);
    res.status(201).json({ message: "detail absen for", absen });
  } catch (error) {
    res.status(404).json({ message: "Detail tidak ditemukan" });
    next(error);
  }
};

// Get All Absen
export const getAllAbsen = async (req, res, next) => {
  try {
    const absen = await Absen.find();
    res.status(201).json(absen);
  } catch (error) {
    res.status(404).json({ message: "Terjadi Kesalahan" });
    next(error);
  }
};

// Update Absen

export const updateAbsen = async (req, res) => {};

// Delete Absen
export const deleteAbsen = async (req, res) => {
  try {
    await Absen.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Absensi Telah di hapus!" });
  } catch (error) {
    return res.status(404).json({ message: "Terjadi kesalahan pada server!" });
  }
};

// Show Image
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
