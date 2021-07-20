import express from "express";
import pdfgen from "../controllers/pdf.js";
const pdf=express.Router();

pdf.post("/pdfgen",pdfgen)

export default pdf;