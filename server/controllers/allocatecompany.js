import Allocate from "../models/allocated.js"

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
                        res.json("allocated");
                    })
            }
        catch (err){
            res.json(err);

        }
    }
    else {
        res.status(201).json("Already allocated!")
    }


}

export const getAllocate=(req,res)=>{
    console.log('Req', req.params.studentid)
    Allocate.find({student:req.params.studentid}).populate("company").populate("student")
        .then((obj)=>{
            res.json(obj);
        })
        .catch((err)=>{
            res.json(err);
        })
}

export const setStatus=async(req,res)=>{
    const allocateobj=await Allocate.findOne({student:req.body.studentid,company:req.body.companyid})
        if(req.body.status==="selected"){
           // const otherobj=await allocateobj.find({student: req.body.studentid, company: {$ne: req.body.companyid}})
            //res.json(otherobj);
        }
            allocateobj.status=req.body.status;
            await allocateobj.save();
            res.json("status updated!")

}

export const deletecompany=(req,res)=>{
    Allocate.findOneAndRemove({student:req.body.studentid,company:req.body.companyid})
        .then(()=>{
            res.json("deleted");
        })
        .catch((err)=>{
            res.json(err)
        })
}