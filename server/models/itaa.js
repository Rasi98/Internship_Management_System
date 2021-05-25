import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itaaSchema = new Schema({
  username: {
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
  mobile: {
    type: String,
    required: true,
  },
});

const ITAA = mongoose.model("ITAA", itaaSchema);
export default ITAA;
