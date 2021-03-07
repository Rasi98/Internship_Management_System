import companyModel from '../models/company.js'


export const getCompany=async(req,res)=>{
    try {
        const companyList=await companyModel.find();

        res.status(200).json(companyList);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const addCompany=async(req,res)=>{
    const companyData=req.body;

    const newCompany=new companyModel(companyData);
    try {
        await newCompany.save();

        res.status(201).json(newCompany);
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}