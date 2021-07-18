import express from "express";
import {
  getita,
  findita,
  addita,
  deleteita,
  updateita,
  deleteall, getitaforstu,
} from "../../controllers/ita.js";
import {
  itaValidator,
  itaValidatorResult,
} from "../../validators/itaValidator.js";
const itaRouter = express.Router();

itaRouter.get("/", getita);
itaRouter.get("/:id", findita);
itaRouter.post("/addita", itaValidator, itaValidatorResult, addita);
itaRouter.delete("/:id", deleteita);
itaRouter.post("/update/:id", itaValidator, itaValidatorResult, updateita);
itaRouter.post("/deleteall", deleteall);
itaRouter.post("/getita",getitaforstu)

export default itaRouter;
