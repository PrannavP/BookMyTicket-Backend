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

const sendAnnouncementEmail = (user, event) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: `New Event: ${event.name}`,
        text: `Check out our upcoming event: ${event.name} in the ${event.category} category!`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendAnnouncementEmail;