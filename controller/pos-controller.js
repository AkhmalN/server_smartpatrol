import Pos from "../model/Pos.js";

export const createPosCollection = async (req, res) => {
  const { latitude, longitude, title } = req.body;

  if (!latitude || !longitude || !title) {
    return res
      .status(400)
      .json({ error: "Latitude, longitude, and title are required." });
  }

  const newLocation = new Pos({
    latitude,
    longitude,
    title,
  });

  try {
    await newLocation.save();
    res
      .status(201)
      .json({ success: true, message: "Location added successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getsPosCollection = async (req, res) => {
  try {
    const data = Pos.find();
    if ((await data).length < 1) {
      res.status(200).json({ message: "Tidak ada data yang ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error server!" });
  }
};

export const getPosCollection = async (req, res) => {
  try {
    const data = await Pos.findOne(req.params.id);
    if (!data) {
      res.status(200).json({ message: "cannot data to show" });
    }
    res.status(200).json({ message: "cannot djknbsfmdlnjbajndnb" });
  } catch {
    res.status(500).json({ message: "Error Server! klninnsbbfmnjh" });
  }
};

export const deletePosCollection = async (req, res) => {
  try {
    const { ID } = req.params.id;
    await Pos.findOneAndDelete(ID);
    res.status(200).json({ message: "success delete pos!" });
  } catch (error) {
    res.status(500).json({ message: "Error server" });
  }
};
