const express = require("express");
const router = express.Router();
const { storeBookingDetailsController }  = require('../controllers/TicketController');

// Route to store ticket details in DB
router.post('/', storeBookingDetailsController);

module.exports = router;