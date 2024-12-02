const express = require("express");
const router = express.Router();
const { 
    storeBookingDetailsController,
    verifyTicketController,
    organizerTotalEarningController,
    organizerTotalTicketsSoldController,
    organizerTotalActiveEventsController,
    attendeeActiveTicketDetailsController,
    attendeePastTicketDetailsController,
    bookedTicketDetailsController,
    changePaymentStatusController,
}  = require('../controllers/TicketController');

// Route to store ticket details in DB
router.post('/booking', storeBookingDetailsController);

// Route to verify ticket
router.post('/verify-ticket', verifyTicketController);

// Route to get tickets earning of an organizer
router.post('/ticket-earning', organizerTotalEarningController);

// Route to get total tickets sold of an organizer
router.post('/ticket-sales', organizerTotalTicketsSoldController);

// Route to get total active events of an organizer
router.post('/active-events', organizerTotalActiveEventsController);

// Route to get active ticket details of attendee
router.post('/attendee-active-ticket-details', attendeeActiveTicketDetailsController);

// Route to get past ticket details of attendee
router.post('/attendee-past-ticket-details', attendeePastTicketDetailsController);

router.post('/booked-ticket-details', bookedTicketDetailsController);

// Route to change payment status of ticket
router.post("/change-payment-status", changePaymentStatusController);

module.exports = router;