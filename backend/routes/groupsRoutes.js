import express from "express";
import {
  addGroup,
  deleteGroup,
  getGroups,
  getUserGroups,
  updateGroup,
} from "../controllers/groupsController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getGroups); // get all groups
router.get("/user", auth, getUserGroups); // get all groups
router.post("/", auth, addGroup); // add new group
router.delete("/:id", auth, deleteGroup); // delete a group
router.put("/:id", auth, updateGroup); // update groupname

export { router as groupsRoutes };
