import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "../api/routes/authRoutes.js";
import policyRoutes from "./routes/policyRoutes.js";

import cors from "cors";

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Failed", err));

// app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(cors());

// Your routes
app.use("/api/auth", authRoutes);
app.use("/api/policy", policyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
