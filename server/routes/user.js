import express from "express";
import { getUsers, createUsers } from "../controllers/user.js";
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/adduser", createUsers);

export default userRouter;
