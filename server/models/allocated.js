import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Allocate = new Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "student" },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
  status:{type:String, default:"allocate"}
});

const Allocatecompany = mongoose.model("allocation", Allocate);
export default Allocatecompany;
