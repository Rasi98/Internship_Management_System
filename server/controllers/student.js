import Student from "../models/student.js";

export const getStudent = async (req, res) => {
  try {
    const studentList = await Student.find();
    console.log(studentList);
    res.status(200).json(studentList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createstudent = async (req, res) => {
  const studentData = req.body;
  const newStudent = new Student(studentData);
  try {
    await newStudent.save();
    res.status(201).json("Success");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteStudent = (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => res.json("Student deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const findstudent = (req, res) => {
  Student.findById(req.params.id)
    .then((student) => res.json(student))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const studentUpdate = (req, res) => {
  Student.findById(req.params.id)
    .then((student) => {
      student.name = req.body.name;
      student.stuno = req.body.stuno;
      student.email = req.body.email;
      student.dob = req.body.dob;
      student.address = req.body.address;
      student.mobile = req.body.mobile;
      student.gender = req.body.gender;
      student.allocatedCompany = req.body.allocatedCompany;
      student.allocatedITAA = req.body.allocatedITAA;
      student.selectedCompany = req.body.selectedCompany;
      student.interviewCount = req.body.gender;

      student
        .save()
        .then(() => res.json("Student updated."))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
};
