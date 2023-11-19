import express from "express";
import {
  createPatrol,
  deletePatrol,
  getAllPatrol,
  getDetailPatrol,
} from "../controller/patrol-controller.js";
const router = express.Router();
import multer from "multer";

// Create
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads/patroli");
    // cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
const upload = multer({ storage: fileStorage });
router.post("/", upload.single("image"), createPatrol);

// Delete
router.delete("/:id", deletePatrol);

// Get id
router.get("/:id", getDetailPatrol);

// Get All
router.get("/", getAllPatrol);

export default router;
