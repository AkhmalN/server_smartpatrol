import express from "express";
import {
  createPatrol,
  deletePatrol,
  getAllPatrol,
  getDetailPatrol,
  updatePatrol,
} from "../controller/patrol-controller.js";
const router = express.Router();
import multer from "multer";

// Create
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads/patroli");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: fileStorage });
router.post("/", upload.single("image"), createPatrol);

// Get id
router.get("/:id", getDetailPatrol);

// Get All
router.get("/", getAllPatrol);

// Update
router.put("/:id", updatePatrol);

// Delete
router.delete("/:id", deletePatrol);
export default router;
