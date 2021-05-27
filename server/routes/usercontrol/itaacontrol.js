import express from "express";
import {
  getitaa,
  finditaa,
  additaa,
  deleteitaa,
  updateitaa,
} from "../../controllers/itaa.js";
const itaaRouter = express.Router();

itaaRouter.get("/", getitaa);
itaaRouter.get("/:id", finditaa);
itaaRouter.post("/additaa", additaa);
itaaRouter.delete("/:id", deleteitaa);
itaaRouter.post("/update/:id", updateitaa);

export default itaaRouter;
