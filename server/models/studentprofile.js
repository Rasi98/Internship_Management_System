import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentprofileSchema = new Schema({
  // Personal Profile Details...
  comment:{
    type:[{
      type:String
    }]
  },
  newlength:{
    type:Number,
    default:0
  },
  pastlength:{
    type:Number,
    default:0
  },
  studentId:{type:String,required:true},
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, requried: true },
  github: { type: String },
  linkedin: { type: String },
  career: { type: String, required: true },
  // Education Information
  college: { type: String },
  fromyear1: { type: String },
  toyear1: { type: String },
  qualification1: { type: String },
  description1: { type: String },
  school: { type: String },
  fromyear2: { type: String },
  toyear2: { type: String },
  qualification2: { type: String },
  description2: { type: String },
  // Project Information...
  title1: { type: String },
  link1: { type: String },
  projectDescription1: { type: String },
  title2: { type: String },
  link2: { type: String },
  projectDescription2: { type: String },
  title3: { type: String },
  link3: { type: String },
  projectDescription3: { type: String },
  // Experience Information
  institute1: { type: String },
  position1: { type: String },
  duration1: { type: String },
  experienceDescription1: { type: String },
  institute2: { type: String },
  position2: { type: String },
  duration2: { type: String },
  experienceDescription2: { type: String },
  // Extra Information
  skill1: { type: String },
  skill2: { type: String },
  skill3: { type: String },
  skill4: { type: String },
  skill5: { type: String },
  skill6: { type: String },
  interest1: { type: String },
  interest2: { type: String },
  interest3: { type: String },
  interest4: { type: String },
  interest5: { type: String },
  interest6: { type: String },
  //Referee
  refname1:{type:String},
  refpos1:{type:String},
  refemail1:{type:String},
  refphone1:{type:String},
  refname2:{type:String},
  refpos2:{type:String},
  refemail2:{type:String},
  refphone2:{type:String},
});

const StudentProfile = mongoose.model("studentProfile", studentprofileSchema);
export default StudentProfile;
