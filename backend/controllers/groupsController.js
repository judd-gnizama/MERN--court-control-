import mongoose from "mongoose";
import { GroupModel } from "../models/groupModel.js";
import { UserModel } from "../models/userModel.js";

// ====================== GET ALL GROUPS ========================
const getGroups = async (req, res) => {
  try {
    // find all groups
    const groups = await GroupModel.find().sort({ createdAt: "desc" });
    res.status(200).json({ groups });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ====================== GET ALL GROUPS FROM USER ========================
const getUserGroups = async (req, res) => {
  // Grab authenticated user from request body
  const user = await UserModel.findById(req.user._id);

  try {
    const userGroups = await GroupModel.find({ userId: user._id }).sort({
      createdAt: "desc",
    });
    res.status(200).json({ userGroups });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ====================== CREATE NEW GROUP ========================
const addGroup = async (req, res) => {
  const { name, announcements, events, players } = req.body;

  // Check if name is not empty
  if (!name) {
    return res.status(400).json({ error: "Group name is required" });
  }
  // Check if group already exists
  const alreadyExist = await GroupModel.findOne({ name });
  if (alreadyExist) {
    return res.status(400).json({ error: "Group name already taken" });
  }

  // Grab authenticated user from request body
  const user = await UserModel.findById(req.user._id);

  try {
    const group = await GroupModel.create({
      userId: req.user._id,
      name,
      announcements,
      events,
      players,
    });
    // return success
    res.status(200).json({ success: `${name} added`, group });
  } catch (error) {
    // return a general error
    res.status(500).json({ error: error.message });
  }
};

// ====================== DELETE GROUP ========================
const deleteGroup = async (req, res) => {
  // check the id if valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  // check if group exists
  const group = await GroupModel.findById(req.params.id);
  if (!group) {
    return res.status(400).json({ error: "Group not found" });
  }

  // Check if the user is the owner of the group
  const user = await UserModel.findById(req.user._id);
  if (!group.userId.equals(user._id)) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    await group.deleteOne();
    res.status(200).json({ success: "Group was deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ====================== UPDATE GROUP ========================
const updateGroup = async (req, res) => {
  // grab request data
  const { name, announcements, events, players, description } = req.body; // updateOption tells which to update

  let newGroup = {};

  // make sure at least one data is present
  if (!(name || announcements || events || players)) {
    return res.status(400).json({ error: "At least one param is required" });
  }

  // check the id if valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  // check if group exists
  const group = await GroupModel.findById(req.params.id);
  if (!group) {
    return res.status(400).json({ error: "Group not found" });
  }

  // Check if the user is the owner of the group
  const user = await UserModel.findById(req.user._id);
  if (!group.userId.equals(user._id)) {
    return res.status(401).json({ error: "Not authorized" });
  }

  if (name !== null) {
    newGroup.name = name;
  }
  if (announcements !== null) {
    newGroup.announcements = announcements;
  }
  if (events !== null) {
    newGroup.events = events;
  }
  if (players !== null) {
    newGroup.players = players;
  }
  if (description !== null) {
    newGroup.description = description;
  }

  if (name) {
    // check if new name is the old one
    if (group.name === name) {
      return res.status(400).json({ error: "Group name is the same" });
    }
    // check if new name is already taken
    const alreadyExist = await GroupModel.findOne({ name });
    if (alreadyExist) {
      return res.status(400).json({ error: "Group name already taken" });
    }
  }

  try {
    await group.updateOne(newGroup);
    res.status(200).json({ success: "GroupName was updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getGroups, getUserGroups, addGroup, deleteGroup, updateGroup };
