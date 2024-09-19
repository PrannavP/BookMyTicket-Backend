const express = require("express");
const router = express.Router();
const { storeBookingDetailsController }  = require('../controllers/TicketController');

// Route to store ticket details in DB
router.post('/booking', storeBookingDetailsController);

module.exports = router;