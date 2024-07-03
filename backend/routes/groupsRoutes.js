import express from "express";
import {
  addGroup,
  deleteGroup,
  getGroups,
  updateGroup,
} from "../controllers/groupsController.js";
import auth from "../middlewares/auth.js";
import { getUserGroups } from "../controllers/usersControllers.js";
import { getGroupEvents } from "../controllers/eventsController.js";

const router = express.Router();

router.get("/", getGroups); // get all groups
router.get("/user", auth, getUserGroups); // get all groups of user
router.post("/", auth, addGroup); // add new group
router.delete("/:id", auth, deleteGroup); // delete a group
router.put("/:id", auth, updateGroup); // update groupname

router.get("/events", auth, getGroupEvents); // get all events of group

export { router as groupsRoutes };
