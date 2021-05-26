import express from "express";
import {
  getitpc,
  additpc,
  deleteitpc,
  updateitpc,
} from "../controllers/itpc.js";
const itpcRouter = express.Router();

itpcRouter.get("/", getitpc);
itpcRouter.post("/additpc", additpc);
itpcRouter.delete("/:id", deleteitpc);
itpcRouter.post("/update/:id", updateitpc);

export default itpcRouter;
