import Activity from "../model/Activity.js";
import path from "path";

export const createActivity = async (req, res, next) => {
  try {
    const { username, userId, location, notes_activity } = req.body;
    const imagePath = path.join("public/aktivitas", req.file.filename);
    const newActivity = new Activity({
      userId,
      username,
      location,
      notes_activity,
      image: imagePath,
    });
    await newActivity.save();
    if (!newActivity) {
      return res.json({ message: "terjadi Kesalahan" });
    }
    res.status(201).json({ message: "Aktivitas Berhasil Ditambahkan" });
  } catch (error) {
    next(error);
  }
};

export const getAllActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(404).json({ message: "Terjadi Kesalahan" });
    next(error);
  }
};

export const getActivity = async (req, res, next) => {
  try {
    await Activity.findById(req.params.id);
    res.status(201).json({ message: "detail absen for", absen });
  } catch (error) {
    res.status(404).json({ message: "Detail tidak ditemukan" });
    next(error);
  }
};

export const getUserActivity = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const activities = await Activity.findOne({ userId });

    if (activities) {
      res.status(201).json({ message: "Success get", activities });
    } else {
      res.status(404).json({ message: "Data not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    next(error);
  }
};

export const deleteActivity = async (req, res, next) => {
  try {
    const ID = req.params.id;
    await Activity.findByIdAndDelete(ID);
    res.status(201).json({ message: "Activity has been deleted!" });
  } catch (error) {
    res.status(404).json({ message: "Data not found!" });
  }
};
