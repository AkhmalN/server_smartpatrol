import Absen from "../model/Absen.js";

// Create Absen
export const createAbsen = async (req, res, next) => {
  const newAbsen = new Absen({
    userId: req.body.userId,
    username: req.body.username,
    // location: req.body.location,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    // images: req.body.images,
    timestamp: req.body.timestamp,
  });
  try {
    const savedAbsen = await newAbsen.save();
    res.status(201).json({ message: "Berhasil Mengirim Absen", savedAbsen });
  } catch (error) {
    next(error);
  }
  // res.status(200).json({ message: "Create Absen End Point" });
};

export const getAllAbsen = async (req, res, next) => {
  try {
    const absen = await Absen.find();
    res.status(201).json(absen);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    next(error);
  }
};
