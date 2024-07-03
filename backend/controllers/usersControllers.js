import { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import "dotenv/config.js";
import jwt from "jsonwebtoken";
import { GroupModel } from "../models/groupModel.js";
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
// ====================== CREATE JWT TOKEN ========================
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" });
};

// ====================== REGISTER USER ========================
const registerUser = async (req, res) => {
  // Grab data from body
  const { email, username, password } = req.body;

  // Check if all are provided
  if (!email || !username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if email and username already exists
  const alreadyExistEmail = await UserModel.findOne({ email });
  if (alreadyExistEmail) {
    return res.status(400).json({ error: "Email already taken" });
  }
  const alreadyExistUsername = await UserModel.findOne({ username });
  if (alreadyExistUsername) {
    return res.status(400).json({ error: "Username already taken" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);

  try {
    // Register User
    const user = await UserModel.create({ email, username, password: hashed });

    // Generate session Token
    const token = createToken(user._id);

    // Send response
    res
      .status(200)
      .json({ success: "User Registered", email, token, username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ====================== LOGIN USER ========================
const loginUser = async (req, res) => {
  // Grab data from body
  const { email, password } = req.body;

  // Check if all are provided
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if email exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Incorrect Email" });
  }

  // Check password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Incorrect Password" });
  }

  try {
    // Generate session Token
    const token = createToken(user._id);
    const username = user.username;

    res
      .status(200)
      .json({ success: "Successfully Logged In", email, token, username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getUserGroups, registerUser, loginUser };
