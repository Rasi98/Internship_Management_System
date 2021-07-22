import express from "express";
const stu_profile_router = express.Router();
import {
  Addpersonaldetail,
  Getpersonaldetail,
  findprofile, updateProfile, Addphoto,
} from "../../controllers/studentController/profile.js";
import {
  studentProfileValidatorResult,
  studentProfileValidator,
} from "../../validators/studentProfileValidator.js";

stu_profile_router.post(
  "/addstudentprofile",
  studentProfileValidator,
  studentProfileValidatorResult,
  Addpersonaldetail
);
stu_profile_router.post("/updatestudentprofile",studentProfileValidator,studentProfileValidatorResult,updateProfile)
stu_profile_router.get("/", Getpersonaldetail);
stu_profile_router.post("/get", findprofile);
stu_profile_router.post("/addphoto",Addphoto)

export default stu_profile_router;
