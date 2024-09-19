const express = require("express");
const router = express.Router();
const { esewaPaymentController } = require("../controllers/esewaPaymentController");

router.post('/', esewaPaymentController);

module.exports = router;