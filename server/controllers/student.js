import Student from "../models/student.js"
import Allocatecompany from "../models/allocated.js"
import generator from "generate-password";
import {sendMail,Staffinteviewemail} from "../controllers/sendcredentials.js";

export const getStudent = async (req, res) => {
  try {
    const studentList = await Student.find();
    res.status(200).json(studentList);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createstudent = async (req, res) => {
  const studentData = req.body;
  const newStudent = new Student(studentData);
  try {
    await newStudent.save()
        .then(()=>{
            sendMail(studentData.email,studentData.username,studentData.password);
            res.status(201).json({ result: "success" });
        })
  } catch (err) {
    res.status(409).json(err);
  }
};

export const createstudentarray = async (req, res) => {
  const studentlist = req.body;
  console.log(studentlist);
  studentlist.forEach(async (user)=> {
     const newuser =
          {
              name: user.name,
              stuno: user.stuno,
              email: user.email,
              dob: user.dob,
              address: user.address,
              mobile: user.mobile,
              gender: user.gender,
              username: usernameGen(),
              password: passwordGen(),
              role:"student",
          }
        var newu=new Student(newuser);
      console.log(newu);
        newu.save()
          .then(() => {
              sendMail(newuser.email,newuser.username,newuser.password);
          })
  })
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
};

export const deleteall = (req, res) => {
  Student.db
    .collection("students")
    .drop()
    .then(() => res.status(201).json("success"))
    .catch((err) => res.status(400).json("Error:" + err));
  Allocatecompany.db.collection("allocations")
      .drop()
};

export const findstudent = (req, res) => {
  Student.findById(req.params.id)
    .then((student) => res.json(student))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const studentUpdate = (req, res) => {
  Student.findById(req.params.id)
    .then((student) => {
        if(student.username!==req.body.username || student.password!==req.body.password){
            sendMail(req.body.email,req.body.username,req.body.password);
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
      student.role="student";

      student
        .save()
        .then(() => res.json({ result: "updated" }))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
};

export const staffinterviewupdate=(req,res)=>{
    const updatedList=req.body;
    console.log(updatedList)
    const successmsg="Congratulations...!!!, You have successfully completed staff interview."
   updatedList.forEach(async(item)=>{
      await Student.findOneAndUpdate({_id: item.id},{staffInterview:item.interview,staffintmarks:item.staffintmarks},{new:true},(err,docs)=>{
          if(err) console.log(err)
          else {
              console.log(docs)

          }
      })
       if(item.interview==="Completed"){
           const stu=await Student.findById(item.id)
           if(stu.staffintemail===false){
               Staffinteviewemail(item.email,successmsg);
               stu.staffintemail=true
               await stu.save();
           }
       }
   })
    res.status(200).json("updated")
}