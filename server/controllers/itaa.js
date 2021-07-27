import ITAA from "../models/itaa.js";
import AllocateITAA from "../models/allocatedItaa.js";
import {sendMail} from "./sendcredentials.js";

export const getitaa = async (req, res) => {
  try {
    const itaaList = await ITAA.find();
    console.log(itaaList);
    res.status(200).json(itaaList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteall=(req,res)=>{
    ITAA.db.collection("itaas").drop()
        .then(()=>res.status(201).json("success"))
        .catch((err)=>res.status(400).json("Error:"+err))
    AllocateITAA.db.collection("allocateitaas").drop();
}

export const additaa = async (req, res) => {
  const itaaData = req.body;
  const newitaa = new ITAA(itaaData);
  try {
    await newitaa.save()
        .then(()=>{
            sendMail(itaaData.email,itaaData.username,itaaData.password);
            res.status(201).json({ result: "success" });
        })
  } catch (error) {
    res.status(409).json(error);
  }
};

export const finditaa = (req, res) => {
  ITAA.findById(req.params.id)
    .then((itaa) => res.json(itaa))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteitaa = (req, res) => {
  ITAA.findByIdAndDelete(req.params.id)
    .then(() => res.json("ITAA deleted."))
    .catch((err) => res.status(400).json("Error: " + err));

  AllocateITAA.deleteMany({itaa:req.params.id})

};

export const updateitaa = (req, res) => {
  ITAA.findById(req.params.id)
    .then((itaa) => {
        if(itaa.username!==req.body.username || itaa.password!==req.body.password){
            sendMail(req.body.email,req.body.username,req.body.password);
        }
      itaa.username = req.body.username;
      itaa.password = req.body.password;
      itaa.role="itaa";
      itaa.name = req.body.name;
      itaa.email = req.body.email;
      itaa.phone = req.body.phone;
      itaa
        .save()
        .then(() => res.json({ result: "updated" }))
        .catch((err) => res.status(400).json(err));

    })
    .catch((err) => res.status(400).json("Error:" + err));
};

