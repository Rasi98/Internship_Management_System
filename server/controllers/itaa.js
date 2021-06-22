import ITAA from "../models/itaa.js";
import nodemailer from "nodemailer";

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
}

export const additaa = async (req, res) => {
  const itaaData = req.body;
  const newitaa = new ITAA(itaaData);
  try {
    await newitaa.save();
    res.status(201).json({ result: "success" });
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
};

export const updateitaa = (req, res) => {
  ITAA.findById(req.params.id)
    .then((itaa) => {
      itaa.username = req.body.username;
      itaa.password = req.body.password;
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

//send email
export const contactitaa = (req, res) =>{
    const body1 = `
    <p>Please find the credentials given below to access the system.</p>
 `;
    console.log(req.body);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "lakshanmit17@gmail.com", // generated ethereal user
            pass: "Rasingollamit17/18", // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let mailOptions = {
        from: '"MIT | Internship Portal" lakshanmit17@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: "Access Credentials", // Subject line
        text: "Please find the given credentials to access the system.", // plain text body
        html: body1+"<br/>"+"Username: "+req.body.username+"<br/>"+"Password: "+req.body.password+"<br/><br/>"+"Thank you.", // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            res.status(201).json("sent");

        }
    });

};
