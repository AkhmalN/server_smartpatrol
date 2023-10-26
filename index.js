import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const PORT = process.env.PORT || 8083;
const app = express();
import authRouter from "./routes/auth-router.js";
import patrolRouter from "./routes/patrol-router.js";
import usersRouter from "./routes/user-router.js";
import absenRouter from "./routes/absen-router.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use("/api/auth", authRouter);
app.use("/api/patrol", patrolRouter);
app.use("/api/users", usersRouter);
app.use("/api/absensi", absenRouter);

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
