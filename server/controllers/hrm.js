import HRM from "../models/hrm.js";
import nodemailer from "nodemailer";

export const gethrm = async (req, res) => {
  try {
    const hrmList = await HRM.find();
    console.log(hrmList);
    res.status(200).json(hrmList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addhrm = async (req, res) => {
  const hrmData = req.body;
  const newhrm = new HRM(hrmData);
  try {
    await newhrm.save();
    res.status(201).json({ result: "success" });
  } catch (error) {
    res.status(409).json(error);
  }
};

export const findhrm = (req, res) => {
  HRM.findById(req.params.id)
    .then((hrm) => res.json(hrm))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deletehrm = (req, res) => {
  HRM.findByIdAndDelete(req.params.id)
    .then(() => res.json("HRM deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updatehrm = (req, res) => {
  HRM.findById(req.params.id)
    .then((hrm) => {
      hrm.name = req.body.name;
      hrm.email = req.body.email;
      hrm.phone = req.body.phone;
      hrm.company = req.body.company;
      hrm.department = req.body.department;
      hrm.designation = req.body.designation;
      hrm
        .save()
        .then(() => res.json({ result: "updated" }))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
};

export const contacthrm = (req, res) => {
  const output = `
    <p>An email from DIM. We would like to contact you to request internships for our students.</p>
  `;

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
    from: '"Department of Industrial Management" lakshanmit17@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: "Internship Request", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
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

export const setstatus = (req, res) => {
  HRM.findById(req.params.id).then((hrm) => {
    (hrm.name = hrm.name), (hrm.email = hrm.email), (hrm.phone = hrm.phone);
    hrm.company = hrm.company;
    hrm.department = hrm.department;
    hrm.designation = hrm.designation;
    hrm.status = "Contacted";
    hrm.save();
  });
  HRM.findById(req.params.id).then((hrm) => {
    res.json(hrm).catch((err) => res.status(400).json("Error: " + err));
  });
};
