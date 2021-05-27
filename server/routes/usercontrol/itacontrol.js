import express from "express";
import {
  getita,
  findita,
  addita,
  deleteita,
  updateita,
} from "../../controllers/ita.js";
const itaRouter = express.Router();

itaRouter.get("/", getita);
itaRouter.get("/:id", findita);
itaRouter.post("/addita", addita);
itaRouter.delete("/:id", deleteita);
itaRouter.post("/update/:id", updateita);

export default itaRouter;
