import express from 'express';
import {getCompany,addCompany} from '../controllers/company.js'
const companyRouter=express.Router();

companyRouter.get('/',getCompany);
companyRouter.post('/addcompany',addCompany);

export default companyRouter;