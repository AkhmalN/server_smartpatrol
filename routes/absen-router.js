import express from "express";
import {
  createAbsen,
  getAllAbsen,
  getDetailAbsen,
  showImage,
} from "../controller/absen-controller.js";
import multer from "multer";

const router = express.Router();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads/absen");
    // cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
const upload = multer({ storage: fileStorage });

// Create Absen
router.post("/", upload.single("image"), createAbsen);

// Get all Absen
router.get("/users", getAllAbsen);

// Get Absen
router.get("/:id", getDetailAbsen);

// Get image
router.get("/image/:filename", showImage);

export default router;
