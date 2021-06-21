import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Allocate = new Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "companyModel" },
});

const Allocate = mongoose.model("allocation", Allocate);
export default Allocate;
