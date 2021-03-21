import express from 'express';
import {getCompany,addCompany,deleteCompany,findCompany,companyUpdate} from '../controllers/company.js'
const companyRouter=express.Router();

companyRouter.get('/',getCompany);
companyRouter.post('/addcompany',addCompany);
companyRouter.get('/:id',findCompany);
companyRouter.delete('/:id',deleteCompany);
companyRouter.post('/update/:id',companyUpdate);

export default companyRouter;

