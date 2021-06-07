import express from "express";
const loginRouter = express.Router();
import Login from "../controllers/login.js";

loginRouter.post("/login", Login);

export default loginRouter;
