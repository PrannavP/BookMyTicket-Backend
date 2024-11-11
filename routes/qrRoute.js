const express = require("express");
const { generateQRCodeController } = require("../controllers/QRController");

const router = express.Router();

router.post("/generate-qr", generateQRCodeController);

module.exports = router;