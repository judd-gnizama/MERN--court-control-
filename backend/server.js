import express from "express";
import { echoRoute } from "./routes/echo.js";
import mongoose, { mongo } from "mongoose";
import { groupsRoutes } from "./routes/groupsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import cors from "cors";
const app = express();

// handle CORS policy

const corsOptions = {
  origin: "http://localhost:3001",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);
app.use(corsMiddleware);

app.use(express.json());
app.use("/api/echo", echoRoute);
app.use("/api/groups", groupsRoutes);
app.use("/api/users", usersRoutes);

mongoose
  .connect("mongodb://localhost:27017/", { dbName: "cc_db" })
  .then(() => {
    console.log("Connected to DB successfully");
    app.listen(3000, "localhost", () =>
      console.log("Listening to localhost:3000")
    );
  })
  .catch((err) => console.log(err));
