import {
  createActivity,
  deleteActivity,
  getActivity,
  getAllActivities,
  getUserActivity,
} from "../controller/activity-controller.js";
import express from "express";
import path from "path";
import multer from "multer";

const Router = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/aktivitas");
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

Router.post("/", upload.single("image"), createActivity);
Router.get("/", getAllActivities);
Router.get("/:id", getActivity);
Router.get("/user/:id", getUserActivity);
Router.delete("/:id", deleteActivity);

export default Router;
