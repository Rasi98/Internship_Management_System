import express from 'express';
import {getCompany,addCompany,deleteCompany,findByCompanyId} from '../controllers/company.js'
const companyRouter=express.Router();

companyRouter.get('/',getCompany);
companyRouter.post('/addcompany',addCompany);
companyRouter.get('/:id',findByCompanyId)
companyRouter.delete('/delete/:id',deleteCompany)

export default companyRouter;

