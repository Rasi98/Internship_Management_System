import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itaaSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    required:true,
  },
  name: {
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
});

const ITAA = mongoose.model("itaa", itaaSchema);
export default ITAA;
