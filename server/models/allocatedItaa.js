import mongoose from "mongoose";
const Schema=mongoose.Schema;

const AllocateItaa=new Schema({
    student:{type:mongoose.Schema.Types.objectId,ref:"student"},
    itaa:{type:mongoose.Schema.Types.objectId,ref:"itaa"},
})

const AllocateITAA=mongoose.model("allocateitaa",AllocateItaa);
export default AllocateITAA;