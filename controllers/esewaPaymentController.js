const crypto = require("crypto");
require("dotenv").config();

const generateSignature = (dataString, secretKey) => {
    return crypto.createHmac('sha256', secretKey)
                    .update(dataString)
                    .digest('base64');
};

const esewaPaymentController = (req, res, next) => {
    const event_name = req.body.event_name;
    const event_performer = req.body.event_performer;
    const event_id = req.body.event_id

    console.log(event_id);

    const amount = req.body.amount;
    const tax_amount = Math.ceil(amount * 0.13); // 13% VAT
    const total_amount = Math.ceil(parseInt(amount) + tax_amount); // total price including VAT
    const transaction_uuid = `TXN-${Math.floor(Math.random() * 1000000)}`; // Generating random uuid

    console.log(transaction_uuid);

    const product_code = 'EPAYTEST'; // this must be EPAYTEST for testing according to esewa docs
    const success_url = `http://localhost:5173/events/${event_id}`;
    const failure_url = "https://google.com";
    const signed_field_names = "total_amount,transaction_uuid,product_code";

    // Concatenate signed fields for signature
    const dataString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

    // Generate the signature
    const signature = generateSignature(dataString, process.env.ESEWA_SECRETKEY);

    const esewaPaymentUrl = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <style>
            form {
                max-width: 500px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 10px;
                background-color: #f9f9f9;
            }
            input[type="hidden"] {
                display: none;
            }
            input[type="submit"] {
                display: block;
                width: 100%;
                padding: 10px;
                border: none;
                border-radius: 5px;
                background-color: #4CAF50;
                color: white;
                font-size: 16px;
                cursor: pointer;
            }
            input[type="submit"]:hover {
                background-color: #45a049;
            }
            h4, p{
                display: inline-block;
            }
        </style>
        <form action="${esewaPaymentUrl}" method="POST">
            <div class="event-details-container">
                <div class="event-name-holder">
                    <h4>Event Name:</h4>
                    <p>${event_name}</p>
                </div>
                <div class="event-performer-holder">
                    <h4>Event Performer:</h4>
                    <p>${event_performer}</p>
                </div>
                <div class="event-ticket-price-holder">
                    <h4>Total Price:</h4>
                    <p>${amount}</p>
                </div>
            </div>

            <input type="hidden" name="amount" value="${amount}" required>
            <input type="hidden" name="tax_amount" value="${tax_amount}" required>
            <input type="hidden" name="total_amount" value="${total_amount}" required>
            <input type="hidden" name="transaction_uuid" value="${transaction_uuid}" required>
            <input type="hidden" name="product_code" value="${product_code}" required>
            <input type="hidden" name="product_service_charge" value="0" required>
            <input type="hidden" name="product_delivery_charge" value="0" required>
            <input type="hidden" name="success_url" value="${success_url}" required>
            <input type="hidden" name="failure_url" value="${failure_url}" required>
            <input type="hidden" name="signed_field_names" value="${signed_field_names}" required>
            <input type="hidden" name="signature" value="${signature}" required>
            <input type="submit" value="Submit to eSewa">
        </form>
    `);
};

module.exports = {
    esewaPaymentController,
};