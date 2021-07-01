import Student from "../models/student.js"

export const allocateItaa=async (req,res)=>{
   await Student.findByIdAndUpdate({_id:req.body.studentId},{allocatedITAA: req.body.itaaname},
        function(err, result )
        {
            if (err) {
                res.json(err);
            } else {
                res.json({result:"allocated"});
            }
        }
        )
}