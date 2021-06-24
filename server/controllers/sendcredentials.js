import nodemailer from "nodemailer";

export const sendAccess = (req, res) =>{
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
            res.status(201).json({result:"sent"});

        }
    });

};