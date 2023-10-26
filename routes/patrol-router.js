import express from "express";
import {
  createPatrol,
  deletePatrol,
  getAllPatrol,
  getDetailPatrol,
} from "../controller/patrol-controller.js";
const router = express.Router();

// Create

router.post("/", createPatrol);

// Delete
router.delete("/:id", deletePatrol);

// Get id
router.get("/:id", getDetailPatrol);

// Get All
router.get("/", getAllPatrol);

export default router;
