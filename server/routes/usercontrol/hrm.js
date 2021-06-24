import express from "express";
import {
  gethrm,
  findhrm,
  addhrm,
  deletehrm,
  updatehrm,
  contacthrm,
  setstatus,
    deleteall
} from "../../controllers/hrm.js";
import {
  hrmValidatorResult,
  hrmValidator,
} from "../../validators/hrmaddvalidator.js";
const hrmRouter = express.Router();

hrmRouter.get("/", gethrm);
hrmRouter.get("/:id", findhrm);
hrmRouter.post("/addhrm", hrmValidator, hrmValidatorResult, addhrm);
hrmRouter.delete("/:id", deletehrm);
hrmRouter.post("/update/:id", hrmValidator, hrmValidatorResult, updatehrm);
hrmRouter.post("/contacthrm/:id", contacthrm);
hrmRouter.get("/contacted/:id", setstatus);
hrmRouter.post("/deleteall",deleteall);

export default hrmRouter;
