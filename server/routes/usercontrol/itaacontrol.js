import express from "express";
import {
  getitaa,
  finditaa,
  additaa,
  deleteitaa,
  updateitaa,
  contactitaa,
    deleteall
} from "../../controllers/itaa.js";
import {
  itaaValidator,
  itaaValidatorResult,
} from "../../validators/itaaValidator.js";
const itaaRouter = express.Router();

itaaRouter.get("/", getitaa);
itaaRouter.get("/:id", finditaa);
itaaRouter.post("/additaa", itaaValidator, itaaValidatorResult, additaa);
itaaRouter.delete("/:id", deleteitaa);
itaaRouter.post("/update/:id", itaaValidator, itaaValidatorResult, updateitaa);
itaaRouter.post("/contactitaa/",contactitaa);
itaaRouter.post("/deleteall",deleteall);

export default itaaRouter;
