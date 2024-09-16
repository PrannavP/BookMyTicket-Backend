require('dotenv').config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendMail = (to, recipient_name) => {
    console.log(to, recipient_name);

    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: 'Event Booked Successfully',
        text: `Dear ${recipient_name}, <br> You have successfully booked {event_name} tickets. Please keep it safe! <br> Thank you`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendMail;