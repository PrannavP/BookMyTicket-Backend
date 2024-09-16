const express = require('express');
const router = express.Router();
const { decreaseRemainingTicketsController } = require('../controllers/eventController');

// Route to send email after user booked ticket for an event
router.post('/eventbooking/:id', decreaseRemainingTicketsController);

module.exports = router;