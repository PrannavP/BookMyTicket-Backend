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

const sendMail = (to, recipient_name, qr_image) => {
    // setting the qr_image location
    const imageContent = qr_image.split(",")[1];

    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: 'Event Booked Successfully',
        text: `Dear ${recipient_name}, <br> You have successfully booked {event_name} tickets. Please keep it safe! <br> Thank you`,
        attachments: [
            {
                filename: 'event-ticket-qr-code.png',
                content: imageContent,
                encoding: 'base64'
            }
        ],
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendMail;