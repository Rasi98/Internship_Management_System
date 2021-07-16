import Allocate from "../models/allocated.js"
import Student from "../models/student.js";

export const allocateCompany=async (req,res)=>{
    const existobj=await Allocate.findOne({student:req.body.studentid,company:req.body.companyid})
    console.log(existobj);
    if(existobj==null){
            const allocateobj = new Allocate({
                student: req.body.studentid,
                company: req.body.companyid,
            })
            try{
               await allocateobj.save()
                    .then(() => {
                        res.status(200).json({result:"allocated"});
                    })
            }
        catch (err){
            res.status(404).json({message:err.message});

        }
    }
    else {
        res.status(201).json({result:"Already allocated!"})
    }


}

export const getAllocate=(req,res)=>{
    console.log('Req', req.params.stuId)
    Allocate.find({student:req.params.stuId}).populate("company").populate("student")
        .then((obj)=>{
            res.json(obj);
        })
        .catch((err)=>{
            res.json(err);
        })
}

export const setStatus=async(req,res)=>{
    const allocateobj=await Allocate.findOne({_id:req.body.id})
        if(req.body.status==="selected"){
           const selectedstu=await Allocate.findById(req.body.id).populate("student").populate("company")
            const stuId=selectedstu.student._id
            const selectedcom=selectedstu.company.name
            const student=await Student.findById(stuId)
            student.selectedCompany=selectedcom;
           allocateobj.status = req.body.status
            await allocateobj.save()
           await student.save();
           res.json("status updated!")
        }
            allocateobj.status=req.body.status;
            await allocateobj.save();
            res.json("status updated!")

}

export const deletecompany=(req,res)=>{
    console.log(req.params.id)
    Allocate.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.status(200).json({result:"deleted"});
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
}