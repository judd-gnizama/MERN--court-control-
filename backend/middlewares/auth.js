import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";

const auth = async (req, res, next) => {
  // check if request headers contains the authorization
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token not found" });
  }
  // Grab the token from headers
  const token = authorization.split(" ")[1];

  try {
    // Decode and extract the user
    const { id } = jwt.verify(token, process.env.SECRET);
    // Save the user in request
    req.user = await UserModel.findById(id).select("_id");
    next(); // so that it continues
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default auth;
