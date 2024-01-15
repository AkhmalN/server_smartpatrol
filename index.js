import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const PORT = process.env.PORT || 8083;
const app = express();
import cors from "cors";
import authRouter from "./routes/auth-router.js";
import patrolRouter from "./routes/patrol-router.js";
import usersRouter from "./routes/user-router.js";
import absenRouter from "./routes/absen-router.js";
import posRouter from "./routes/pos-router.js";
import path from "path";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use import.meta.url to get the current module's URL
const __filename = new URL(import.meta.url).pathname;
// Use path.dirname to extract the directory name
const __dirname = path.dirname(__filename);
// Middlewares
app.use(express.static("public"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/patrol", patrolRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/absensi", absenRouter);
app.use("/api/v1/pos", posRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server running on port : ", PORT);
    });
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("Cannot connect to mongodb : ", err);
  });
