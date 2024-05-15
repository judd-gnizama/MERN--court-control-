import express from "express";
import { loginUser, registerUser } from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/", registerUser); // register user route
router.post("/login", loginUser); // login user route

export { router as usersRoutes };
