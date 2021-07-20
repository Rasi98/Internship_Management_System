import nodemailer from "nodemailer";
import * as res from "express";

export const sendMail = (email, username, pass) => {
    const body1 = `
    <p>Please find the credentials given below to access the system.</p>
 `;
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
        to: email, // list of receivers
        subject: "Access Credentials", // Subject line
        text: "Please find the given credentials to access the system.", // plain text body
        html: body1+"<br/>"+"Username: "+username+"<br/>"+"Password: "+pass+"<br/><br/>"+"Thank you.", // html body
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
}

export const Staffinteviewemail = (email,msg) => {
    const body1 =msg;
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
        to: email, // list of receivers
        subject: "Staff Interview", // Subject line
        text: "", // plain text body
        html: body1, // html body
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
}
export const Email = (email,msg,subject) => {
    const body1 =msg;
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
        to: email, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: body1, // html body
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
}