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
  username: {
    type: String,

  },
  password: {
    type: String,

  },
  role:{
    type:String,
    required:true,
  },
  allocatedITAA: {
    type: String,
    default:"",
  },
  selectedCompany: {
    type: String,
    default:"",
  },
  interviewCount: {
    type: Number,
    default:0,
  },
  staffInterview:{
    type:String,
    default:"Pending",
  },
  staffintemail:{
    type:Boolean,
    default:false
  },
  staffintmarks:{
    type:String,
    default:"Pending",
  },
  cv:{
    type:String,
    default:"Pending"
  },
  thirdyrexit:{
    type:String,
    default:"Pending"
  },
  specialization:{
    type:String,
    default:"Pending"
  },
  interest:{
    type:[{
      type:String
    }]
  },
  interview:{
    type:String,
    default:"Pending"
  },
  gpa:{
    type:String,
    default:''
  }
});

const Student = mongoose.model("student", studentSchema);
export default Student;
