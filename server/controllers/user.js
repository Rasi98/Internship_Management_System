import userModel from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const userList = await userModel.find();
    console.log(userList);
    res.status(200).json(userList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUsers = async (req, res) => {
  const userData = req.body;
  const newUser = new userModel(userData);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
