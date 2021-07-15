import express from "express";
import {allocateCompany,getAllocate,setStatus,deletecompany} from "../../controllers/allocatecompany.js";
const companyAllocate=express.Router();

//companyAllocate.get("/",getAllAllocation);
companyAllocate.post("/add",allocateCompany);
companyAllocate.get("/:stuId",getAllocate)
companyAllocate.post("/status",setStatus);
companyAllocate.delete("/deletecompany/:id",deletecompany);

export  default companyAllocate;