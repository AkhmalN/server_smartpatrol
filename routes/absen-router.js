import express from "express";
import {
  createAbsen,
  getAllAbsen,
  getDetailAbsen,
  showImage,
} from "../controller/absen-controller.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Create Absen
router.post("/", upload.single("image"), createAbsen);

// Get all Absen
router.get("/users", getAllAbsen);

// Get Absen
router.get("/:id", getDetailAbsen);

// Get image
router.get("/image/:filename", showImage);

export default router;
