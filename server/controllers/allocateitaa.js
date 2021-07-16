import AllocateITAA from "../models/allocatedItaa.js";

export const allocateItaa=async (req,res)=>{
    const existobj=await AllocateITAA.findOne({student:req.body.studentid,itaa:req.body.itaaid})
    console.log(existobj);
    if(existobj==null){
        const allocateobj = new AllocateITAA({
            student: req.body.studentid,
            itaa: req.body.itaaid,
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
    else{
        res.status(201).json({result:"Already allocated!"})
    }
}
export const getAllocations=(req,res)=>{
    console.log('Req', req.params.itaaId)
    AllocateITAA.find({itaa:req.params.itaaId}).populate("itaa").populate("student")
        .then((obj)=>{
            res.json(obj);
        })
        .catch((err)=>{
            res.json(err);
        })
}

