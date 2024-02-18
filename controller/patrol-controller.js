import Patrol from "../model/Patrol.js";
import path from "path";

// Create
export const createPatrol = async (req, res, next) => {
  try {
    const { userId, username, location, status, notes, latitude, longitude } =
      req.body;
    const imagePath = path.join("public/patroli", req.file.filename);
    const newPatrol = new Patrol({
      userId,
      username,
      location,
      status,
      notes,
      latitude,
      longitude,
      image: imagePath,
    });
    const savedPatrol = await newPatrol.save();
    res
      .status(201)
      .json({ message: "Success created patrols", data: savedPatrol });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    next(error);
  }
};

// Get all
export const getAllPatrol = async (req, res, next) => {
  try {
    const patrols = await Patrol.find();
    res.status(201).json({ message: "Success get", patrols });
  } catch (error) {
    res.status(404).json({ mesaage: "Data not found!" });
    next(error);
  }
};

// Get detail
export const getDetailPatrol = async (req, res, next) => {
  try {
    const findPatrolSpesific = await Patrol.findById(req.params.id);
    res.status(201).json({ message: "Success get", findPatrolSpesific });
  } catch (error) {
    res.status(404).json({ message: "Data not found!" });
    next(error);
  }
};

export const getUserPatrol = async (req, res, next) => {
  try {
    const patrol = await Patrol.find({ userId: req.params.id });

    if (!patrol || patrol.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json(patrol);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan internal server" });

    next(error);
  }
};

// Update

export const updatePatrol = async (req, res) => {
  try {
  } catch (error) {}
};

// Delete
export const deletePatrol = async (req, res, next) => {
  try {
    await Patrol.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Data has been deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    next(error);
  }
};
