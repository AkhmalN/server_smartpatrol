import express from "express";
import {
  createPatrol,
  deletePatrol,
  getAllPatrol,
  getDetailPatrol,
  getUserPatrol,
  updatePatrol,
} from "../controller/patrol-controller.js";
const router = express.Router();
import multer from "multer";

// Create
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/patroli");
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
router.post("/", upload.single("image"), createPatrol);

// Get All
router.get("/", getAllPatrol);
// Get id
router.get("/:id", getDetailPatrol);
// Get user patrol
router.get("/user/:id", getUserPatrol);

// Update
router.put("/:id", updatePatrol);

// Delete
router.delete("/:id", deletePatrol);
export default router;
