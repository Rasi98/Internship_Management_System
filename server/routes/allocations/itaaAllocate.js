import express from "express";
import {allocateItaa, getAllocations} from "../../controllers/allocateitaa.js";
const itaaAllocate=express.Router();


itaaAllocate.post("/add",allocateItaa);
itaaAllocate.get("/:itaaId",getAllocations)
//itaaAllocate.post("/update",updateItaaAllocation)
//itaaAllocate.delete("/delete",deleteItaaAllocation)

export default itaaAllocate;
