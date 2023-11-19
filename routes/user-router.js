import express from "express";
import {
  getUser,
  getAllUser,
  deleteUser,
  getUserPatrol,
  createUser,
  updateUser,
} from "../controller/user-controller.js";

const router = express.Router();

router.post("/register_user", createUser);
router.get("/", getAllUser);
router.put("/:id", updateUser);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.get("/patrol/:createdBy", getUserPatrol);

export default router;
