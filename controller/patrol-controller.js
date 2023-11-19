import Patrol from "../model/Patrol.js";
import { dirname } from "path";

// Create
export const createPatrol = async (req, res, next) => {
  try {
    const { userId, username, location, status, notes, latitude, longitude } =
      req.body;
    const image = req.file.filename;
    console.log(image);
    const newPatrol = new Patrol({
      userId,
      username,
      location,
      status,
      notes,
      latitude,
      longitude,
      image,
    });
    const savedPatrol = newPatrol.save();
    res.status(201).json({ message: "berhasil membuat patroli", savedPatrol });
  } catch (error) {
    next(error);
  }
};

// Delete
export const deletePatrol = async (req, res, next) => {
  try {
    await Patrol.findByIdAndDelete(req.params.id);
    res.status(200).json("Aktivitas Patroli dihapus");
  } catch (error) {
    next(error);
  }
};

// Get detail
export const getDetailPatrol = async (req, res, next) => {
  try {
    const findPatrolSpesific = await Patrol.findById(req.params.id);
    res.status(200).json(findPatrolSpesific);
  } catch (error) {
    next(error);
  }
};

// Get all
export const getAllPatrol = async (req, res, next) => {
  try {
    const patrols = await Patrol.find();
    res.status(200).json(patrols);
  } catch (error) {
    next(error);
  }
};
