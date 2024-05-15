import express from "express";
import { echoRoute } from "./routes/echo.js";
import mongoose, { mongo } from "mongoose";
import { groupsRoutes } from "./routes/groupsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/echo", echoRoute);
app.use("/api/groups", groupsRoutes);
app.use("/api/users", usersRoutes);

mongoose
  .connect("mongodb://localhost:27017/cc_db")
  .then(() => {
    console.log("Connected to DB successfully");
    app.listen(4000, "localhost", () =>
      console.log("Listening to localhost:4000")
    );
  })
  .catch((err) => console.log(err));
