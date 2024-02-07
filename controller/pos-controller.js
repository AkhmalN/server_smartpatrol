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
      res.status(404).json({ message: "Data not found!" });
    }
    res.status(200).json({ message: "Success get", data });
  } catch {
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const updatePosCollection = async (req, res) => {
  try {
    const { ID } = req.params.id;
    const { title, latitude, longitude } = req.body;
    const updatedData = { title, latitude, longitude };
    const dataPos = await Pos.findByIdAndUpdate(ID, updatedData, { new: true });
    if (!dataPos) {
      return res.status(404).json({ message: "Something wrong!" });
    } else {
      return res.status(200).json({ message: "Successfully update!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
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
