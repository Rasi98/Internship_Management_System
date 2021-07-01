import mongoose from "mongoose";

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: { type: String },
  email: { type: String },
  address: { type: String },
  type:{type:String},
  phone: { type: String },
});

const companyModel = mongoose.model("company", companySchema);
export default companyModel;
