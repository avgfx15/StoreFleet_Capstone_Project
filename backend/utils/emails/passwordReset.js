import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (user, resetPasswordURL) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'codingninjas2k16@gmail.com',
            pass: 'slwvvlczduktvhdj'
        }
    });

    const mailOptions = {
        from: 'codingninjas2k16@gmail.com',
        to: user.email,
        subject: "Password Reset",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* Add your custom CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    text-align: center;
                }
                .logo {
                    max-width: 150px;
                }
                .content {
                    margin-top: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #20d49a;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                /* Mobile Responsive Styles */
                @media only screen and (max-width: 600px) {
                    .container {
                        padding: 10px;
                    }
                    .logo {
                        max-width: 100px;
                    }
                    .button {
                        display: block;
                        margin-top: 10px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img class="logo" src="https://files.codingninjas.in/logo1-32230.png" alt="Storefleet Logo">
                    <h1>Password Reset</h1>
                </div>
                <div class="content">
                    <p>Hello, ${user.name}</p>
                    <p>You have requested to reset your password for your Storefleet account. To reset your password, please click the button below:</p>
                    <p><a class="button" href="${resetPasswordURL}">Reset Password</a></p>
                    <p>If you did not request a password reset, please ignore this email.</p>
                </div>
            </div>
        </body>
        </html>
    `,
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
};
