import Patrol from "../model/Patrol.js";
import User from "../model/User.js";
// Create
export const createPatrol = async (req, res, next) => {
  const newPatrol = new Patrol({
    createdBy: req.body.createdBy,
    userId: req.body.userId,
    name: req.body.name,
    status: req.body.status,
    notes: req.body.notes,
    location: req.body.location,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });

  try {
    const savedPatrol = await newPatrol.save();
    res.status(200).json({ message: "Berhasil Mengirim patroli", savedPatrol });
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
