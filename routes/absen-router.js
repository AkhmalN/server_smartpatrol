import express from "express";
import { createAbsen, getAllAbsen } from "../controller/absen-controller.js";
const router = express.Router();

router.post("/", createAbsen);
router.get("/users", getAllAbsen);

export default router;
