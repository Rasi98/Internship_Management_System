import express from "express";
import {
  gethrm,
  findhrm,
  addhrm,
  deletehrm,
  updatehrm,
  contacthrm,
  setstatus,
} from "../../controllers/hrm.js";
const hrmRouter = express.Router();

hrmRouter.get("/", gethrm);
hrmRouter.get("/:id", findhrm);
hrmRouter.post("/addhrm", addhrm);
hrmRouter.delete("/:id", deletehrm);
hrmRouter.post("/update/:id", updatehrm);
hrmRouter.post("/contacthrm/:id", contacthrm);
hrmRouter.get("/contacted/:id", setstatus);

export default hrmRouter;
