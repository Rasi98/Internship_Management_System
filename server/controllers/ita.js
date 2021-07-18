import ITA from "../models/ita.js";
import {sendMail} from "../controllers/sendcredentials.js";

export const getita = async (req, res) => {
  try {
    const itaList = await ITA.find();
    console.log(itaList);
    res.status(200).json(itaList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addita = async (req, res) => {
  const itaData = req.body;
  const newita = new ITA(itaData);
  try {
          await newita.save()
              .then(()=>{
                  sendMail(itaData.email,itaData.username,itaData.password);
                  res.status(201).json({ result: "success" });
              })
  } catch (error) {
    res.status(409).json(error);
  }
};
export const deleteall=(req,res)=>{
    ITA.db.collection("itas").drop()
        .then(()=>res.status(201).json("success"))
        .catch((err)=>res.status(400).json("Error:"+err))
}


export const findita = (req, res) => {
  ITA.findById(req.params.id)
    .then((ita) => res.json(ita))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteita = (req, res) => {
  ITA.findByIdAndDelete(req.params.id)
    .then(() => res.json("ITA deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateita = (req, res) => {
  ITA.findById(req.params.id)
    .then((ita) => {
        if(ita.username!==req.body.username || ita.password!==req.body.password){
            sendMail(req.body.email,req.body.username,req.body.password);
        }
      ita.username = req.body.username;
      ita.password = req.body.password;
      ita.role="ita";
      ita.name = req.body.name;
      ita.designation=req.body.designation;
      ita.email = req.body.email;
      ita.phone = req.body.phone;
      ita.company = req.body.company;
      ita.stuname=req.body.stuname;
      ita.stuid=req.body.stuid;
      ita
        .save()
        .then(() => res.json({ result: "updated" }))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
};

export const getitaforstu=async (req,res)=>{
    console.log("stuid",req.body.stuid)
    const ita=await ITA.find({stuid:req.body.stuid})
    console.log(ita);
    if(ita.length===0){
        res.json({result:"N/A"})
    }
    else{
        res.json({result:ita})
    }

}
