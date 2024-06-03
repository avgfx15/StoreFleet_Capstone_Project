// Import the necessary modules here
import nodemailer from "nodemailer"

export const sendWelcomeEmail = async (user) => {
  // Write your code here

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'codingninjas2k16@gmail.com',
      pass: 'slwvvlczduktvhdj'
    }
  });

  var mailOptions = {
    from: 'codingninjas2k16@gmail.com',
    to: user.email,
    subject: 'Sending Email using Node.js',
    html: `<div style="text-align : center">
    <img src="https://files.codingninjas.in/logo1-32230.png?_ga=2.53373358.702681965.1711203204-1120808759.1709863166" alt="Girl in a jacket" width="100" height="100"/>
      <br><h1 style="font-size: 1.5rem; color: purple; font-weight: 600"> Welcome to Storefleet</h1><br>
      <p>Hello, ${user.name}</p>
      <p>Thank you for registring with Storefleet, We are excited to have you as a new member of our community</p>
      <button onclick="window.location.href = 'http://localhost:3000/api/storefleet/user/login';" style="background-color:blue; text-align:center; font-size: 1.2rem; color: white; padding-top: 10px;  padding-right: 50px;  padding-bottom: 10px;  padding-left: 50px; border-radius: 20px">
            Get Started
        </button>
      </div>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
