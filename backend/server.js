import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import rfpRoutes from "../backend/routes/rfp.routes.js";
import "./cron/emailCron.js";

const app = express();
dotenv.config();

await connectDB();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/", rfpRoutes);

app.listen(3000, () => {
  console.log("listning on port 3000");
});
