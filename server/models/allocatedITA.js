import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AllocateITA = new Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "student" },
    ita: { type: mongoose.Schema.Types.ObjectId, ref: "ita" },
});

const AllocateITA = mongoose.model("allocateITA", AllocateITA);
export default AllocateITA;
