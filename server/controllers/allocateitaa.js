import AllocateITAA from "../models/allocatedItaa.js";
import Student from "../models/student.js";
import ITAA from "../models/itaa.js";

export const allocateItaa=async (req,res)=>{
    const existobj=await AllocateITAA.findOne({student:req.body.studentid,itaa:req.body.itaaid}).populate("itaa")
    console.log(existobj);
    if(existobj==null){
        const stu=await Student.findById(req.body.studentid)
        const itaa=await ITAA.findById(req.body.itaaid)
        const itaaname=itaa.name
        console.log(itaaname)
        console.log(stu)
        stu.allocatedITAA=itaaname
        stu.save()
            .then(()=>{
                const allocateobj = new AllocateITAA({
                    student: req.body.studentid,
                    itaa: req.body.itaaid,
                })
                try{
                    allocateobj.save()
                        .then(() => {
                            res.status(200).json({result:"allocated"});
                        })
                }
                catch (err){
                    res.status(404).json({message:err.message});

                }
            })
    }
    else{
        res.status(201).json({result:"Already allocated!"})
    }
}
export const getAllocations=(req,res)=>{
    AllocateITAA.find({itaa:req.params.itaaId}).populate("itaa").populate("student")
        .then((obj)=>{
            res.json(obj);
        })
        .catch((err)=>{
            res.json(err);
        })
}

export const deleteItaaAllocation=async (req,res)=>{
    const data=await AllocateITAA.findById(req.params.id).populate("student")
    const stu=await Student.findById(data.student._id)
    stu.allocatedITAA=""
    stu.save()
        .then(()=>{
            AllocateITAA.findByIdAndDelete(req.params.id)
                .then(()=>{
                    res.status(200).json({result:"deleted"});
                })
                .catch((err)=>{
                    res.status(400).json(err)
                })
        })

}

