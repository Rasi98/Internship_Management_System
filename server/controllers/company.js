import companyModel from "../models/company.js";
//import Mailgen from 'mailgen';
import nodemailer from "nodemailer";

export const getCompany = async (req, res) => {
  try {
    const companyList = await companyModel.find();
    console.log(companyList);
    res.status(200).json(companyList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addCompany = async (req, res) => {
  const companyData = req.body;
  const newCompany = new companyModel(companyData);
  try {
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const findCompany = (req, res) => {
  companyModel
    .findById(req.params.id)
    .then((company) => res.json(company))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const deleteCompany = (req, res) => {
  companyModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Company deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const companyUpdate = (req, res) => {
  companyModel
    .findById(req.params.id)
    .then((company) => {
      company.name = req.body.name;
      company.email = req.body.email;
      company.address = req.body.address;
      company.phone = req.body.phone;
      company.status = req.body.status;

      company
        .save()
        .then(() => res.json("Company updated."))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
};

//   export const contactCompany=async(req,res)=>{
//     //email configurarion
//     function sendMail(mailOptions) {

//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'lakshanmit17@gmail.com',
//                 pass: 'Rasingollamit17/18'
//             }
//         });

//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log("Email error Occured", error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//             }
//         });
//     }

//     var mailGenerator = new Mailgen({
//         theme: 'default',
//         product: {
//             // Appears in header & footer of e-mails
//             name: 'DIM',
//             link: 'www.DIM.lk',
//             // Optional product logo
//             logo: ''
//         }
//     });

//     var email = {
//         body: {
//             name: req.body.name,
//             intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
//             action: {
//                 instructions: 'To get started with Mailgen, please click here:',
//                 button: {
//                     color: '#22BC66', // Optional action button color
//                     text: 'Confirm your account',
//                     link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
//                 }
//             },
//             outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
//         }
//     };

//       // Generate an HTML email with the provided contents
//       var emailBody =await mailGenerator.generate(email);

//       mailOptions = {
//         from: 'lakshanmit17@gmail.com',
//         to: req.body.email,
//         subject: 'Regarding Interships',
//         html: emailBody
//     }
//     await sendMail(mailOptions);

//   }

export const contactCompany = (req, res) => {
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
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};
