import studentProfile from "../../models/studentprofile.js";
import Student from "../../models/student.js";

export const Addpersonaldetail = async (req, res) => {
  const profile = req.body;
  const action = profile.action;
  const stuId = profile.studentId;
  if (action === "save") {
    const newprofile = new studentProfile(profile);
    try {
      await newprofile.save();
      res.status(201).json({ result: "success" });
    } catch (error) {
      res.status(409).json(error);
    }
  } else if (action === "submit") {
    const newprofile = new studentProfile(profile);
    const student = await Student.findById(stuId);
    student.cv = "submit";
    student.save().then(() => {
      try {
        newprofile.save();
        res.status(201).json({ result: "success" });
      } catch (error) {
        res.status(409).json(error);
      }
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    await studentProfile.findOneAndUpdate(
      { studentId: req.body.studentId },
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        github: req.body.github,
        linkedin: req.body.linkedin,
        career: req.body.career,
        college: req.body.college,
        fromyear1: req.body.fromyear1,
        toyear1: req.body.toyear1,
        qualification1: req.body.qualification1,
        description1: req.body.description1,
        school: req.body.school,
        fromyear2: req.body.fromyear2,
        toyear2: req.body.toyear2,
        qualification2: req.body.qualification2,
        description2: req.body.description2,
        title1: req.body.title1,
        link1: req.body.link1,
        projectDescription1: req.body.projectDescription1,
        title2: req.body.title2,
        link2: req.body.link2,
        projectDescription2: req.body.projectDescription2,
        title3: req.body.title3,
        link3: req.body.link3,
        projectDescription3: req.body.projectDescription3,
        institute1: req.body.institute1,
        position1: req.body.position1,
        duration1: req.body.duration1,
        experienceDescription1: req.body.experienceDescription1,
        institute2: req.body.institute2,
        position2: req.body.position2,
        duration2: req.body.duration2,
        experienceDescription2: req.body.experienceDescription2,
        skill1: req.body.skill1,
        skill2: req.body.skill2,
        skill3: req.body.skill3,
        skill4: req.body.skill4,
        skill5: req.body.skill5,
        skill6: req.body.skill6,
        interest1: req.body.interest1,
        interest2: req.body.interest2,
        interest3: req.body.interest3,
        interest4: req.body.interest4,
        interest5: req.body.interest5,
        interest6: req.body.interest6,
        refname1: req.body.refname1,
        refpos1: req.body.refpos1,
        refemail1: req.body.refemail1,
        refphone1: req.body.refphone1,
        refname2: req.body.refname2,
        refpos2: req.body.refpos2,
        refemail2: req.body.refemail2,
        refphone2: req.body.refphone2,
      }
    );
    res.status(201).json({ result: "success" });
  } catch (e) {
    res.status(400).json({ result: e });
  }
};

export const Getpersonaldetail = async (req, res) => {
  try {
    const stu_Profile = await studentProfile.find();
    console.log(stu_Profile);
    res.status(200).json(stu_Profile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const findprofile = async (req, res) => {
  console.log("link", req.body.id);
  const profile = await studentProfile.find({ studentId: req.body.id });
  console.log("find", profile.length);
  if (profile.length !== 0) {
    res.status(200).json({ msg: profile });
    console.log(profile);
  } else if (profile.length === 0) {
    res.status(202).json({ msg: "no" });
  }
};
