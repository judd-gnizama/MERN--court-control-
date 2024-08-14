import express from "express";
import { echoRoute } from "./routes/echo.js";
import mongoose, { mongo } from "mongoose";
import { groupsRoutes } from "./routes/groupsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
import path from "path";
import { fileURLToPath } from "url";

// // Resolving dirname for ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.json());
// handle CORS policy
const corsOptions = {
  origin: "https://mern-court-control-g5x4.vercel.app",
  credentials: true,
};

const corsMiddleware = cors(corsOptions);
app.use(corsMiddleware);

app.use("/api/echo", echoRoute);
app.use("/api/groups", groupsRoutes);
app.use("/api/users", usersRoutes);

app.get("/", async (req, res) => {
  res.json({ message: "hello from server" });
});

// // Render client
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
// );

mongoose
  // .connect("mongodb://localhost:27017/", { dbName: "cc_db" })
  .connect(process.env.MONGO_DB_CONNECT, { dbName: "cc_db" })
  .then(() => {
    console.log("Connected to DB successfully");
    app.listen(4000, "localhost", () =>
      console.log("Listening to localhost:4000")
    );
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
