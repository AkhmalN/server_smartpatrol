import express from "express";
import {
  createPosCollection,
  deletePosCollection,
  getsPosCollection,
} from "../controller/pos-controller.js";

const router = express.Router();

router.post("/", createPosCollection);
router.get("/", getsPosCollection);
router.delete("/:id", deletePosCollection);

export default router;
