import mongoose from "mongoose";
const Schema=mongoose.Schema;

const AllocateItaa=new Schema({
    student:{type:mongoose.Schema.Types.ObjectId,ref:"student"},
    itaa:{type:mongoose.Schema.Types.ObjectId,ref:"itaa"},
})

const AllocateITAA=mongoose.model("allocateitaa",AllocateItaa);
export default AllocateITAA;