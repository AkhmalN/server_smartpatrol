import express from "express";
import {
  getUser,
  getAllUser,
  deleteUser,
  getUserPatrol,
  createUser,
} from "../controller/user-controller.js";

const router = express.Router();

router.post("/register_user", createUser);
router.get("/:id", getUser);
router.get("/", getAllUser);
router.delete("/:id", deleteUser);
router.get("/patrol/:id", getUserPatrol);

export default router;
