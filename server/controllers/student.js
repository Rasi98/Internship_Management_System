import Student from "../models/student.js";
import StudentProfile from "../models/studentprofile.js";
import Allocatecompany from "../models/allocated.js";
import AllocatedITA from "../models/allocatedITA.js";
import generator from "generate-password";
import {
  sendMail,
  Staffinteviewemail,
} from "../controllers/sendcredentials.js";

export const getStudent = async (req, res) => {
  try {
    const studentList = await Student.find();
    res.status(200).json(studentList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const Addinterview = async (req, res) => {
  const Id = req.body.stuid;
  console.log(req.body);
  const student = await Student.findById({ _id: Id });
  console.log(student);
  student.thirdyrexit = req.body.thirdyearexit;
  student.specialization = req.body.specializearea;
  student.interest = req.body.interest;
  student.gpa = req.body.gpa;
  student.interview = "submit";

  try {
    await student.save();
    res.json({ result: "submit" });
  } catch (e) {
    console.log(e);
  }
};

export const createstudent = async (req, res) => {
  const studentData = req.body;
  const newStudent = new Student(studentData);
  try {
    await newStudent.save().then(() => {
      sendMail(studentData.email, studentData.username, studentData.password);
      res.status(201).json({ result: "success" });
    });
  } catch (err) {
    res.status(409).json(err);
  }
};

export const createstudentarray = async (req, res) => {
  const studentlist = req.body;
  await studentlist.forEach((user) => {
    const newuser = {
      name: user.name,
      stuno: user.stuno,
      email: user.email,
      dob: user.dob,
      address: user.address,
      mobile: user.mobile,
      gender: user.gender,
      username: usernameGen(),
      password: passwordGen(),
      role: "student",
    };
    let newu = new Student(newuser);
    newu.save()
      sendMail(newuser.email, newuser.username, newuser.password);
  });
  res.status(201).json({ result: "success" });
};

function passwordGen() {
  const genpassword = generator.generate({
    length: 10,
    numbers: true,
    symbols: true,
  });
  return genpassword;
}
function usernameGen() {
  const genusername = generator.generate({
    length: 10,
  });
  return genusername;
}

export const deleteStudent = (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => res.json("Student deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
  StudentProfile.findOne({studentId:req.params.id})
      .then((res)=>{
        console.log("del",res)
        res.delete();
      })
  AllocatedITA.findOne({student:req.params.id})
      .then((res)=>{
        console.log("del",res)
        res.delete();
      })
};

export const deleteall = (req, res) => {
  Student.db
    .collection("students")
    .drop()
    .then(() => res.status(201).json("success"))
    .catch((err) => res.status(400).json("Error:" + err));
  Allocatecompany.db.collection("allocations").drop();
  StudentProfile.db.collection("studentprofiles").drop();
  AllocatedITA.db.collection("student").drop();


};

export const findstudent = (req, res) => {
  Student.findById(req.params.id)
    .then((student) => res.json(student))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const studentUpdate = (req, res) => {
  Student.findById(req.params.id)
    .then((student) => {
      if (
        student.username !== req.body.username ||
        student.password !== req.body.password
      ) {
        sendMail(req.body.email, req.body.username, req.body.password);
      }
      student.name = req.body.name;
      student.stuno = req.body.stuno;
      student.email = req.body.email;
      student.dob = req.body.dob;
      student.address = req.body.address;
      student.mobile = req.body.mobile;
      student.gender = req.body.gender;
      student.username = req.body.username;
      student.password = req.body.password;
      student.role = "student";

      student
        .save()
        .then(() => res.json({ result: "updated" }))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
};

export const staffinterviewupdate = (req, res) => {
  const updatedList = req.body;
  console.log(updatedList);
  const successmsg =
    "Congratulations...!!!, You have successfully completed staff interview.";
  updatedList.forEach(async (item) => {
    await Student.findOneAndUpdate(
      { _id: item.id },
      { staffInterview: item.interview, staffintmarks: item.staffintmarks },
      { new: true },
      (err, docs) => {
        if (err) console.log(err);
        else {
          console.log(docs);
        }
      }
    );
    if (item.interview === "Completed") {
      const stu = await Student.findById(item.id);
      if (stu.staffintemail === false) {
        Staffinteviewemail(item.email, successmsg);
        stu.staffintemail = true;
        await stu.save();
      }
    }
  });
  res.status(200).json("updated");
};

export const CVStatusUpdate = async (req, res) => {
  console.log(req.body.id);
  await Student.findByIdAndUpdate({ _id: req.body.id }, { cv: "submit" });
  res.json({ result: "submit" });
};

export const Addcomment = async (req, res) => {
  const com = req.body.comment;
  await StudentProfile.findOneAndUpdate(
    { studentId: req.body.id },
    { $inc: { newlength: 1 }, $push: { comment: com } }
  );
  res.json({ result: "send" });
};
export const ReadComment = async (req, res) => {
  console.log(req.body);
  await StudentProfile.findOneAndUpdate(
      { studentId: req.body.id },
      {pastlength:req.body.newlength }
  );
  res.json({ result: "send" });
};
