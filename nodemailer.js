// 1. import nodemailer
// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


// 2. Configure email and send it
async function sendMail() {
    // crate an email transporter.
    // SMTP (simple mail transpoter.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kanhaiya15399@gmail.com",
        pass: process.env.GMAIL_PASS, // GOTTO MANAGE GOOGLE ACC > SECURITY -> TWO STEP VERIFICATION -> APP PASS
      },
    });

    // 2. Configure email content
    const mailOptions = {
      from: "kanhaiya15399@gmail.com",
      to: "kanhatokanhaiya@gmail.com, kanhaiya15399@gmail.com",
      subject: "Welcome to an email using nodemail in Nodejs",
      text: "This is an email using nodemailer in NodeJS",
    };

    // 3. Send the email
    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Email Sent successfully');
        
    } catch (error) {
        console.log('Eamil send failer with error: ' + err);
        
    }

}

sendMail();