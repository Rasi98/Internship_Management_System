import mongoose from 'mongoose'

const Schema=mongoose.Schema;

const companySchema=new Schema({
    name:{type:String},
    email:{type:String},
    address:{type:String},
    phone:{type:String},
    vacancies:{type:Number}
});

const companyModel=mongoose.model('companyModel',companySchema);
export default companyModel;