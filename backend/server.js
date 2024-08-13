import express from "express";
import { echoRoute } from "./routes/echo.js";
import mongoose, { mongo } from "mongoose";
import { groupsRoutes } from "./routes/groupsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import cors from "cors";
const app = express();
import dotenv from "dotenv";

dotenv.config();

import path from "path";
import { fileURLToPath } from "url";

// Resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// handle CORS policy
const corsOptions = {
  origin: "https://mern-court-control-g5x4.vercel.app",
  methods: "GET, POST, PUT, DELETE",
  // allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);
app.use(corsMiddleware);

app.use(express.json());
app.use("/api/echo", echoRoute);
app.use("/api/groups", groupsRoutes);
app.use("/api/users", usersRoutes);

mongoose
  // .connect("mongodb://localhost:27017/", { dbName: "cc_db" })
  .connect(process.env.MONGO_DB_CONNECT, { dbName: "cc_db" })
  .then(() => {
    console.log("Connected to DB successfully");
    app.listen(4000, "localhost", () =>
      console.log("Listening to localhost:4000")
    );
  })
  .catch((err) => console.log(err));
