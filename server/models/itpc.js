import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itpcSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
  role:{
    type:String,
    required:true
  }
});

const ITPC = mongoose.model("itpc", itpcSchema);
export default ITPC;
