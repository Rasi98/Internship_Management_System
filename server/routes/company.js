import express from 'express';
import {getCompany,addCompany,deleteCompany,findCompany,companyUpdate,contactCompany} from '../controllers/company.js'
const companyRouter=express.Router();
import {companyValidator,companyValidationResults} from '../validators/companyValidator.js';


companyRouter.get('/',getCompany);
companyRouter.post('/addcompany',companyValidator,companyValidationResults,addCompany);
companyRouter.get('/:id',findCompany);
companyRouter.delete('/:id',deleteCompany);
companyRouter.post('/update/:id',companyValidator,companyValidationResults,companyUpdate);
companyRouter.post('/contactcompany/:id',contactCompany);

export default companyRouter;

