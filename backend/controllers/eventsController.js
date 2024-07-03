import mongoose from "mongoose";
import { GroupModel } from "../models/groupModel.js";
import { UserModel } from "../models/userModel.js";

// ====================== GET ALL EVENTS FROM GROUP ========================
const getGroupEvents = async (req, res) => {
  const { groupId } = req.body;

  if (!groupId) {
    res.status(400).json({ error: "Group Id needed" });
  }

  // check the id if valid type
  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  // check if user is authorized using authenticated attached to body
  const user = await UserModel.findById(req.user._id);
  try {
    const group = await GroupModel.findOne({ userId: user._id, _id: groupId });
    res.status(200).json({ events: group.events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getGroupEvents };
