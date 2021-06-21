import mongoose from "mongoose";

const Schema = mongoose.Schema;

const hrmSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  department: {
    type: String,
  },
  status: {
    type: String,
  },
});

const HRM = mongoose.model("hrm", hrmSchema);
export default HRM;
