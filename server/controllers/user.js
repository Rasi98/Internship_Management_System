import user from "../models/user.js";
import bcrypt from "bcrypt";

async function hashPassword(pass) {
  try {
    let password = pass;
    const round = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, round);
    return hashedPassword;
  } catch (err) {
    console.log(err);
  }
}

export const getUsers = async (req, res) => {
  try {
    const userList = await user.find();
    console.log(userList);
    res.status(200).json(userList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUsers = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPass = await hashPassword(password);
  const newUser = new user({
    username: username,
    password: hashedPass,
    role: role,
  });
  try {
    await newUser.save();
    res.status(201).json({result:"success"});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
