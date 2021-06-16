import express from "express";
import {
  getitpc,
  additpc,
  deleteitpc,
  updateitpc,
  finditpc,
} from "../../controllers/itpc.js";
import {
  itpcaddValidator,
  itpcaddValidatorResult,
} from "../../validators/itpcaddValidator.js";
const itpcRouter = express.Router();

itpcRouter.get("/", getitpc);
itpcRouter.get("/:id", finditpc);
itpcRouter.post("/additpc", itpcaddValidator, itpcaddValidatorResult, additpc);
itpcRouter.delete("/:id", deleteitpc);
itpcRouter.post(
  "/update/:id",
  itpcaddValidator,
  itpcaddValidatorResult,
  updateitpc
);

export default itpcRouter;
