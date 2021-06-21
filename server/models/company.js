import mongoose from "mongoose";

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: { type: String },
  email: { type: String },
  address: { type: String },
  phone: { type: String },
  status: { type: String },
});

const companyModel = mongoose.model("company", companySchema);
export default companyModel;
