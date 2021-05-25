import express from "express";
import {
  getStudent,
  createstudent,
  deleteStudent,
  studentUpdate,
} from "../controllers/student.js";
const studentRouter = express.Router();

studentRouter.get("/", getStudent);
studentRouter.post("/addstudent", createstudent);
studentRouter.delete("/:id", deleteStudent);
studentRouter.post("/update/:id", studentUpdate);

export default studentRouter;
