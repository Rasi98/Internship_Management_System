import studentProfile from "../../models/studentprofile.js";

export const Addpersonaldetail = async (req, res) => {
  const profile = req.body;
  console.log(profile);
  const newprofile = new studentProfile(profile);
  try {
    await newprofile.save();
    res.status(201).json({ result: "success" });
  } catch (error) {
    res.status(409).json(error);
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

export const findprofile = (req, res) => {
  studentProfile
    .findOne({ email: req.params.email })
    .then((profile) => res.json(profile))
    .catch((err) => res.status(400).json("Error: " + err));
};
