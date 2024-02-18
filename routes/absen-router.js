import express from "express";
import {
  createAbsen,
  deleteAbsen,
  getAllAbsen,
  getDetailAbsen,
  getUserAbsen,
  showImage,
  updateAbsen,
} from "../controller/absen-controller.js";
import multer from "multer";
import path from "path";

const router = express.Router();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/absensi");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        "-" +
        file.originalname
    );
  },
});
const upload = multer({ storage: fileStorage });

// Create Absen
router.post("/", upload.single("image"), createAbsen);

// Get all Absen
router.get("/", getAllAbsen);

// Get detail Absen
router.get("/:id", getDetailAbsen);

// Get user Absen
router.get("/user/:id", getUserAbsen);

// Update Absen
router.put("/:id", updateAbsen);

// Delete Absen
router.delete("/:id", deleteAbsen);

// Get image
router.get("/image/:filename", showImage);

export default router;
