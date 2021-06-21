import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stuno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  allocatedITAA: {
    type: String,
  },
  selectedCompany: {
    type: String,
  },
  interviewCount: {
    type: String,
  },
});

const Student = mongoose.model("student", studentSchema);
export default Student;
