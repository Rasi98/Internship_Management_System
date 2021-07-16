import express from "express";
import {allocateItaa, deleteItaaAllocation, getAllocations} from "../../controllers/allocateitaa.js";
const itaaAllocate=express.Router();


itaaAllocate.post("/add",allocateItaa);
itaaAllocate.get("/:itaaId",getAllocations)
itaaAllocate.delete("/delete/:id",deleteItaaAllocation)

export default itaaAllocate;
