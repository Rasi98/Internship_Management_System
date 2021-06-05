import studentProfile from "../../models/studentprofile.js";

export const Addpersonaldetail = async (req, res) => {
  const profile = req.body;
  console.log(profile);
  const newprofile = new studentProfile(profile);
  try {
    await newprofile.save();
    res.status(201).json("Success");
  } catch (error) {
    res.status(409).json({ message: error.message });
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
