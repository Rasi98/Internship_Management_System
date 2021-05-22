import express from "express";
const loginRouter = express.Router();
import adminLogin from "../controllers/login.js";

loginRouter.post("/login", adminLogin);

export default loginRouter;
