import express from "express";
const stu_profile_router = express.Router();
import {
  Addpersonaldetail,
  Getpersonaldetail,
} from "../../controllers/studentController/profile.js";

stu_profile_router.post("/addstudentprofile", Addpersonaldetail);
stu_profile_router.get("/", Getpersonaldetail);

export default stu_profile_router;
