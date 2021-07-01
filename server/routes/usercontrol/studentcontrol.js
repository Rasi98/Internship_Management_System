import express from "express";
import {
  getStudent,
  createstudent,
  deleteStudent,
  studentUpdate,
  findstudent,
  createstudentarray,
  deleteall,
} from "../../controllers/student.js";
import {
  studentValidator,
  studentValidatorResult,
} from "../../validators/studentValidator.js";
import {allocateItaa} from "../../controllers/allocateitaa.js";
const studentRouter = express.Router();

studentRouter.get("/", getStudent);
studentRouter.get("/:id", findstudent);
studentRouter.post(
  "/addstudent",
  studentValidator,
  studentValidatorResult,
  createstudent
);
studentRouter.post("/addstudentarray", createstudentarray);
studentRouter.delete("/:id", deleteStudent);
studentRouter.post(
  "/update/:id",
  studentValidator,
  studentValidatorResult,
  studentUpdate
);
studentRouter.post("/deleteall", deleteall);
studentRouter.post("/allocateitaa",allocateItaa)

export default studentRouter;
