const express = require("express");
const router = express.Router();
const { esewaPaymentController, confirmPaymentController } = require("../controllers/esewaPaymentController");

router.post('/', esewaPaymentController);

router.post('/confirmationpayment', confirmPaymentController);

module.exports = router;