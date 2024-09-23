const express = require("express");
const router = express.Router();
const { storeTransactionDetailsController } = require("../controllers/transactionController");

// Route to store transaction details in DB
router.post('/store', storeTransactionDetailsController);

module.exports = router;